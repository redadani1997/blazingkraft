package com.redadani1997.blazingkraft.producer.serializer;

import com.fasterxml.jackson.databind.JsonNode;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import io.confluent.kafka.serializers.KafkaJsonSerializer;
import io.confluent.kafka.serializers.KafkaJsonSerializerConfig;
import java.util.HashMap;
import org.apache.kafka.common.header.Headers;

public class ProducerJsonSerializer implements CommonSerializer {

    private final KafkaJsonSerializer<JsonNode> delegateSerializer;

    public ProducerJsonSerializer() {
        this.delegateSerializer = new KafkaJsonSerializer<>();

        KafkaJsonSerializerConfig config = new KafkaJsonSerializerConfig(new HashMap<>());
        this.delegateSerializer.configure(config.originals(), false);
    }

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        try {
            JsonNode jsonNode = CommonCastingUtils.toJsonNode(data);
            return this.delegateSerializer.serialize(topic, headers, jsonNode);
        } catch (Exception ex) {
            throw new ProducerException(ex);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.JSON;
    }
}
