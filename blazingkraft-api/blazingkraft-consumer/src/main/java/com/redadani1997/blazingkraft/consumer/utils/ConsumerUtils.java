package com.redadani1997.blazingkraft.consumer.utils;

import com.redadani1997.blazingkraft.common.util.CommonByteUtils;
import java.util.HashMap;
import java.util.Map;
import lombok.experimental.UtilityClass;
import org.apache.kafka.common.header.Headers;

@UtilityClass
public class ConsumerUtils {

    public static Map<String, Object> mapFromHeaders(Headers headers) {

        if (headers == null) {
            return null;
        }
        try {
            Map<String, Object> headersMap = new HashMap<>();

            headers.forEach(
                    header -> {
                        headersMap.put(header.key(), CommonByteUtils.toString(header.value()));
                    });

            return headersMap;
        } catch (Exception ex) {
            return null;
        }
    }
}
