package com.redadani1997.blazingkraft.consumer.mapper.in.consumer_configuration;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.client.validator.ConsumerClientConfigurationValidator;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_configuration.ConsumerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerConfigurationUpdateApiRequest;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerConfigurationRequestMapper {

    private final ConsumerClientConfigurationValidator consumerClientConfigurationValidator;
    private final ClientsFactory clientsFactory;

    public ConsumerConfigurationUpdateRequest consumerConfigurationUpdateRequest(
            ConsumerConfigurationUpdateApiRequest apiRequest) {
        CommonValidator.assertGreaterThanOrEquals(
                "Poll Timeout MS", apiRequest.getPollTimeoutMs(), 300L);

        ConsumerConfigurationUpdateRequest request =
                ConsumerConfigurationUpdateRequest.builder()
                        .perRequestKeyDeserializer(apiRequest.getPerRequestKeyDeserializer())
                        .keyDeserializer(null)
                        .keyDeserializerConfiguration(apiRequest.getKeyDeserializerConfiguration())
                        .perRequestValueDeserializer(apiRequest.getPerRequestValueDeserializer())
                        .valueDeserializer(null)
                        .valueDeserializerConfiguration(apiRequest.getValueDeserializerConfiguration())
                        .mainConfiguration(apiRequest.getMainConfiguration())
                        .pollTimeoutMs(apiRequest.getPollTimeoutMs())
                        .build();

        if (!apiRequest.getPerRequestKeyDeserializer()) {
            CommonValidator.assertNotNull("Key Deserializer", apiRequest.getKeyDeserializer());
            CommonSerde keyDeserializer =
                    EnumUtils.fromName(CommonSerde.class, apiRequest.getKeyDeserializer());

            if (CommonSerde.isSchemaSerde(keyDeserializer)) {
                throw new ConsumerException(
                        String.format(
                                "Cannot use '%s' as fixed Key Deserializer. It should be used as per request Key Deserializer",
                                keyDeserializer.name()));
            }

            if (CommonSerde.isSchemaRegistrySerde(keyDeserializer)) {
                if (this.currentConsumerClient().schemaRegistryCode() == null) {
                    throw new ConsumerException(
                            "Schema Registry is required when using Schema Registry Key Deserializer");
                }
                CommonValidator.assertNotNull(
                        "Key Deserializer Configuration", apiRequest.getKeyDeserializerConfiguration());
            }
            request.setKeyDeserializer(keyDeserializer);
        }
        if (!apiRequest.getPerRequestValueDeserializer()) {
            CommonValidator.assertNotNull("Value Deserializer", apiRequest.getValueDeserializer());
            CommonSerde valueDeserializer =
                    EnumUtils.fromName(CommonSerde.class, apiRequest.getValueDeserializer());

            if (CommonSerde.isSchemaSerde(valueDeserializer)) {
                throw new ConsumerException(
                        String.format(
                                "Cannot use '%s' as fixed Value Deserializer. It should be used as per request Value Deserializer",
                                valueDeserializer.name()));
            }

            if (CommonSerde.isSchemaRegistrySerde(valueDeserializer)) {
                if (this.currentConsumerClient().schemaRegistryCode() == null) {
                    throw new ConsumerException(
                            "Schema Registry is required when using Schema Registry Value Deserializer");
                }
                CommonValidator.assertNotNull(
                        "Value Deserializer Configuration", apiRequest.getValueDeserializerConfiguration());
            }
            request.setValueDeserializer(valueDeserializer);
        }

        return request;
    }

    private CommonConsumerClient currentConsumerClient() {
        return this.clientsFactory.currentConsumerClient();
    }
}
