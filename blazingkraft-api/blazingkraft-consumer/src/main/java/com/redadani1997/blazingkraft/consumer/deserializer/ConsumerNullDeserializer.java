package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import org.apache.kafka.common.header.Headers;

public class ConsumerNullDeserializer implements CommonDeserializer {
    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        return null;
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.NULL;
    }
}
