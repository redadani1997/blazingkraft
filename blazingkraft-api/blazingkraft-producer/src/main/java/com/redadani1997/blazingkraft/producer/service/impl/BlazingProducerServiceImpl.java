package com.redadani1997.blazingkraft.producer.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.BlazingProductionRequest;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.ProducerAdditionalConfigurationRequest;
import com.redadani1997.blazingkraft.producer.mapper.out.ProducerResponseMapper;
import com.redadani1997.blazingkraft.producer.mapper.out.blazing_producer.BlazingProducerResponseMapper;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionApiResponse;
import com.redadani1997.blazingkraft.producer.serializer.ProducerSerializerDeterminer;
import com.redadani1997.blazingkraft.producer.service.BlazingProducerService;
import com.redadani1997.blazingkraft.producer.utils.ProducerUtils;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.header.Headers;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlazingProducerServiceImpl implements BlazingProducerService {

    private final ClientsFactory clientsFactory;
    private final ProducerResponseMapper producerResponseMapper;
    private final ProducerSerializerDeterminer producerSerializerDeterminer;

    @Override
    public BlazingProductionApiResponse producerBlazingRecord(BlazingProductionRequest request) {

        Headers headers = ProducerUtils.headersFromMap(request.getHeaders());
        ProducerAdditionalConfigurationRequest additionalConfiguration =
                request.getProducerAdditionalConfigurationRequest();

        byte[] key =
                this.serializeKey(
                        request.getTopic(),
                        headers,
                        request.getKey(),
                        request.getKeySchema(),
                        additionalConfiguration);

        byte[] value =
                this.serializeValue(
                        request.getTopic(),
                        headers,
                        request.getValue(),
                        request.getValueSchema(),
                        additionalConfiguration);

        ProducerRecord producerRecord =
                new ProducerRecord(request.getTopic(), request.getPartition(), key, value, headers);

        RecordMetadata recordMetadata =
                (RecordMetadata)
                        KafkaFutureUtils.resolve(
                                this.currentProducerClient().client().send(producerRecord),
                                KafkaFutureMode.PRODUCER);

        return this.blazingProducerResponseMapper().blazingProductionResponse(recordMetadata);
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
}
