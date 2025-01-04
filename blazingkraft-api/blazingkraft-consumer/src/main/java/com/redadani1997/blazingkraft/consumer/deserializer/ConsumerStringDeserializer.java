package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import org.apache.kafka.common.header.Headers;

public class ConsumerStringDeserializer implements CommonDeserializer {

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        return CommonByteUtils.toString(data);
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.STRING;
    }
}
