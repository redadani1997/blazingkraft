package com.redadani1997.blazingkraft.producer.utils;

import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import java.util.Map;
import lombok.experimental.UtilityClass;
import org.apache.kafka.common.header.Headers;
import org.apache.kafka.common.header.internals.RecordHeader;
import org.apache.kafka.common.header.internals.RecordHeaders;

@UtilityClass
public class ProducerUtils {
    public static Headers headersFromMap(Map<String, Object> headersMap) {
        if (headersMap == null) {
            return null;
        }

        RecordHeaders kafkaHeaders = new RecordHeaders();

        headersMap.entrySet().stream()
                .forEach(
                        entry -> {
                            RecordHeader recordHeader =
                                    new RecordHeader(
                                            entry.getKey(), CommonByteUtils.toByteArrayOrNull(entry.getValue()));
                            kafkaHeaders.add(recordHeader);
                        });

        return kafkaHeaders;
    }
}
