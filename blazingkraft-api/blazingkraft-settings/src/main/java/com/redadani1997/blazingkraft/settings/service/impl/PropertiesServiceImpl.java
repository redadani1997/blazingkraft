package com.redadani1997.blazingkraft.settings.service.impl;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.cache.service.OIDCProviderCache;
import com.redadani1997.blazingkraft.common.util.CommonRequestUtils;
import com.redadani1997.blazingkraft.settings.mapper.out.SettingsResponseMapper;
import com.redadani1997.blazingkraft.settings.mapper.out.properties.PropertiesResponseMapper;
import com.redadani1997.blazingkraft.settings.properties.openapi.model.PropertiesApiResponse;
import com.redadani1997.blazingkraft.settings.service.PropertiesService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertiesServiceImpl implements PropertiesService {

    private final OIDCProviderCache oidcProviderCache;
    private final SettingsResponseMapper settingsResponseMapper;

    @Override
    public PropertiesApiResponse getProperties() {
        // Initialize the current path so that subsequent calls to resource server
        // may be able to identify to current path issuer.
        CommonRequestUtils.initCurrentPath();

        List<OIDCProviderDomain> oidcProviderDomains = this.oidcProviderCache.get();

        return this.propertiesResponseMapper().propertiesApiResponse(oidcProviderDomains);
    }

    private PropertiesResponseMapper propertiesResponseMapper() {
        return this.settingsResponseMapper.propertiesResponseMapper();
    }
}
