package com.redadani1997.blazingkraft.generator.creators.forget;

import com.redadani1997.blazingkraft.generator.creators.CustomConfigKey;
import com.redadani1997.blazingkraft.generator.utils.DocumentationUtils;
import com.redadani1997.blazingkraft.generator.utils.GeneratorUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;

public class SecondaryProducerConsumerConfigurationCreator {

    public static List<Map.Entry<String, CustomConfigKey>> handleAndGetConfig(
            String documentationUrlPrefix) throws IOException {
        List<Map.Entry<String, CustomConfigKey>> secondaryConfig =
                getMergedKeys(documentationUrlPrefix);

        GeneratorUtils.printConfigurationFiles(
                secondaryConfig,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/secondary_producer_consumer",
                "SecondaryProducerConsumerConfiguration",
                "./secondary_producer_consumer/");

        return secondaryConfig;
    }

    public static List<Map.Entry<String, CustomConfigKey>> getConfig(String documentationUrlPrefix) {
        List<Map.Entry<String, CustomConfigKey>> secondaryConfig =
                getMergedKeys(documentationUrlPrefix);

        return secondaryConfig;
    }

    private static List<Map.Entry<String, CustomConfigKey>> getMergedKeys(
            String documentationUrlPrefix) {
        Map<String, CustomConfigKey> normalKeys = normalKeys(documentationUrlPrefix);
        Map<String, CustomConfigKey> customKeys = customKeys();

        Map<String, CustomConfigKey> mergedKeys = new HashMap<>(normalKeys);
        mergedKeys.putAll(customKeys);
        return new ArrayList<>(mergedKeys.entrySet());
    }

    private static Map<String, CustomConfigKey> normalKeys(String documentationUrlPrefix) {
        return ProducerConfig.configDef().configKeys().entrySet().stream()
                .filter(conf -> ConsumerConfig.configDef().configKeys().keySet().contains(conf.getKey()))
                .collect(
                        Collectors.toMap(
                                entry -> String.valueOf(entry.getKey()),
                                entry ->
                                        CustomConfigKey.builder()
                                                .configKey(entry.getValue())
                                                .displayedName(entry.getKey())
                                                .documentationProps(
                                                        DocumentationUtils.getCommonDocumentation(
                                                                documentationUrlPrefix + entry.getKey()))
                                                .build()));
    }

    private static Map<String, CustomConfigKey> customKeys() {

        Map<String, CustomConfigKey> customKeysMap = new HashMap<>();

        return customKeysMap;
    }
}
