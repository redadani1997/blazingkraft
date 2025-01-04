package com.redadani1997.blazingkraft.common.model;

import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

public class CommonObjectMapper {

    public static ObjectMapper OBJECT_MAPPER;
    public static ObjectMapper YAML_OBJECT_MAPPER;

    static {
        JsonMapper jsonMapper =
                JsonMapper.builder().enable(JsonReadFeature.ALLOW_NON_NUMERIC_NUMBERS).build();
        OBJECT_MAPPER = jsonMapper;
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    static {
        ObjectMapper yamlObjectMapper = new ObjectMapper(new YAMLFactory());
        JsonMapper.builder().enable(JsonReadFeature.ALLOW_NON_NUMERIC_NUMBERS).build();
        YAML_OBJECT_MAPPER = yamlObjectMapper;
        YAML_OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }
}
