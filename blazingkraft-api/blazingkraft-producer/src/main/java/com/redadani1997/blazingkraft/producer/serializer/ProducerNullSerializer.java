package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import org.apache.kafka.common.header.Headers;

public class ProducerNullSerializer implements CommonSerializer {

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        return null;
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.NULL;
    }
}
