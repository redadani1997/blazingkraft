package com.redadani1997.blazingkraft.common.producer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import org.apache.kafka.common.header.Headers;

public interface CommonSerializer {
    byte[] serialize(String topic, Headers headers, String data, String dataSchema);

    CommonSerde type();
}
