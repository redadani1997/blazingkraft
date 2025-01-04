package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import java.util.Base64;
import org.apache.kafka.common.header.Headers;

public class ProducerBase64Serializer implements CommonSerializer {

    @Override
    public byte[] serialize(String topic, Headers headers, String data, String dataSchema) {
        if (data == null) {
            return null;
        }
        try {
            return Base64.getEncoder().encode(CommonByteUtils.toByteArray(data));
        } catch (Exception ex) {
            throw new ProducerException(
                    String.format("Failed to cast data to Base64, '%s'", ex.getMessage()));
        }
    }

    @Override
    public CommonSerde type() {
        return CommonSerde.BASE64;
    }
}
