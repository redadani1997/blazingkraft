package com.redadani1997.blazingkraft.client.validator;

import com.redadani1997.blazingkraft.common.configuration.CommonTopicConfig;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class TopicConfigurationValidator
        implements ConfigurationValidator<Map<String, String>, Map<String, String>> {
    @Override
    public Map<String, String> validateAndCompute(Map<String, String> configuration) {
        CommonTopicConfig.configDef().validate(configuration);

        //        return ConfigurationValidatorUtils.computeConfiguration(configuration,
        // CustomTopicConfig.configDef());

        return configuration;
    }
}
