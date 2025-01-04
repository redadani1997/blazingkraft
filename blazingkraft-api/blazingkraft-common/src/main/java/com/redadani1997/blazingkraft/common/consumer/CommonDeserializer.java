package com.redadani1997.blazingkraft.common.consumer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import org.apache.kafka.common.header.Headers;

public interface CommonDeserializer {

    String deserialize(String topic, Headers headers, byte[] data);

    CommonSerde type();
}
