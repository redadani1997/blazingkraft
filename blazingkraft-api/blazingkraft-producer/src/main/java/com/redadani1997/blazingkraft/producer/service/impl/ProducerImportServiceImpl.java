package com.redadani1997.blazingkraft.producer.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.io.service.impl.IOImportJsonInputStreamServiceImpl;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.ProducerAdditionalConfigurationRequest;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportImprovedRecordRequest;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportRecordRequest;
import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportRecordsRequest;
import com.redadani1997.blazingkraft.producer.mapper.in.ProducerRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.in.producer_import.ProducerImportRequestMapper;
import com.redadani1997.blazingkraft.producer.mapper.out.ProducerResponseMapper;
import com.redadani1997.blazingkraft.producer.mapper.out.blazing_producer.BlazingProducerResponseMapper;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionMetadataOrErrorApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.RecordDataApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.RecordMetadataApiResponse;
import com.redadani1997.blazingkraft.producer.serializer.ProducerSerializerDeterminer;
import com.redadani1997.blazingkraft.producer.service.ProducerImportService;
import com.redadani1997.blazingkraft.producer.utils.ProducerUtils;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.header.Headers;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProducerImportServiceImpl implements ProducerImportService {

    private final ClientsFactory clientsFactory;
    private final ProducerResponseMapper producerResponseMapper;
    private final ProducerSerializerDeterminer producerSerializerDeterminer;
    private final ProducerRequestMapper producerRequestMapper;

    @Override
    public List<BlazingProductionMetadataOrErrorApiResponse> importProducerRecords(
            ProducerImportRecordsRequest request) {

        List<BlazingProductionMetadataOrErrorApiResponse> responses = new ArrayList<>();

        try (IOImportJsonInputStreamServiceImpl io =
                new IOImportJsonInputStreamServiceImpl(request.getInputStream())) {
            io.doParse(
                    (value, throwable) -> {
                        BlazingProductionMetadataOrErrorApiResponse response;
                        if (throwable != null) {
                            response = this.handleErroredRecord(throwable);
                        } else {
                            String stringifiedValue = CommonCastingUtils.toJsonString(value);
                            ProducerImportRecordRequest producerImportRecordRequest =
                                    CommonCastingUtils.cast(stringifiedValue, ProducerImportRecordRequest.class);

                            response = this.doImportProducerRecord(producerImportRecordRequest, request);
                        }

                        if (request.getFailFast() && !response.getSucceeded()) {
                            io.breakParsing();
                        } else if (!request.getAsync()) {
                            responses.add(response);
                        }
                    });
        }

        return responses;
    }

    private BlazingProductionMetadataOrErrorApiResponse handleErroredRecord(Throwable throwable) {
        BlazingProductionMetadataOrErrorApiResponse response =
                new BlazingProductionMetadataOrErrorApiResponse();
        response.setErrorMessage(
                String.format(
                        "Error parsing Record from JSON File, error => '%s'", throwable.getMessage()));
        response.setSucceeded(false);
        return response;
    }

    private BlazingProductionMetadataOrErrorApiResponse doImportProducerRecord(
            ProducerImportRecordRequest recordRequest, ProducerImportRecordsRequest recordsRequest) {
        BlazingProductionMetadataOrErrorApiResponse response =
                new BlazingProductionMetadataOrErrorApiResponse();
        try {
            ProducerImportImprovedRecordRequest improvedRecordRequest =
                    this.producerImportRequestMapper().producerImportImprovedRecordRequest(recordRequest);

            Headers headers = ProducerUtils.headersFromMap(improvedRecordRequest.getHeaders());
            ProducerAdditionalConfigurationRequest additionalConfiguration =
                    recordsRequest.getProducerAdditionalConfigurationRequest();

            String topic = improvedRecordRequest.getTopic();
            Integer partition = improvedRecordRequest.getPartition();

            RecordDataApiResponse recordDataApiResponse =
                    this.blazingProducerResponseMapper()
                            .recordDataApiResponse(
                                    improvedRecordRequest.getKey(),
                                    improvedRecordRequest.getValue(),
                                    improvedRecordRequest.getHeaders());

            response.setRecordData(recordDataApiResponse);

            byte[] key =
                    this.serializeKey(
                            topic,
                            headers,
                            improvedRecordRequest.getKey(),
                            recordsRequest.getKeySchema(),
                            additionalConfiguration);

            byte[] value =
                    this.serializeValue(
                            topic,
                            headers,
                            improvedRecordRequest.getValue(),
                            recordsRequest.getValueSchema(),
                            additionalConfiguration);

            ProducerRecord producerRecord = new ProducerRecord(topic, partition, key, value, headers);

            if (!recordsRequest.getAsync()) {
                RecordMetadata recordMetadata =
                        (RecordMetadata)
                                KafkaFutureUtils.resolve(
                                        this.currentProducerClient().client().send(producerRecord),
                                        KafkaFutureMode.PRODUCER);

                RecordMetadataApiResponse recordMetadataApiResponse =
                        this.blazingProducerResponseMapper().recordMetadataApiResponse(recordMetadata);

                response.setRecordMetadata(recordMetadataApiResponse);
                response.setSucceeded(true);
            } else {
                this.currentProducerClient().client().send(producerRecord);
            }
        } catch (Exception ex) {
            response.setErrorMessage(ex.getMessage());
            response.setSucceeded(false);
        }

        return response;
    }

    private byte[] serializeValue(
            String topic,
            Headers headers,
            String value,
            String valueSchema,
            ProducerAdditionalConfigurationRequest additionalConfiguration) {
        if (this.currentProducerClient().perRequestValueSerializer()) {
            CommonSerializer valueSerializer =
                    this.producerSerializerDeterminer.determineValue(
                            additionalConfiguration.getValueSerializer(),
                            additionalConfiguration.getSchemaRegistryCode(),
                            additionalConfiguration.getValueSerializerConfiguration());
            return valueSerializer.serialize(topic, headers, value, valueSchema);
        } else {
            return this.currentProducerClient()
                    .valueSerializer()
                    .serialize(topic, headers, value, valueSchema);
        }
    }

    private byte[] serializeKey(
            String topic,
            Headers headers,
            String key,
            String keySchema,
            ProducerAdditionalConfigurationRequest additionalConfiguration) {
        if (this.currentProducerClient().perRequestKeySerializer()) {
            CommonSerializer keySerializer =
                    this.producerSerializerDeterminer.determineKey(
                            additionalConfiguration.getKeySerializer(),
                            additionalConfiguration.getSchemaRegistryCode(),
                            additionalConfiguration.getKeySerializerConfiguration());
            return keySerializer.serialize(topic, headers, key, keySchema);
        } else {
            return this.currentProducerClient().keySerializer().serialize(topic, headers, key, keySchema);
        }
    }

    private CommonProducerClient currentProducerClient() {
        return this.clientsFactory.currentProducerClient();
    }

    private BlazingProducerResponseMapper blazingProducerResponseMapper() {
        return this.producerResponseMapper.blazingProducerResponseMapper();
    }

    private ProducerImportRequestMapper producerImportRequestMapper() {
        return this.producerRequestMapper.producerImportRequestMapper();
    }
}
