package com.redadani1997.blazingkraft.consumer.mapper.out.consumer_configuration;

import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerConfigurationApiResponse;
import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerConfigurationResponseMapper {

    public ConsumerConfigurationApiResponse consumerConfigurationApiResponse(
            ConsumerModel savedConsumerModel) {
        ConsumerConfigurationApiResponse response = new ConsumerConfigurationApiResponse();

        response.setKeyDeserializer(savedConsumerModel.getKeyDeserializer());
        response.setKeyDeserializerConfiguration(savedConsumerModel.keyDeserializerConfiguration());
        response.setPerRequestKeyDeserializer(savedConsumerModel.getPerRequestKeyDeserializer());

        response.setValueDeserializer(savedConsumerModel.getValueDeserializer());
        response.setValueDeserializerConfiguration(savedConsumerModel.valueDeserializerConfiguration());
        response.setPerRequestValueDeserializer(savedConsumerModel.getPerRequestValueDeserializer());

        response.setSchemaRegistryCode(savedConsumerModel.schemaRegistryCode());

        return response;
    }

    public ConsumerCompleteConfigurationApiResponse consumerCompleteConfigurationApiResponse(
            ConsumerModel savedConsumerModel) {
        ConsumerCompleteConfigurationApiResponse response =
                new ConsumerCompleteConfigurationApiResponse();

        response.setKeyDeserializer(savedConsumerModel.getKeyDeserializer());
        response.setKeyDeserializerConfiguration(savedConsumerModel.keyDeserializerConfiguration());
        response.setPerRequestKeyDeserializer(savedConsumerModel.getPerRequestKeyDeserializer());

        response.setValueDeserializer(savedConsumerModel.getValueDeserializer());
        response.setValueDeserializerConfiguration(savedConsumerModel.valueDeserializerConfiguration());
        response.setPerRequestValueDeserializer(savedConsumerModel.getPerRequestValueDeserializer());

        response.setCommonConfiguration(savedConsumerModel.commonClusterConfiguration());
        response.setMainConfiguration(savedConsumerModel.mainConfiguration());

        response.setPollTimeoutMs(savedConsumerModel.getPollTimeoutMs());

        response.setSchemaRegistryCode(savedConsumerModel.schemaRegistryCode());

        return response;
    }
}
