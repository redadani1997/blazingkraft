package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonSchemaDeserializerUtils;
import com.redadani1997.blazingkraft.common.util.CommonSchemaUtils;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import org.apache.kafka.common.header.Headers;

public class ConsumerAvroSchemaDeserializer implements CommonDeserializer {

    private final ParsedSchema parsedSchema;

    public ConsumerAvroSchemaDeserializer(String schema) {
        this.parsedSchema = CommonSchemaUtils.parseSchema(schema, SchemaType.AVRO.name());
    }

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        try {
            Object genericData =
                    CommonSchemaDeserializerUtils.deserializeWithSchema(data, this.parsedSchema);

            return CommonSchemaDeserializerUtils.toJsonString(genericData, SchemaType.AVRO.name());
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new ConsumerException(cause);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.AVRO_SCHEMA;
    }
}
