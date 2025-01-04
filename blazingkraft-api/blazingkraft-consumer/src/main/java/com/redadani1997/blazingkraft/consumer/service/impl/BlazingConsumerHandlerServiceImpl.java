package com.redadani1997.blazingkraft.consumer.service.impl;

import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.cache.service.DataMaskingCache;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.common.actions.cluster.ConsumerActions;
import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.util.CommonBeanUtils;
import com.redadani1997.blazingkraft.consumer.deserializer.ConsumerDeserializerDeterminer;
import com.redadani1997.blazingkraft.consumer.deserializer.ConsumerStringDeserializer;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.BlazingConsumptionRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalConfigurationRequest;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionPayloadResponse;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import com.redadani1997.blazingkraft.consumer.mapper.in.ConsumerRequestMapper;
import com.redadani1997.blazingkraft.consumer.mapper.in.blazing_consumer.BlazingConsumerRequestMapper;
import com.redadani1997.blazingkraft.consumer.mapper.out.ConsumerResponseMapper;
import com.redadani1997.blazingkraft.consumer.mapper.out.blazing_consumer.BlazingConsumerResponseMapper;
import com.redadani1997.blazingkraft.consumer.processor.*;
import com.redadani1997.blazingkraft.consumer.service.BlazingConsumerService;
import com.redadani1997.blazingkraft.datamasking.service.DataMasker;
import com.redadani1997.blazingkraft.ws.frame.CommonFrameType;
import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.function.BiConsumer;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.common.header.Headers;
import org.springframework.context.ApplicationContext;

