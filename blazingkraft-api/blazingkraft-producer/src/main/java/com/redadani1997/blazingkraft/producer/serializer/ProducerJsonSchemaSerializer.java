package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonSchemaSerializerUtils;
import com.redadani1997.blazingkraft.common.util.CommonSchemaUtils;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import org.apache.kafka.common.header.Headers;

public class ProducerJsonSchemaSerializer implements CommonSerializer {

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        ParsedSchema parsedSchema = CommonSchemaUtils.parseSchema(dataSchema, SchemaType.JSON.name());
        CommonSchemaUtils.validateSchemaContent(parsedSchema, data, ContentType.JSON.name());
        return CommonSchemaSerializerUtils.serializeWithSchema(data, parsedSchema);
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.JSON_SCHEMA;
    }
}
