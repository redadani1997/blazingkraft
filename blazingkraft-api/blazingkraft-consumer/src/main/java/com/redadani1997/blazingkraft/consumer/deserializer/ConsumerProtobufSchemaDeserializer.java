package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonSchemaDeserializerUtils;
import com.redadani1997.blazingkraft.common.util.CommonSchemaUtils;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import org.apache.kafka.common.header.Headers;

public class ConsumerProtobufSchemaDeserializer implements CommonDeserializer {

    private final ParsedSchema parsedSchema;

    public ConsumerProtobufSchemaDeserializer(String schema) {
        this.parsedSchema = CommonSchemaUtils.parseSchema(schema, SchemaType.PROTOBUF.name());
    }

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        try {
            Object message = CommonSchemaDeserializerUtils.deserializeWithSchema(data, this.parsedSchema);
            return CommonSchemaDeserializerUtils.toJsonString(message, SchemaType.PROTOBUF.name());
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new ConsumerException(cause);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.PROTOBUF_SCHEMA;
    }
}
