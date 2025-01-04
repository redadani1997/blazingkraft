package com.redadani1997.blazingkraft.client.validator;

import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.config.ConfigDef;

@UtilityClass
@Slf4j
public class ConfigurationValidatorUtils {

    public static Map<String, Object> computeConfiguration(
            Map<String, Object> configuration, ConfigDef configDef) {

        Map<String, Object> newConfiguration =
                ConfigurationValidatorUtils.removeBlankValues(configuration);

        doValidateConfigDef(newConfiguration, configDef);

        Map<String, Object> computedConfiguration = new HashMap<>();
        newConfiguration
                .entrySet()
                .forEach(
                        entry -> {
                            computedConfiguration.put(
                                    entry.getKey(),
                                    computeConfigurationValue(entry.getValue(), typeOf(entry.getKey(), configDef)));
                        });
        return computedConfiguration;
    }

    private static void doValidateConfigDef(Map<String, Object> configuration, ConfigDef configDef) {
        Map<String, String> targetConfiguration =
                configuration.entrySet().stream()
                        .collect(
                                Collectors.toMap(Map.Entry::getKey, entry -> String.valueOf(entry.getValue())));
        configDef.validate(targetConfiguration);
    }

    private static Map<String, Object> removeBlankValues(Map<String, Object> configuration) {
        return configuration.entrySet().stream()
                .filter(
                        entry -> {
                            if (entry.getValue() == null) {
                                return false;
                            }
                            if (entry.getValue() instanceof String) {
                                String value = (String) entry.getValue();
                                return !value.isEmpty() && !value.isBlank();
                            }
                            return true;
                        })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    private Object computeConfigurationValue(Object value, ConfigDef.Type type) {
        if (value == null) {
            return null;
        }
        try {
            if (ConfigDef.Type.INT.equals(type)) {
                return Integer.valueOf(String.valueOf(value));
            }
            if (ConfigDef.Type.LONG.equals(type)) {
                return Long.valueOf(String.valueOf(value));
            }
            if (ConfigDef.Type.SHORT.equals(type)) {
                return Short.valueOf(String.valueOf(value));
            }
            if (ConfigDef.Type.DOUBLE.equals(type)) {
                return Double.valueOf(String.valueOf(value));
            }
            return value;
        } catch (Exception ex) {
            log.error(
                    CommonLogUtils.getError("Couldn't cast '{}' to Expected Type '{}'"), value, type.name());
            return value;
        }
    }

    public ConfigDef.Type typeOf(String key, ConfigDef configDef) {
        ConfigDef.ConfigKey configKey = configDef.configKeys().get(key);
        if (configKey == null) return null;
        return configKey.type;
    }
}
