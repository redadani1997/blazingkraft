package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import java.util.Base64;
import org.apache.kafka.common.header.Headers;

public class ConsumerBase64Deserializer implements CommonDeserializer {

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        if (data == null) {
            return null;
        }
        try {
            return new String(Base64.getDecoder().decode(data));
        } catch (Exception ex) {
            throw new ConsumerException(ex);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.BASE64;
    }
}
