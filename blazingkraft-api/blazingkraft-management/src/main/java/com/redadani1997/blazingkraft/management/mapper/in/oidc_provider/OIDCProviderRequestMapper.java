package com.redadani1997.blazingkraft.management.mapper.in.oidc_provider;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.error.management.OIDCProviderException;
import com.redadani1997.blazingkraft.management.dto.in.oidc_provider.*;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderCreateApiRequest;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderEditApiRequest;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderTestConnectivityApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OIDCProviderRequestMapper {
    private final AuditLogService auditLogService;

    public OIDCProviderCreateRequest oidcCreateRequest(OIDCProviderCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertNotBlank("Name", apiRequest.getCode());
        CommonValidator.assertNotBlank("Issuer", apiRequest.getIssuer());
        CommonValidator.assertNotBlank("Client ID", apiRequest.getClientId());
        CommonValidator.assertNotEmpty("Scopes", apiRequest.getScopes());

        if (apiRequest.getCode().equalsIgnoreCase("blazingkraft")) {
            throw new OIDCProviderException("OpenID Connect Provider Code cannot be 'blazingkraft'");
        }

        return OIDCProviderCreateRequest.builder()
                .code(apiRequest.getCode())
                .name(apiRequest.getName())
                .issuer(apiRequest.getIssuer())
                .clientId(apiRequest.getClientId())
                .clientSecret(apiRequest.getClientSecret())
                .pkceEnabled(apiRequest.getPkceEnabled())
                .providerType(apiRequest.getProviderType())
                .scopes(String.join(" ;;;; ", apiRequest.getScopes()))
                .build();
    }

    public OIDCProviderDeleteRequest oidcProviderDeleteRequest(String code) {
        this.auditLogService.setSubject(code);

        CommonValidator.assertNotBlank("Code", code);

        return OIDCProviderDeleteRequest.builder().code(code).build();
    }

    public OIDCProviderEditRequest oidcProviderEditRequest(
            String code, OIDCProviderEditApiRequest apiRequest) {
        this.auditLogService.setSubject(code);

        CommonValidator.assertNotBlank("Existing Code", code);
        CommonValidator.assertNotBlank("New Code", apiRequest.getCode());
        CommonValidator.assertNotBlank("Name", apiRequest.getCode());
        CommonValidator.assertNotBlank("Issuer", apiRequest.getIssuer());
        CommonValidator.assertNotBlank("Client ID", apiRequest.getClientId());
        CommonValidator.assertNotEmpty("Scopes", apiRequest.getScopes());

        if (apiRequest.getCode().equalsIgnoreCase("blazingkraft")) {
            throw new OIDCProviderException("OpenID Connect Provider Code cannot be 'blazingkraft'");
        }

        return OIDCProviderEditRequest.builder()
                .existingCode(code)
                .newCode(apiRequest.getCode())
                .name(apiRequest.getName())
                .issuer(apiRequest.getIssuer())
                .clientId(apiRequest.getClientId())
                .clientSecret(apiRequest.getClientSecret())
                .pkceEnabled(apiRequest.getPkceEnabled())
                .providerType(apiRequest.getProviderType())
                .scopes(String.join(" ;;;; ", apiRequest.getScopes()))
                .build();
    }

    public OIDCProviderDetailsRequest oidcProviderDetailsRequest(String code) {
        CommonValidator.assertNotBlank("Code", code);

        return OIDCProviderDetailsRequest.builder().code(code).build();
    }

    public OIDCProviderTestConnectivityRequest oidcProviderTestConnectivityRequest(
            OIDCProviderTestConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotBlank("Issuer", apiRequest.getIssuer());

        return OIDCProviderTestConnectivityRequest.builder().issuer(apiRequest.getIssuer()).build();
    }
}
