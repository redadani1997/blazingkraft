package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonSchemaDeserializerUtils;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import io.confluent.kafka.serializers.KafkaJsonDeserializer;
import io.confluent.kafka.serializers.KafkaJsonDeserializerConfig;
import java.util.HashMap;
import org.apache.kafka.common.header.Headers;

public class ConsumerJsonDeserializer implements CommonDeserializer {
    private final KafkaJsonDeserializer<Object> delegateDeserializer;

    public ConsumerJsonDeserializer(boolean isKey) {
        this.delegateDeserializer = new KafkaJsonDeserializer<>();

        KafkaJsonDeserializerConfig config = new KafkaJsonDeserializerConfig(new HashMap<>());

        this.delegateDeserializer.configure(config.originals(), isKey);
    }

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        try {
            Object object = this.delegateDeserializer.deserialize(topic, headers, data);
            return CommonSchemaDeserializerUtils.toJsonString(object, SchemaType.JSON.name());
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new ConsumerException(cause);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.JSON;
    }
}
