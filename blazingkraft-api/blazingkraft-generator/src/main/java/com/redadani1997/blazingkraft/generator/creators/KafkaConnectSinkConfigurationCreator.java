package com.redadani1997.blazingkraft.generator.creators;

import com.redadani1997.blazingkraft.generator.GeneratorApplication;
import com.redadani1997.blazingkraft.generator.configuration.KafkaConnectSinkConnectorConfiguration;
import com.redadani1997.blazingkraft.generator.utils.DocumentationUtils;
import com.redadani1997.blazingkraft.generator.utils.GeneratorUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class KafkaConnectSinkConfigurationCreator {

    public static void main(String[] args) throws IOException {
        Map<String, CustomConfigKey> normalKeys = normalKeys();
        Map<String, CustomConfigKey> customKeys = customKeys();

        Map<String, CustomConfigKey> mergedKeys = new HashMap<>(normalKeys);
        mergedKeys.putAll(customKeys);

        List<Map.Entry<String, CustomConfigKey>> topicConfig = new ArrayList<>(mergedKeys.entrySet());

        GeneratorUtils.printConfigurationFiles(
                topicConfig,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/kafka_connect_sink",
                "KafkaConnectSinkConnectorConfiguration",
                "./kafka_connect_sink/");
    }

    private static Map<String, CustomConfigKey> normalKeys() {
        return KafkaConnectSinkConnectorConfiguration.configDef().configKeys().entrySet().stream()
                .collect(
                        Collectors.toMap(
                                entry -> String.valueOf(entry.getKey()),
                                entry ->
                                        CustomConfigKey.builder()
                                                .configKey(entry.getValue())
                                                .displayedName(entry.getKey())
                                                .documentationProps(
                                                        DocumentationUtils.getKafkaConnectorDocumentation(
                                                                GeneratorApplication.kafkaConnectSinkConfigurationUrlPrefix
                                                                        + entry.getKey().replaceAll("\\.", "-")))
                                                .build()));
    }

    private static Map<String, CustomConfigKey> customKeys() {
        return new HashMap<>();
    }
}
