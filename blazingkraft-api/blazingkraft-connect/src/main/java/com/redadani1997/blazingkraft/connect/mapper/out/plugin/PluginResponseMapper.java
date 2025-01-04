package com.redadani1997.blazingkraft.connect.mapper.out.plugin;

import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigInfosApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.ConfigKeyInfoApiResponse;
import com.redadani1997.blazingkraft.connect.plugin.openapi.model.PluginInfoApiResponse;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PluginResponseMapper {
    public List<PluginInfoApiResponse> pluginInfoResponses(String json) {
        PluginInfoApiResponse[] responses =
                CommonCastingUtils.cast(json, PluginInfoApiResponse[].class);

        return Arrays.asList(responses);
    }

    public List<ConfigKeyInfoApiResponse> configKeyInfoApiResponses(String json) {
        ConfigKeyInfoApiResponse[] responses =
                CommonCastingUtils.cast(json, ConfigKeyInfoApiResponse[].class);

        return Arrays.asList(responses);
    }

    public ConfigInfosApiResponse configInfosApiResponse(String json) {
        return CommonCastingUtils.cast(json, ConfigInfosApiResponse.class);
    }
}
