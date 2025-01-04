package com.redadani1997.blazingkraft.connect.mapper.in.plugin;

import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginGetConnectorConfigDefRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginListConnectorPluginsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginValidateConfigsRequest;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PluginRequestMapper {

    public PluginGetConnectorConfigDefRequest pluginGetConnectorConfigDefRequest(String pluginName) {
        CommonValidator.assertNotNull("Plugin Name", pluginName);
        return PluginGetConnectorConfigDefRequest.builder().pluginName(pluginName).build();
    }

    public PluginListConnectorPluginsRequest pluginListConnectorPluginsRequest(
            Boolean connectorsOnly) {
        CommonValidator.assertNotNull("Connectors Only", connectorsOnly);
        return PluginListConnectorPluginsRequest.builder().connectorsOnly(connectorsOnly).build();
    }

    public PluginValidateConfigsRequest pluginValidateConfigsRequest(
            String pluginName, Map<String, String> requestBody) {
        CommonValidator.assertNotNull("Plugin Name", pluginName);
        return PluginValidateConfigsRequest.builder()
                .pluginName(pluginName)
                .requestBody(requestBody)
                .build();
    }
}
