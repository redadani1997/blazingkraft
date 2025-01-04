package com.redadani1997.blazingkraft.generator.creators;

import lombok.Builder;
import lombok.Getter;
import org.apache.kafka.common.config.ConfigDef;

@Builder
@Getter
public class CustomConfigKey {
    private ConfigDef.ConfigKey configKey;
    private String documentationProps;
    private String displayedName;
}
