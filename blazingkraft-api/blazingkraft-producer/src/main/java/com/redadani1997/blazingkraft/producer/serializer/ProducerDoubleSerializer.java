package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import java.nio.ByteBuffer;
import org.apache.kafka.common.header.Headers;

public class ProducerDoubleSerializer implements CommonSerializer {

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        try {
            Double doubleData = Double.parseDouble(data);
            ByteBuffer buffer = ByteBuffer.allocate(Double.BYTES);
            buffer.putDouble(doubleData);
            return buffer.array();
        } catch (ClassCastException | NumberFormatException ex) {
            throw new ProducerException(
                    String.format("Failed to cast data to Double, '%s'", ex.getMessage()));
        } catch (Exception ex) {
            throw new ProducerException(ex.getMessage());
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.DOUBLE;
    }
}
