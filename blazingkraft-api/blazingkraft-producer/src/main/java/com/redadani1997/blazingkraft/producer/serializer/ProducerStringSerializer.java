package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import org.apache.kafka.common.header.Headers;

public class ProducerStringSerializer implements CommonSerializer {

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        if (data == null) {
            return null;
        }
        try {
            return CommonByteUtils.toByteArray(data);
        } catch (ClassCastException ex) {
            throw new ProducerException(
                    String.format("Failed to cast data to String, '%s'", ex.getMessage()));
        } catch (Exception ex) {
            throw new ProducerException(ex.getMessage());
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.STRING;
    }
}
