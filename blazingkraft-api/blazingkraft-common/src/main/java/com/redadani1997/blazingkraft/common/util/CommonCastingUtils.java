package com.redadani1997.blazingkraft.common.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.redadani1997.blazingkraft.common.model.CommonObjectMapper;
import com.redadani1997.blazingkraft.error.common.CastingException;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonCastingUtils {

    public static <T> T cast(String from, Class<T> to) {
        try {
            return CommonObjectMapper.OBJECT_MAPPER.readValue(from, to);
        } catch (Exception e) {
            throw new CastingException(e, "Error casting from " + from + " to " + to.getSimpleName());
        }
    }

    public static <T> T castWithTypeReference(String from, TypeReference<T> to) {
        try {
            return CommonObjectMapper.OBJECT_MAPPER.readValue(from, to);
        } catch (Exception e) {
            throw new CastingException(
                    e, "Error casting from " + from + " to " + to.getClass().getSimpleName());
        }
    }

    public static <T> T castWithTypeReference(Object from, TypeReference<T> to) {
        try {
            return CommonObjectMapper.OBJECT_MAPPER.convertValue(from, to);
        } catch (Exception e) {
            throw new CastingException(
                    e, "Error casting from " + from + " to " + to.getClass().getSimpleName());
        }
    }

    public static String toJsonString(Object o) {
        if (o == null) {
            return null;
        }
        try {
            return CommonObjectMapper.OBJECT_MAPPER.writeValueAsString(o);
        } catch (Exception e) {
            throw new CastingException(e, String.format("Error stringifying => '%s'.", o));
        }
    }

    public static String toJsonStringOrNull(Object o) {
        try {
            return toJsonString(o);
        } catch (Exception e) {
            return null;
        }
    }

    public static Object toJsonStringOrGet(Object o) {
        try {
            return toJsonString(o);
        } catch (Exception e) {
            return o;
        }
    }

    public static JsonNode toJsonNode(String jsonContent) {
        if (jsonContent == null) {
            return null;
        }
        try {
            return CommonObjectMapper.OBJECT_MAPPER.readTree(jsonContent);
        } catch (Exception ex) {
            throw new CastingException(ex, String.format("Error casting '%s' to JsonNode.", jsonContent));
        }
    }

    public static Object toJsonNodeOrGet(String jsonContent) {
        try {
            return toJsonNode(jsonContent);
        } catch (Exception e) {
            return jsonContent;
        }
    }

    public static String yamlStringToJsonString(String yamlString) {
        if (yamlString == null) {
            return null;
        }
        try {
            Object o = CommonObjectMapper.YAML_OBJECT_MAPPER.readValue(yamlString, Object.class);
            return CommonObjectMapper.OBJECT_MAPPER.writeValueAsString(o);
        } catch (Exception e) {
            throw new CastingException(
                    e, String.format("Error casting '%s' to json string.", yamlString));
        }
    }

    public static String jsonStringToYamlString(String jsonString) {
        if (jsonString == null) {
            return null;
        }
        try {
            Object o = CommonObjectMapper.OBJECT_MAPPER.readValue(jsonString, Object.class);
            return CommonObjectMapper.YAML_OBJECT_MAPPER.writeValueAsString(o);
        } catch (Exception e) {
            throw new CastingException(
                    e, String.format("Error casting '%s' to yaml string.", jsonString));
        }
    }
}
