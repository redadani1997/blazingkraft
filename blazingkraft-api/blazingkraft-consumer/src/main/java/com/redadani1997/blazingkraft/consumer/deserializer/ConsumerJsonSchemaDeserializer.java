package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import com.redadani1997.blazingkraft.common.util.CommonSchemaDeserializerUtils;
import com.redadani1997.blazingkraft.common.util.CommonSchemaUtils;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import org.apache.kafka.common.header.Headers;

public class ConsumerJsonSchemaDeserializer implements CommonDeserializer {

    private final ParsedSchema parsedSchema;

    public ConsumerJsonSchemaDeserializer(String schema) {
        this.parsedSchema = CommonSchemaUtils.parseSchema(schema, SchemaType.JSON.name());
    }

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        try {
            CommonSchemaDeserializerUtils.deserializeWithSchema(data, this.parsedSchema);
            return CommonSchemaDeserializerUtils.toJsonString(
                    CommonByteUtils.toString(data), SchemaType.JSON.name());
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new ConsumerException(cause);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.JSON_SCHEMA;
    }
}
