package com.redadani1997.blazingkraft.connect.dto.in.plugin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PluginListConnectorPluginsRequest {
    private Boolean connectorsOnly;
}
