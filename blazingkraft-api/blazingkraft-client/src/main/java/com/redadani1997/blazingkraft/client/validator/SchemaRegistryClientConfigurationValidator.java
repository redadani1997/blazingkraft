package com.redadani1997.blazingkraft.client.validator;

import com.redadani1997.blazingkraft.common.configuration.CommonSchemaRegistryClientConfig;
import java.util.Map;
import org.apache.kafka.common.config.ConfigDef;
import org.springframework.stereotype.Component;

@Component
public class SchemaRegistryClientConfigurationValidator
        implements ConfigurationValidator<Map<String, Object>, Map<String, Object>> {
    @Override
    public Map<String, Object> validateAndCompute(Map<String, Object> configuration) {
        ConfigDef configDef = CommonSchemaRegistryClientConfig.configDef();

        return ConfigurationValidatorUtils.computeConfiguration(configuration, configDef);
    }
}
