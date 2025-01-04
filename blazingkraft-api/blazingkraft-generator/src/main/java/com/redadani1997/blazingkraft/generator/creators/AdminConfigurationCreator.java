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

public class AdminConfigurationCreator {

    public static void main(String[] args) throws IOException {
        //
        //        List<Map.Entry<String, CustomConfigKey>> secondaryConfig =
        //                SecondaryAdminConfigurationCreator.handleAndGetConfig(
        //                        ConfigurationCreator.adminConfigurationUrlPrefix);

        List<Map.Entry<String, CustomConfigKey>> adminConfig = getMergedKeys();

        GeneratorUtils.printConfigurationFiles(
                adminConfig,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/admin",
                "AdminConfiguration",
                "./admin/");

        //        GeneratorUtils.handleImports(
        //                adminConfig,
        //                secondaryConfig,
        //
        // "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/AdminConfiguration.tsx",
        //                "./common_admin/",
        //                "./secondary_admin/",
        //                "AdminConfiguration");
    }

    private static List<Map.Entry<String, CustomConfigKey>> getMergedKeys() throws IOException {
        Map<String, CustomConfigKey> normalKeys = normalKeys();
        Map<String, CustomConfigKey> customKeys = customKeys();

        Map<String, CustomConfigKey> mergedKeys = new HashMap<>(normalKeys);
        mergedKeys.putAll(customKeys);

        List<Map.Entry<String, CustomConfigKey>> configList = new ArrayList<>(mergedKeys.entrySet());

        //        configList.addAll(
        //                SecondaryAdminConfigurationCreator.getRestOfMainConfig(
        //                        ConfigurationCreator.adminConfigurationUrlPrefix));
        return new ArrayList<>(configList);
    }

    private static Map<String, CustomConfigKey> normalKeys() {
        return AdminClientConfig.configDef().configKeys().entrySet().stream()
                //                .filter(conf ->
                // ProducerConfig.configDef().configKeys().containsKey(conf.getKey()))
                .collect(
                        Collectors.toMap(
                                entry -> String.valueOf(entry.getKey()),
                                entry ->
                                        CustomConfigKey.builder()
                                                .configKey(entry.getValue())
                                                .displayedName(entry.getKey())
                                                .documentationProps(
                                                        DocumentationUtils.getCommonDocumentation(
                                                                GeneratorApplication.adminConfigurationUrlPrefix + entry.getKey()))
                                                .build()));
    }

    private static Map<String, CustomConfigKey> customKeys() {

        Map<String, CustomConfigKey> customKeysMap = new HashMap<>();

        return customKeysMap;
    }
}
