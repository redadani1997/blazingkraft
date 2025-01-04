package com.redadani1997.blazingkraft.generator.creators.forget;

import com.redadani1997.blazingkraft.generator.creators.CustomConfigKey;
import com.redadani1997.blazingkraft.generator.utils.GeneratorUtils;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.kafka.common.config.ConfigDef;

public class SecondaryAdminConfigurationCreator {

    public static List<Map.Entry<String, CustomConfigKey>> handleAndGetConfig(
            String documentationUrlPrefix) throws IOException {
        List<Map.Entry<String, CustomConfigKey>> secondaryConfig =
                SecondaryProducerConsumerConfigurationCreator.getConfig(documentationUrlPrefix).stream()
                        .filter(
                                config ->
                                        !ConfigDef.Importance.HIGH.equals(config.getValue().getConfigKey().importance))
                        .collect(Collectors.toList());

        GeneratorUtils.printConfigurationFiles(
                secondaryConfig,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/secondary_admin",
                "SecondaryAdminConfiguration",
                "./secondary_admin/");

        return secondaryConfig;
    }

    public static List<Map.Entry<String, CustomConfigKey>> getRestOfMainConfig(
            String documentationUrlPrefix) {
        List<Map.Entry<String, CustomConfigKey>> restOfMainConfig =
                SecondaryProducerConsumerConfigurationCreator.getConfig(documentationUrlPrefix).stream()
                        .filter(
                                config ->
                                        ConfigDef.Importance.HIGH.equals(config.getValue().getConfigKey().importance))
                        .collect(Collectors.toList());

        return restOfMainConfig;
    }
}
