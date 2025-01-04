package com.redadani1997.blazingkraft.producer.mapper.in.producer_configuration;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.client.validator.ProducerClientConfigurationValidator;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import com.redadani1997.blazingkraft.producer.dto.in.producer_configuration.ProducerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerConfigurationUpdateApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProducerConfigurationRequestMapper {

    private final ProducerClientConfigurationValidator producerClientConfigurationValidator;
    private final ClientsFactory clientsFactory;

    public ProducerConfigurationUpdateRequest producerConfigurationUpdateRequest(
            ProducerConfigurationUpdateApiRequest apiRequest) {

        ProducerConfigurationUpdateRequest request =
                ProducerConfigurationUpdateRequest.builder()
                        .perRequestKeySerializer(apiRequest.getPerRequestKeySerializer())
                        .keySerializer(null)
                        .keySerializerConfiguration(apiRequest.getKeySerializerConfiguration())
                        .perRequestValueSerializer(apiRequest.getPerRequestValueSerializer())
                        .valueSerializer(null)
                        .valueSerializerConfiguration(apiRequest.getValueSerializerConfiguration())
                        .mainConfiguration(apiRequest.getMainConfiguration())
                        .build();

        if (!apiRequest.getPerRequestKeySerializer()) {
            CommonValidator.assertNotNull("Key Serializer", apiRequest.getKeySerializer());
            CommonSerde keySerializer =
                    EnumUtils.fromName(CommonSerde.class, apiRequest.getKeySerializer());
            if (CommonSerde.isSchemaRegistrySerde(keySerializer)) {
                if (this.currentProducerClient().schemaRegistryCode() == null) {
                    throw new ConsumerException(
                            "Schema Registry is required when using Schema Registry Key Serializer");
                }
                CommonValidator.assertNotNull(
                        "Key Serializer Configuration", apiRequest.getKeySerializerConfiguration());
            }
            request.setKeySerializer(keySerializer);
        }
        if (!apiRequest.getPerRequestValueSerializer()) {
            CommonValidator.assertNotNull("Value Serializer", apiRequest.getValueSerializer());
            CommonSerde valueSerializer =
                    EnumUtils.fromName(CommonSerde.class, apiRequest.getValueSerializer());
            if (CommonSerde.isSchemaRegistrySerde(valueSerializer)) {
                if (this.currentProducerClient().schemaRegistryCode() == null) {
                    throw new ConsumerException(
                            "Schema Registry is required when using Schema Registry Value Serializer");
                }
                CommonValidator.assertNotNull(
                        "Value Serializer Configuration", apiRequest.getValueSerializerConfiguration());
            }
            request.setValueSerializer(valueSerializer);
        }

        return request;
    }

    private CommonProducerClient currentProducerClient() {
        return this.clientsFactory.currentProducerClient();
    }
}
