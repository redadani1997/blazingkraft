package com.redadani1997.blazingkraft.common.util;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonMapUtils {
    public static Map<String, String> toStringMap(Map<String, Object> source) {
        if (source == null) {
            return new HashMap<>();
        }
        return source.entrySet().stream()
                .collect(
                        Collectors.toMap(
                                Map.Entry::getKey,
                                e -> {
                                    if (e.getValue() == null) {
                                        return null;
                                    }
                                    return String.valueOf(e.getValue());
                                }));
    }

    public static <K, V> Map<K, V> mergeMaps(Map<K, V>... maps) {
        Map<K, V> result = new HashMap<>();
        for (Map<K, V> map : maps) {
            if (map != null) {
                result.putAll(map);
            }
        }
        return result;
    }
}
