package com.redadani1997.blazingkraft.client.validator;

import java.util.Map;
import java.util.stream.Collectors;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.config.ConfigDef;
import org.springframework.stereotype.Component;

@Component
public class ProducerClientConfigurationValidator
        implements ConfigurationValidator<Map<String, Object>, Map<String, Object>> {
    @Override
    public Map<String, Object> validateAndCompute(Map<String, Object> configuration) {

        ConfigDef configDef = ProducerConfig.configDef();

        Map<String, String> targetConfiguration =
                configuration.entrySet().stream()
                        .collect(
                                Collectors.toMap(Map.Entry::getKey, entry -> String.valueOf(entry.getValue())));
        configDef.validate(targetConfiguration);

        return ConfigurationValidatorUtils.computeConfiguration(configuration, configDef);
    }
}
