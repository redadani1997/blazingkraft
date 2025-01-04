package com.redadani1997.blazingkraft.settings.mapper.out;

import com.redadani1997.blazingkraft.settings.mapper.out.configuration.ConfigurationResponseMapper;
import com.redadani1997.blazingkraft.settings.mapper.out.properties.PropertiesResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SettingsResponseMapper {
    private final ConfigurationResponseMapper configurationResponseMapper;
    private final PropertiesResponseMapper propertiesResponseMapper;

    public ConfigurationResponseMapper configurationResponseMapper() {
        return this.configurationResponseMapper;
    }

    public PropertiesResponseMapper propertiesResponseMapper() {
        return this.propertiesResponseMapper;
    }
}
