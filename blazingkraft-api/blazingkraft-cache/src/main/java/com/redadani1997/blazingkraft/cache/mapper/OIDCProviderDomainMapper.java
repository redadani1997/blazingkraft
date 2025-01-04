package com.redadani1997.blazingkraft.cache.mapper;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class OIDCProviderDomainMapper {

    public List<OIDCProviderDomain> oidcProviderDomains(List<OIDCProviderModel> models) {
        if (models == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(models.stream().map(this::oidcProviderDomain).toList());
    }

    public OIDCProviderDomain oidcProviderDomain(OIDCProviderModel model) {
        if (model == null) {
            return null;
        }

        OIDCProviderDomain domain = new OIDCProviderDomain();

        domain.setCode(model.getCode());
        domain.setName(model.getName());
        domain.setIssuer(model.getIssuer());
        domain.setClientId(model.getClientId());
        domain.setClientSecret(model.getClientSecret());
        domain.setPkceEnabled(model.getPkceEnabled());
        domain.setProviderType(model.getProviderType());
        domain.setScopes(List.of(model.getScopes().split(" ;;;; ")));
        domain.setSystem(false);

        return domain;
    }
}
