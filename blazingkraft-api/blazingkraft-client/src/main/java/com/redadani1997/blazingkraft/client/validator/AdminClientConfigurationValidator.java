package com.redadani1997.blazingkraft.client.validator;

import java.util.Map;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.common.config.ConfigDef;
import org.springframework.stereotype.Component;

@Component
public class AdminClientConfigurationValidator
        implements ConfigurationValidator<Map<String, Object>, Map<String, Object>> {
    @Override
    public Map<String, Object> validateAndCompute(Map<String, Object> configuration) {
        ConfigDef configDef = AdminClientConfig.configDef();

        return ConfigurationValidatorUtils.computeConfiguration(configuration, configDef);
    }
}