public class BlazingConsumerHandlerServiceImpl extends CommonWebSocketHandler
        implements BlazingConsumerService {

    private final ClientsFactory clientsFactory;
    private final ConsumerResponseMapper consumerResponseMapper;
    private final ConsumerRequestMapper consumerRequestMapper;
    private final ConsumerDeserializerDeterminer consumerDeserializerDeterminer;
    private final AuditLogService auditLogService;
    private final DataMaskingCache dataMaskingCache;
    private final DataMasker dataMasker;
    private CommonDeserializer keyDeserializer;
    private CommonDeserializer valueDeserializer;
    private TimeProcessor timeProcessor;
    private LatestTimeProcessor latestTimeProcessor;
    private OffsetProcessor offsetProcessor;
    private JavascriptProcessor javascriptProcessor;
    private TextSearchFilterProcessor textSearchFilterProcessor;
    private DataMaskingProcessor dataMaskingProcessor;
    private GroupIdProcessor groupIdProcessor;
    private PartitionProcessor partitionProcessor;
    private BlazingConsumptionRequest request;
    private Long pollTimeoutMs;
    private Boolean completed = false;
    private Boolean isLive = false;
    private Boolean isLatest = false;
    private Integer size = 0;
    private Integer processed = 0;
    private List<BlazingConsumptionResponse> responses;
    private java.util.function.Consumer<Consumer<byte[], byte[]>> worker;
    private ConsumerStringDeserializer fallbackDeserializer = new ConsumerStringDeserializer();
    private static final int MAX_POLL_RETRY_COUNT = 2;

    public BlazingConsumerHandlerServiceImpl(
            ApplicationContext applicationContext,
            Runnable sessionCloser,
            BiConsumer<CommonFrameType, Object> messageSender,
            CurrentUser currentUser,
            String destination) {
        super(applicationContext, sessionCloser, messageSender, currentUser, destination);
        this.clientsFactory = CommonBeanUtils.getBean(applicationContext, ClientsFactory.class);
        this.consumerResponseMapper =
                CommonBeanUtils.getBean(applicationContext, ConsumerResponseMapper.class);
        this.consumerDeserializerDeterminer =
                CommonBeanUtils.getBean(applicationContext, ConsumerDeserializerDeterminer.class);
        this.consumerRequestMapper =
                CommonBeanUtils.getBean(applicationContext, ConsumerRequestMapper.class);
        this.auditLogService = CommonBeanUtils.getBean(applicationContext, AuditLogService.class);
        this.dataMaskingCache = CommonBeanUtils.getBean(applicationContext, DataMaskingCache.class);
        this.dataMasker = CommonBeanUtils.getBean(applicationContext, DataMasker.class);
    }

    @Override
    public void onSubscribe(String requestBody) {
        CompletableFuture.runAsync(
                        () -> {
                            this.request =
                                    this.blazingConsumerRequestMapper()
                                            .blazingConsumptionRequest(requestBody, this.currentUser());
                            this.consumeBlazingRecords();
                            this.auditLogService.logSuccess(ConsumerActions.CONSUME, AuditSeverity.LOW);
                            this.closeSession();
                        })
                .exceptionally(
                        throwable -> {
                            Throwable cause = throwable.getCause() == null ? throwable : throwable.getCause();
                            this.auditLogService.logFailure(ConsumerActions.CONSUME, AuditSeverity.LOW, cause);
                            this.sendMessage(CommonFrameType.FAILED, cause.getMessage());
                            this.closeSession();
                            return null;
                        });
    }

    @Override
    public void onDisconnect() {
        this.completed = true;
        this.cleanUp();
    }

    @Override
    public void consumeBlazingRecords() {
        try {
            this.prepare();

            Map<String, Object> overrides = this.applyPreProcessors();

            try (Consumer<byte[], byte[]> consumer =
                    this.clientsFactory.createConsumerClient(overrides)) {

                this.applyPostProcessors(consumer);

                while (!this.completed) {
                    this.worker.accept(consumer);

                    if (this.completed) {
                        return;
                    }
                }
            }
        } finally {
            this.cleanUp();
        }
    }

    private void prepare() {
        ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest =
                this.request.getConsumerAdditionalFiltersRequest();
        ConsumerAdditionalConfigurationRequest consumerAdditionalConfigurationRequest =
                this.request.getConsumerAdditionalConfigurationRequest();

        this.keyDeserializer =
                this.determineKeyDeserializer(
                        this.request.getKeySchema(), consumerAdditionalConfigurationRequest);
        this.valueDeserializer =
                this.determineValueDeserializer(
                        this.request.getValueSchema(), consumerAdditionalConfigurationRequest);

        this.pollTimeoutMs =
                this.currentConsumerClient().pollTimeoutMs() != null
                        ? this.currentConsumerClient().pollTimeoutMs()
                        : 750L;

        this.timeProcessor = new TimeProcessor(consumerAdditionalFiltersRequest);
        this.latestTimeProcessor =
                new LatestTimeProcessor(consumerAdditionalFiltersRequest, this.request.getResultsSize());
        this.offsetProcessor = new OffsetProcessor(consumerAdditionalFiltersRequest);
        this.partitionProcessor = new PartitionProcessor(consumerAdditionalFiltersRequest);
        this.javascriptProcessor = new JavascriptProcessor(consumerAdditionalFiltersRequest);
        this.textSearchFilterProcessor =
                new TextSearchFilterProcessor(consumerAdditionalFiltersRequest);
        this.dataMaskingProcessor = new DataMaskingProcessor(this.dataMaskingCache, this.dataMasker);
        this.groupIdProcessor =
                new GroupIdProcessor(consumerAdditionalFiltersRequest, this.request.getResultsSize());
        this.isLive = consumerAdditionalFiltersRequest.getTimeFilter().getLiveConsumption();
        this.isLatest = consumerAdditionalFiltersRequest.getTimeFilter().getLatest();
        this.responses = new ArrayList<>();

        if (this.isLive) {
            this.worker = liveWorker();
        } else if (this.isLatest) {
            this.worker = latestWorker();
        } else {
            this.worker = defaultWorker();
        }
    }

    private java.util.function.Consumer<Consumer<byte[], byte[]>> defaultWorker() {
        return (consumer) -> {
            ConsumerRecords<byte[], byte[]> records = this.pollWithRetry(consumer, 1);

            if (this.completed) {
                return;
            }

            if (records.isEmpty()) {
                this.completed = true;

                this.notifyProcessed();

                this.sendMessage(CommonFrameType.SUCCEEDED, "No more records to consume");
                return;
            }

            for (ConsumerRecord<byte[], byte[]> record : records) {
                if (this.completed) {
                    return;
                }

                this.processed++;

                this.notifyProcessing();

                this.deserializeAndAppend(record);

                if (!this.responses.isEmpty()) {
                    this.sendMessage(CommonFrameType.CONTENT, this.responses);
                    this.responses.clear();
                }

                if (this.request.getResultsSize() > 0 && this.request.getResultsSize().equals(this.size)) {
                    this.completed = true;

                    this.notifyProcessed();

                    this.sendMessage(
                            CommonFrameType.SUCCEEDED,
                            String.format("Successfully consumed %d records", this.size));
                    this.responses.clear();
                    return;
                }
            }
        };
    }

    private java.util.function.Consumer<Consumer<byte[], byte[]>> latestWorker() {
        return (consumer) -> {
            LatestTimeProcessor.LatestTimeProcessorPollResponse pollResponse =
                    this.latestTimeProcessor.pollProcess(consumer, this.pollTimeoutMs);

            List<ConsumerRecord<byte[], byte[]>> records = pollResponse.getRecords();

            if (this.completed) {
                return;
            }

            for (ConsumerRecord<byte[], byte[]> record : records) {
                if (this.completed) {
                    return;
                }

                this.processed++;

                this.deserializeAndAppend(record);

                this.notifyProcessing();
            }

            boolean isOptimisticProcessing = this.processed <= this.request.getResultsSize() * 2;

            boolean hasCompleted =
                    pollResponse.isAllCompleted()
                            || (this.request.getResultsSize() > 0 && this.size >= this.request.getResultsSize());

            if (!isOptimisticProcessing || hasCompleted) {
                if (!this.responses.isEmpty()) {
                    this.responses.sort(
                            (o1, o2) ->
                                    Long.compare(o2.getMetadata().getTimestamp(), o1.getMetadata().getTimestamp()));

                    if (this.request.getResultsSize() <= 0) {
                        // no-op
                    } else if (this.responses.size() > this.request.getResultsSize()) {
                        this.responses = this.responses.subList(0, this.request.getResultsSize());
                    }
                    // In a non-optimistic scenario, the last poll might have returned records whose size will
                    // cause the total size to be greater than the requested size. In this case, we need to
                    // remove the extra records
                    else if (!isOptimisticProcessing && this.size > this.request.getResultsSize()) {
                        int diff = this.responses.size() - (this.size - this.request.getResultsSize());
                        this.responses = this.responses.subList(0, diff);
                    }

                    List<BlazingConsumptionResponse> intermediateResponses = new ArrayList<>();
                    for (BlazingConsumptionResponse response : this.responses) {
                        intermediateResponses.add(response);
                        if (intermediateResponses.size() == 5) {
                            this.sendMessage(CommonFrameType.CONTENT, intermediateResponses);
                            intermediateResponses.clear();
                        }
                    }
                    if (!intermediateResponses.isEmpty()) {
                        this.sendMessage(CommonFrameType.CONTENT, intermediateResponses);
                    }
                    this.responses.clear();
                }

                if (hasCompleted) {
                    this.completed = true;

                    this.notifyProcessed();

                    this.sendMessage(
                            CommonFrameType.SUCCEEDED,
                            String.format("Successfully consumed %d records", this.size));
                }
            }
        };
    }

    private java.util.function.Consumer<Consumer<byte[], byte[]>> liveWorker() {
        return (consumer) -> {
            ConsumerRecords<byte[], byte[]> records =
                    consumer.poll(Duration.of(this.pollTimeoutMs, ChronoUnit.MILLIS));

            if (this.completed) {
                return;
            }

            for (ConsumerRecord<byte[], byte[]> record : records) {
                if (this.completed) {
                    return;
                }

                this.processed++;
                this.sendMessage(CommonFrameType.INFO, this.processed);

                this.deserializeAndAppend(record);

                if (!this.responses.isEmpty()) {
                    this.sendMessage(CommonFrameType.CONTENT, this.responses);
                    this.responses.clear();
                }
            }
        };
    }

    private void deserializeAndAppend(ConsumerRecord<byte[], byte[]> record) {
        BlazingConsumptionPayloadResponse key =
                this.doDeserialize(this.keyDeserializer, record.topic(), record.headers(), record.key());
        BlazingConsumptionPayloadResponse value =
                this.doDeserialize(
                        this.valueDeserializer, record.topic(), record.headers(), record.value());
        BlazingConsumptionResponse response =
                this.blazingConsumerResponseMapper()
                        .blazingConsumptionResponse(this.size + 1, record, key, value);

        this.appendIfEligible(this.responses, response);
    }

    private void appendIfEligible(
            Collection<BlazingConsumptionResponse> responses, BlazingConsumptionResponse response) {
        this.dataMaskingProcessor.doProcess(response);
        Boolean eligibleJS = this.javascriptProcessor.doProcess(response);
        Boolean eligibleTime = this.timeProcessor.doProcess(response);
        Boolean eligibleTextSearch = this.textSearchFilterProcessor.doProcess(response);
        if (eligibleJS && eligibleTime && eligibleTextSearch) {
            this.size++;
            responses.add(response);
        }
    }

    private Map<String, Object> applyPreProcessors() {
        Map<String, Object> overrides = new HashMap<>();
        this.groupIdProcessor.preProcess(overrides);
        this.latestTimeProcessor.preProcess(overrides);
        return overrides;
    }

    private void applyPostProcessors(Consumer<byte[], byte[]> consumer) {
        this.partitionProcessor.postProcess(consumer);
        this.groupIdProcessor.postProcess(consumer);
        this.timeProcessor.postProcess(consumer);
        this.latestTimeProcessor.postProcess(consumer);
        this.offsetProcessor.postProcess(consumer);
    }

    private BlazingConsumptionPayloadResponse doDeserialize(
            CommonDeserializer deserializer, String topic, Headers headers, byte[] payload) {
        BlazingConsumptionPayloadResponse response = new BlazingConsumptionPayloadResponse();
        try {
            String deserializedPayload = deserializer.deserialize(topic, headers, payload);
            response.setPayload(deserializedPayload);
            response.setSucceeded(true);
        } catch (Exception ex) {
            try {
                String fallback = this.fallbackDeserializer.deserialize(topic, headers, payload);
                response.setPayload(fallback);
            } catch (Exception fallbackEx) {
                // no-op
            }
            response.setErrorMessage(ex.getMessage());
            response.setSucceeded(false);
        }
        return response;
    }

    private CommonDeserializer determineValueDeserializer(
            String valueSchema, ConsumerAdditionalConfigurationRequest additionalConfiguration) {
        if (this.currentConsumerClient().perRequestValueDeserializer()) {
            return this.consumerDeserializerDeterminer.determineValue(
                    additionalConfiguration.getValueDeserializer(),
                    additionalConfiguration.getSchemaRegistryCode(),
                    additionalConfiguration.getValueDeserializerConfiguration(),
                    valueSchema);
        } else {
            return this.currentConsumerClient().valueDeserializer();
        }
    }

    private CommonDeserializer determineKeyDeserializer(
            String keySchema, ConsumerAdditionalConfigurationRequest additionalConfiguration) {
        if (this.currentConsumerClient().perRequestKeyDeserializer()) {
            return this.consumerDeserializerDeterminer.determineKey(
                    additionalConfiguration.getKeyDeserializer(),
                    additionalConfiguration.getSchemaRegistryCode(),
                    additionalConfiguration.getKeyDeserializerConfiguration(),
                    keySchema);
        } else {
            return this.currentConsumerClient().keyDeserializer();
        }
    }

    private ConsumerRecords<byte[], byte[]> pollWithRetry(
            Consumer<byte[], byte[]> consumer, int pollCount) {
        ConsumerRecords<byte[], byte[]> consumerRecords =
                consumer.poll(Duration.of(this.pollTimeoutMs, ChronoUnit.MILLIS));
        if (!consumerRecords.isEmpty()) {
            return consumerRecords;
        }
        if (pollCount == MAX_POLL_RETRY_COUNT) {
            return consumerRecords;
        }

        return this.pollWithRetry(consumer, pollCount + 1);
    }

    private void notifyProcessing() {
        if (this.processed != 0 && this.processed % 10 == 0) {
            this.sendMessage(CommonFrameType.INFO, this.processed);
        }
    }

    private void notifyProcessed() {
        if (this.processed != 0 && this.processed % 10 != 0) {
            this.sendMessage(CommonFrameType.INFO, this.processed);
        }
    }

    private void cleanUp() {
        if (this.javascriptProcessor != null) {
            this.javascriptProcessor.cleanUp();
        }
    }

    private CommonConsumerClient currentConsumerClient() {
        return this.clientsFactory.currentConsumerClient();
    }

    private BlazingConsumerResponseMapper blazingConsumerResponseMapper() {
        return this.consumerResponseMapper.blazingConsumerResponseMapper();
    }

    private BlazingConsumerRequestMapper blazingConsumerRequestMapper() {
        return this.consumerRequestMapper.blazingConsumerRequestMapper();
    }
}
