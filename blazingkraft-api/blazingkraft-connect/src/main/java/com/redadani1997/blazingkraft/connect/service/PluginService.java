package com.redadani1997.blazingkraft.connect.service;

import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginGetConnectorConfigDefRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginListConnectorPluginsRequest;
import com.redadani1997.blazingkraft.connect.dto.in.plugin.PluginValidateConfigsRequest;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigInfosApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigKeyInfoApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.PluginInfoApiResponse;
import java.util.List;

public interface PluginService {
    List<ConfigKeyInfoApiResponse> getConnectorConfigDef(PluginGetConnectorConfigDefRequest request);

    List<PluginInfoApiResponse> listConnectorPlugins(PluginListConnectorPluginsRequest request);

    ConfigInfosApiResponse validateConfigs(PluginValidateConfigsRequest request);
}
