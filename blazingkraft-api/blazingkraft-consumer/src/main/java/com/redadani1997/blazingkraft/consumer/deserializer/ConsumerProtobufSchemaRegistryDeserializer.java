package com.redadani1997.blazingkraft.consumer.deserializer;

import com.google.protobuf.Message;
import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonSchemaDeserializerUtils;
import com.redadani1997.blazingkraft.common.util.CommonSerdeUtils;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.serializers.protobuf.KafkaProtobufDeserializer;
import java.util.Map;
import org.apache.kafka.common.header.Headers;

public class ConsumerProtobufSchemaRegistryDeserializer implements CommonDeserializer {

    private final KafkaProtobufDeserializer<Message> delegateDeserializer;

    public ConsumerProtobufSchemaRegistryDeserializer(
            SchemaRegistryClient schemaRegistryClient, Map<String, Object> props, boolean isKey) {
        this.delegateDeserializer = new KafkaProtobufDeserializer<>(schemaRegistryClient);

        CommonSerdeUtils.configureDeserializer(this.delegateDeserializer, isKey, props);
    }

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        try {
            Message message = this.delegateDeserializer.deserialize(topic, headers, data);
            return CommonSchemaDeserializerUtils.toJsonString(message, SchemaType.PROTOBUF.name());
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new ConsumerException(cause);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.PROTOBUF_SCHEMA_REGISTRY;
    }
}
