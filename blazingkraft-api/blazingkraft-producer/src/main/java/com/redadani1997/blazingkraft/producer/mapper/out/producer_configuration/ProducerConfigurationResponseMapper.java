package com.redadani1997.blazingkraft.producer.mapper.out.producer_configuration;

import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerConfigurationApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProducerConfigurationResponseMapper {

    public ProducerConfigurationApiResponse producerConfigurationApiResponse(
            ProducerModel savedProducerModel) {
        ProducerConfigurationApiResponse response = new ProducerConfigurationApiResponse();

        response.setKeySerializer(savedProducerModel.getKeySerializer());
        response.setKeySerializerConfiguration(savedProducerModel.keySerializerConfiguration());
        response.setPerRequestKeySerializer(savedProducerModel.getPerRequestKeySerializer());

        response.setValueSerializer(savedProducerModel.getValueSerializer());
        response.setValueSerializerConfiguration(savedProducerModel.valueSerializerConfiguration());
        response.setPerRequestValueSerializer(savedProducerModel.getPerRequestValueSerializer());

        response.setSchemaRegistryCode(savedProducerModel.schemaRegistryCode());

        return response;
    }

    public ProducerCompleteConfigurationApiResponse producerCompleteConfigurationApiResponse(
            ProducerModel savedProducerModel) {
        ProducerCompleteConfigurationApiResponse response =
                new ProducerCompleteConfigurationApiResponse();

        response.setKeySerializer(savedProducerModel.getKeySerializer());
        response.setKeySerializerConfiguration(savedProducerModel.keySerializerConfiguration());
        response.setPerRequestKeySerializer(savedProducerModel.getPerRequestKeySerializer());

        response.setValueSerializer(savedProducerModel.getValueSerializer());
        response.setValueSerializerConfiguration(savedProducerModel.valueSerializerConfiguration());
        response.setPerRequestValueSerializer(savedProducerModel.getPerRequestValueSerializer());

        response.setCommonConfiguration(savedProducerModel.commonClusterConfiguration());
        response.setMainConfiguration(savedProducerModel.mainConfiguration());

        response.setSchemaRegistryCode(savedProducerModel.schemaRegistryCode());

        return response;
    }
}
