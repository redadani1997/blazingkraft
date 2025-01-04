package com.redadani1997.blazingkraft.generator.creators;

import com.redadani1997.blazingkraft.common.configuration.CommonSchemaRegistryClientConfig;
import com.redadani1997.blazingkraft.generator.utils.DocumentationUtils;
import com.redadani1997.blazingkraft.generator.utils.GeneratorUtils;
import io.confluent.kafka.serializers.KafkaAvroDeserializerConfig;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.kafka.common.config.ConfigDef;

public class AvroSchemaRegistryDeserializerConfigurationCreator {

    public static void main(String[] args) throws IOException {
        Map<String, CustomConfigKey> normalKeys = normalKeys();
        Map<String, CustomConfigKey> customKeys = customKeys();

        Map<String, CustomConfigKey> mergedKeys = new HashMap<>(normalKeys);
        mergedKeys.putAll(customKeys);

        List<Map.Entry<String, CustomConfigKey>> config = new ArrayList<>(mergedKeys.entrySet());

        GeneratorUtils.printConfigurationFiles(
                config,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/avro_schema_registry_deserializer",
                "AvroSchemaRegistryDeserializerConfiguration",
                "./avro_schema_registry_deserializer/");
    }

    private static Map<String, CustomConfigKey> normalKeys() {
        try {
            Field configField = KafkaAvroDeserializerConfig.class.getDeclaredField("config");
            configField.setAccessible(true);

            ConfigDef configDef = (ConfigDef) configField.get(null);

            return configDef.configKeys().entrySet().stream()
                    .filter(
                            entry ->
                                    !CommonSchemaRegistryClientConfig.configDef()
                                            .configKeys()
                                            .containsKey(entry.getKey()))
                    .filter(entry -> !entry.getKey().startsWith("schema.registry"))
                    .collect(
                            Collectors.toMap(
                                    entry -> String.valueOf(entry.getKey()),
                                    entry ->
                                            CustomConfigKey.builder()
                                                    .configKey(entry.getValue())
                                                    .displayedName(entry.getKey())
                                                    .documentationProps(DocumentationUtils.getSerDeDocumentation())
                                                    .build()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static Map<String, CustomConfigKey> customKeys() {
        Map<String, CustomConfigKey> customKeys = new HashMap<>();

        return customKeys;
    }
}
