package com.redadani1997.blazingkraft.management.mapper.out.oidc_provider;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderApiResponse;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OIDCProviderResponseMapper {
    public OIDCProviderApiResponse oidcProviderApiResponse(OIDCProviderModel model) {
        if (model == null) {
            return null;
        }

        OIDCProviderApiResponse response = new OIDCProviderApiResponse();

        response.setCode(model.getCode());
        response.setName(model.getName());
        response.setIssuer(model.getIssuer());
        response.setClientId(model.getClientId());
        response.setClientSecret(model.getClientSecret());
        response.setPkceEnabled(model.getPkceEnabled());
        response.setProviderType(model.getProviderType());
        response.setScopes(List.of(model.getScopes().split(" ;;;; ")));
        response.setIsSystem(false);

        return response;
    }

    public List<OIDCProviderApiResponse> oidcProviderApiResponsesFromCache(
            List<OIDCProviderDomain> domains) {
        if (domains == null) {
            return Collections.emptyList();
        }
        return domains.stream().map(this::oidcProviderApiResponseFromCache).toList();
    }

    public OIDCProviderApiResponse oidcProviderApiResponseFromCache(OIDCProviderDomain domain) {
        if (domain == null) {
            return null;
        }

        OIDCProviderApiResponse response = new OIDCProviderApiResponse();

        response.setCode(domain.getCode());
        response.setName(domain.getName());
        response.setIssuer(domain.getIssuer());
        response.setClientId(domain.getClientId());
        response.setClientSecret(domain.getClientSecret());
        response.setPkceEnabled(domain.getPkceEnabled());
        response.setProviderType(domain.getProviderType());
        response.setScopes(domain.getScopes());
        response.setIsSystem(domain.isSystem());

        return response;
    }
}
