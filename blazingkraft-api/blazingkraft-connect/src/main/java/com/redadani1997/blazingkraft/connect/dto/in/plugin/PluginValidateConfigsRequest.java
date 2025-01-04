package com.redadani1997.blazingkraft.connect.dto.in.plugin;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PluginValidateConfigsRequest {
    private String pluginName;
    private Map<String, String> requestBody;
}
