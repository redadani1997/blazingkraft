package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import java.nio.ByteBuffer;
import org.apache.kafka.common.header.Headers;

public class ConsumerDoubleDeserializer implements CommonDeserializer {

    @Override
    public String deserialize(String topic, Headers headers, byte[] data) {
        if (data == null) {
            return null;
        }
        try {
            double value = ByteBuffer.wrap(data).getDouble();
            return Double.toString(value);
        } catch (Exception ex) {
            throw new ConsumerException(ex);
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.DOUBLE;
    }
}
