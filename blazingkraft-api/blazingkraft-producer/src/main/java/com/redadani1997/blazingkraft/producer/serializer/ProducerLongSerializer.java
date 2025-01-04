package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import java.nio.ByteBuffer;
import org.apache.kafka.common.header.Headers;

public class ProducerLongSerializer implements CommonSerializer {

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        try {
            Long longData = Long.parseLong(data);
            ByteBuffer buffer = ByteBuffer.allocate(Long.BYTES);
            buffer.putLong(longData);
            return buffer.array();
        } catch (ClassCastException | NumberFormatException ex) {
            throw new ProducerException(
                    String.format("Failed to cast data to Long, '%s'", ex.getMessage()));
        } catch (Exception ex) {
            throw new ProducerException(ex.getMessage());
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.LONG;
    }
}
