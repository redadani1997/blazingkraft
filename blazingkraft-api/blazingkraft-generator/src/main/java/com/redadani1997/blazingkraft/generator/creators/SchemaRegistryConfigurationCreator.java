package com.redadani1997.blazingkraft.generator.creators;

import com.redadani1997.blazingkraft.common.configuration.CommonSchemaRegistryClientConfig;
import com.redadani1997.blazingkraft.generator.GeneratorApplication;
import com.redadani1997.blazingkraft.generator.utils.DocumentationUtils;
import com.redadani1997.blazingkraft.generator.utils.GeneratorUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SchemaRegistryConfigurationCreator {

    public static void main(String[] args) throws IOException {
        Map<String, CustomConfigKey> normalKeys = normalKeys();
        Map<String, CustomConfigKey> customKeys = customKeys();

        Map<String, CustomConfigKey> mergedKeys = new HashMap<>(normalKeys);
        mergedKeys.putAll(customKeys);

        List<Map.Entry<String, CustomConfigKey>> topicConfig = new ArrayList<>(mergedKeys.entrySet());

        GeneratorUtils.printConfigurationFiles(
                topicConfig,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/schema_registry",
                "SchemaRegistryConfiguration",
                "./schema_registry/");
        //
        //        GeneratorUtils.handleImports(
        //                topicConfig,
        //                Collections.EMPTY_LIST,
        //
        // "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/SchemaRegistryConfiguration.tsx",
        //                "./schema_registry/",
        //                "",
        //                "SchemaRegistryConfiguration");
    }

    private static Map<String, CustomConfigKey> normalKeys() {
        return CommonSchemaRegistryClientConfig.configDef().configKeys().entrySet().stream()
                .collect(
                        Collectors.toMap(
                                entry -> String.valueOf(entry.getKey()),
                                entry ->
                                        CustomConfigKey.builder()
                                                .configKey(entry.getValue())
                                                .displayedName(entry.getKey())
                                                .documentationProps(
                                                        DocumentationUtils.getSchemaRegistryDocumentation(
                                                                GeneratorApplication.schemaRegistryConfigurationUrl))
                                                .build()));
    }

    private static Map<String, CustomConfigKey> customKeys() {

        Map<String, CustomConfigKey> customKeysMap = new HashMap<>();

        return customKeysMap;
    }
}
