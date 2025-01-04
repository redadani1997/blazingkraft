package com.redadani1997.blazingkraft.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.redadani1997.blazingkraft.common.model.CommonObjectMapper;
import com.redadani1997.blazingkraft.error.common.MapToStringTransformException;
import com.redadani1997.blazingkraft.error.common.StringToMapTransformException;
import java.util.HashMap;
import java.util.Map;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonTextUtils {

    public static <T> Map<String, T> stringToMap(String content) {
        if (content == null) {
            return null;
        }
        if (content.isBlank()) {
            return new HashMap<>();
        }
        try {
            TypeReference<HashMap<String, T>> typeRef = new TypeReference<>() {};
            return CommonObjectMapper.OBJECT_MAPPER.readValue(content, typeRef);
        } catch (JsonProcessingException e) {
            throw new StringToMapTransformException(content);
        }
    }

    public static <T> String mapToString(Map<String, T> content) {
        if (content == null) {
            return null;
        }
        try {
            return CommonObjectMapper.OBJECT_MAPPER.writeValueAsString(content);
        } catch (JsonProcessingException e) {
            throw new MapToStringTransformException(content);
        }
    }
}
