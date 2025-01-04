package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonSchemaDeserializerUtils;
import com.redadani1997.blazingkraft.common.util.CommonSerdeUtils;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.serializers.json.KafkaJsonSchemaDeserializer;
import java.util.Map;
import org.apache.kafka.common.header.Headers;

public class ConsumerJsonSchemaRegistryDeserializer implements CommonDeserializer {

    private final KafkaJsonSchemaDeserializer<Object> delegateDeserializer;

    public ConsumerJsonSchemaRegistryDeserializer(
            SchemaRegistryClient schemaRegistryClient, Map<String, Object> props, boolean isKey) {
        this.delegateDeserializer = new KafkaJsonSchemaDeserializer<>(schemaRegistryClient);

        CommonSerdeUtils.configureDeserializer(this.delegateDeserializer, isKey, props);
    }

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        try {
            Object jsonNode = this.delegateDeserializer.deserialize(topic, headers, data);
            return CommonSchemaDeserializerUtils.toJsonString(jsonNode, SchemaType.JSON.name());
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new ConsumerException(cause);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.JSON_SCHEMA_REGISTRY;
    }
}
