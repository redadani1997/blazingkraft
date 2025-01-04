package com.redadani1997.blazingkraft.producer.mapper.in.blazing_producer;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.BlazingProductionRequest;
import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.ProducerAdditionalConfigurationRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionApiRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerAdditionalConfigurationApiRequest;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class BlazingProducerRequestMapper {
    private final ClientsFactory clientsFactory;
    private final AuditLogService auditLogService;

    public BlazingProductionRequest blazingProductionRequest(BlazingProductionApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getTopic());

        ProducerAdditionalConfigurationApiRequest producerAdditionalConfiguration =
                apiRequest.getProducerAdditionalConfiguration();

        CommonValidator.assertNotBlank("topic", apiRequest.getTopic());

        CommonValidator.assertNotNull(
                "Key Serializer", producerAdditionalConfiguration.getKeySerializer());
        CommonValidator.assertNotNull(
                "Value Serializer", producerAdditionalConfiguration.getValueSerializer());

        CommonSerde keySerializer =
                EnumUtils.fromName(CommonSerde.class, producerAdditionalConfiguration.getKeySerializer());
        CommonSerde valueSerializer =
                EnumUtils.fromName(CommonSerde.class, producerAdditionalConfiguration.getValueSerializer());

        String schemaRegistryCode = this.currentProducerClient().schemaRegistryCode();

        if (CommonSerde.isSchemaRegistrySerde(keySerializer)) {
            if (schemaRegistryCode == null) {
                throw new ConsumerException(
                        "Schema Registry is required when using Schema Registry Key Serializer");
            }
            CommonValidator.assertNotNull(
                    "Key Serializer Configuration",
                    producerAdditionalConfiguration.getKeySerializerConfiguration());
        }
        if (CommonSerde.isSchemaRegistrySerde(valueSerializer)) {
            if (schemaRegistryCode == null) {
                throw new ConsumerException(
                        "Schema Registry is required when using Schema Registry Value Serializer");
            }
            CommonValidator.assertNotNull(
                    "Value Serializer Configuration",
                    producerAdditionalConfiguration.getValueSerializerConfiguration());
        }
        ProducerAdditionalConfigurationRequest producerAdditionalConfigurationRequest =
                ProducerAdditionalConfigurationRequest.builder()
                        .schemaRegistryCode(schemaRegistryCode)
                        .keySerializer(keySerializer)
                        .keySerializerConfiguration(
                                producerAdditionalConfiguration.getKeySerializerConfiguration())
                        .valueSerializer(valueSerializer)
                        .valueSerializerConfiguration(
                                producerAdditionalConfiguration.getValueSerializerConfiguration())
                        .build();

        Map<String, Object> headersMap = CommonTextUtils.stringToMap(apiRequest.getHeaders());

        return BlazingProductionRequest.builder()
                .key(apiRequest.getKey())
                .keySchema(apiRequest.getKeySchema())
                .value(apiRequest.getValue())
                .valueSchema(apiRequest.getValueSchema())
                .topic(apiRequest.getTopic())
                .partition(apiRequest.getPartition())
                .headers(headersMap)
                .producerAdditionalConfigurationRequest(producerAdditionalConfigurationRequest)
                .build();
    }

    private CommonProducerClient currentProducerClient() {
        return this.clientsFactory.currentProducerClient();
    }
}
