package com.redadani1997.blazingkraft.management.service.impl;

import com.redadani1997.blazingkraft.cache.domain.OIDCProviderDomain;
import com.redadani1997.blazingkraft.cache.service.OIDCProviderCache;
import com.redadani1997.blazingkraft.common.rest.client.impl.CommonNoAuthRestTemplate;
import com.redadani1997.blazingkraft.dao.dao.OIDCProviderDao;
import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import com.redadani1997.blazingkraft.error.management.ManagementException;
import com.redadani1997.blazingkraft.error.management.OIDCProviderException;
import com.redadani1997.blazingkraft.management.dto.in.oidc_provider.*;
import com.redadani1997.blazingkraft.management.mapper.out.ManagementResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.oidc_provider.OIDCProviderResponseMapper;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderApiResponse;
import com.redadani1997.blazingkraft.management.service.OIDCProviderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OIDCProviderServiceImpl implements OIDCProviderService {
    private final OIDCProviderDao dao;
    private final ManagementResponseMapper managementResponseMapper;
    private final OIDCProviderCache cache;

    @Override
    public OIDCProviderApiResponse createOIDCProvider(OIDCProviderCreateRequest request) {
        OIDCProviderDomain systemOIDCProviderDomain = this.cache.getSystem();
        if (systemOIDCProviderDomain != null
                && systemOIDCProviderDomain.getCode().equals(request.getCode())) {
            throw new ManagementException(
                    String.format("System OIDC Provider with code '%s' already exists", request.getCode()));
        }

        this.cache.invalidate();

        OIDCProviderModel model = new OIDCProviderModel();
        model.setCode(request.getCode());
        model.setName(request.getName());
        model.setIssuer(request.getIssuer());
        model.setClientId(request.getClientId());
        model.setClientSecret(request.getClientSecret());
        model.setPkceEnabled(request.getPkceEnabled());
        model.setProviderType(request.getProviderType());
        model.setScopes(request.getScopes());

        OIDCProviderModel savedModel = this.dao.create(model);

        return this.oidcProviderResponseMapper().oidcProviderApiResponse(savedModel);
    }

    @Override
    public void deleteOIDCProvider(OIDCProviderDeleteRequest request) {
        OIDCProviderDomain systemOIDCProviderDomain = this.cache.getSystem();
        if (systemOIDCProviderDomain != null
                && systemOIDCProviderDomain.getCode().equals(request.getCode())) {
            throw new ManagementException(
                    String.format(
                            "System OIDC Provider with code '%s' cannot be deleted", request.getCode()));
        }

        this.cache.invalidate();

        OIDCProviderModel model = this.dao.findByCode(request.getCode());

        this.dao.deleteById(model.getId());
    }

    @Override
    public OIDCProviderApiResponse editOIDCProvider(OIDCProviderEditRequest request) {
        OIDCProviderDomain systemOIDCProviderDomain = this.cache.getSystem();
        if (systemOIDCProviderDomain != null
                && systemOIDCProviderDomain.getCode().equals(request.getExistingCode())) {
            throw new ManagementException(
                    String.format(
                            "System OIDC Provider with code '%s' cannot be edited", request.getExistingCode()));
        }
        this.cache.invalidate();

        OIDCProviderModel model = this.dao.findByCode(request.getExistingCode());

        if (!request.getNewCode().equals(request.getExistingCode())) {
            Boolean newCodeExists = this.dao.existsByCode(request.getNewCode());
            if (newCodeExists) {
                throw new ManagementException(
                        String.format("OIDC Provider with code '%s' already exists", request.getNewCode()));
            }
        }

        model.setCode(request.getNewCode());
        model.setName(request.getName());
        model.setIssuer(request.getIssuer());
        model.setClientId(request.getClientId());
        model.setClientSecret(request.getClientSecret());
        model.setPkceEnabled(request.getPkceEnabled());
        model.setProviderType(request.getProviderType());
        model.setScopes(request.getScopes());

        OIDCProviderModel savedModel = this.dao.update(model);

        return this.oidcProviderResponseMapper().oidcProviderApiResponse(savedModel);
    }

    @Override
    public List<OIDCProviderApiResponse> getAllOIDCProviders() {
        return this.oidcProviderResponseMapper().oidcProviderApiResponsesFromCache(this.cache.get());
    }

    @Override
    public void testOIDCProviderConnectivity(OIDCProviderTestConnectivityRequest request) {
        CommonNoAuthRestTemplate commonNoAuthRestTemplate =
                new CommonNoAuthRestTemplate(request.getIssuer());

        try {
            commonNoAuthRestTemplate
                    .restTemplate()
                    .getForEntity("/.well-known/openid-configuration", String.class);
        } catch (Exception ex) {
            throw new OIDCProviderException(ex.getMessage());
        }
    }

    @Override
    public OIDCProviderApiResponse getOIDCProviderDetails(OIDCProviderDetailsRequest request) {
        OIDCProviderDomain systemOIDCProviderDomain = this.cache.getSystem();
        if (systemOIDCProviderDomain != null
                && systemOIDCProviderDomain.getCode().equals(request.getCode())) {
            return this.oidcProviderResponseMapper()
                    .oidcProviderApiResponseFromCache(systemOIDCProviderDomain);
        }

        OIDCProviderModel model = this.dao.findByCode(request.getCode());

        return this.oidcProviderResponseMapper().oidcProviderApiResponse(model);
    }

    private OIDCProviderResponseMapper oidcProviderResponseMapper() {
        return this.managementResponseMapper.oidcProviderResponseMapper();
    }
}
