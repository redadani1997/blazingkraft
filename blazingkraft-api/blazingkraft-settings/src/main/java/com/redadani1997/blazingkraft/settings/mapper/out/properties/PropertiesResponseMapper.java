package com.redadani1997.blazingkraft.settings.mapper.out.properties;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.settings.properties.openapi.model.OIDCProviderPropertiesApiResponse;
import com.redadani1997.blazingkraft.settings.properties.openapi.model.PropertiesApiResponse;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class PropertiesResponseMapper {

    public PropertiesApiResponse propertiesApiResponse(List<OIDCProviderDomain> domains) {
        PropertiesApiResponse response = new PropertiesApiResponse();

        response.setOidcProviders(oidcProviderApiResponses(domains));

        return response;
    }

    private List<OIDCProviderPropertiesApiResponse> oidcProviderApiResponses(
            List<OIDCProviderDomain> domains) {
        if (domains == null) {
            return Collections.emptyList();
        }
        return domains.stream().map(this::oidcProviderApiResponse).toList();
    }

    private OIDCProviderPropertiesApiResponse oidcProviderApiResponse(OIDCProviderDomain domain) {
        if (domain == null) {
            return null;
        }

        OIDCProviderPropertiesApiResponse apiResponse = new OIDCProviderPropertiesApiResponse();

        apiResponse.setCode(domain.getCode());
        apiResponse.setName(domain.getName());
        apiResponse.setIssuer(domain.getIssuer());
        apiResponse.setClientId(domain.getClientId());
        apiResponse.setClientSecret(domain.getClientSecret());
        apiResponse.setPkceEnabled(domain.getPkceEnabled());
        apiResponse.setProviderType(domain.getProviderType());
        apiResponse.setScopes(domain.getScopes());

        return apiResponse;
    }
}
