package com.redadani1997.blazingkraft.generator.creators;

import com.redadani1997.blazingkraft.generator.GeneratorApplication;
import com.redadani1997.blazingkraft.generator.utils.DocumentationUtils;
import com.redadani1997.blazingkraft.generator.utils.GeneratorUtils;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.consumer.ConsumerConfig;

public class ConsumerConfigurationCreator {

    public static void main(String[] args) throws IOException {

        //        List<Map.Entry<String, CustomConfigKey>> secondaryConfig =
        //                SecondaryProducerConsumerConfigurationCreator.handleAndGetConfig(
        //                        ConfigurationCreator.consumerConfigurationUrlPrefix);

        List<Map.Entry<String, CustomConfigKey>> consumerConfig = getMergedKeys();

        GeneratorUtils.printConfigurationFiles(
                consumerConfig,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/consumer",
                "ConsumerConfiguration",
                "./consumer/");

        //        GeneratorUtils.handleImports(
        //                consumerConfig,
        //                secondaryConfig,
        //
        // "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/ConsumerConfiguration.tsx",
        //                "./consumer/",
        //                "./secondary_producer_consumer/",
        //                "ConsumerConfiguration");
    }

    public static List<Map.Entry<String, CustomConfigKey>> getMergedKeys() {
        Map<String, CustomConfigKey> normalKeys = normalKeys();
        Map<String, CustomConfigKey> customKeys = customKeys();

        Map<String, CustomConfigKey> mergedKeys = new HashMap<>(normalKeys);
        mergedKeys.putAll(customKeys);
        return new ArrayList<>(mergedKeys.entrySet());
    }

    private static Map<String, CustomConfigKey> normalKeys() {
        return ConsumerConfig.configDef().configKeys().entrySet().stream()
                .filter(conf -> !AdminClientConfig.configDef().configKeys().containsKey(conf.getKey()))
                .filter(
                        conf ->
                                !conf.getKey().equals(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG)
                                        && !conf.getKey().equals(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG))
                .collect(
                        Collectors.toMap(
                                entry -> String.valueOf(entry.getKey()),
                                entry ->
                                        CustomConfigKey.builder()
                                                .configKey(entry.getValue())
                                                .displayedName(entry.getKey())
                                                .documentationProps(
                                                        DocumentationUtils.getCommonDocumentation(
                                                                GeneratorApplication.consumerConfigurationUrlPrefix
                                                                        + entry.getKey()))
                                                .build()));
    }

    private static Map<String, CustomConfigKey> customKeys() {

        Map<String, CustomConfigKey> customKeysMap = new HashMap<>();

        return customKeysMap;
    }
}
