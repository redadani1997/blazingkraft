package com.redadani1997.blazingkraft.management.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.OIDCProviderActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.management.dto.in.oidc_provider.*;
import com.redadani1997.blazingkraft.management.mapper.in.ManagementRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.oidc_provider.OIDCProviderRequestMapper;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.api.OidcProviderApi;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderApiResponse;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderCreateApiRequest;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderEditApiRequest;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderTestConnectivityApiRequest;
import com.redadani1997.blazingkraft.management.service.OIDCProviderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OIDCProviderController implements OidcProviderApi {
    private final OIDCProviderService service;
    private final ManagementRequestMapper managementRequestMapper;

    @WithCleanUp
    @WithAudit(
            action = OIDCProviderActions.CREATE_OIDC_PROVIDER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = OIDCProviderActions.CREATE_OIDC_PROVIDER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<OIDCProviderApiResponse> createOIDCProvider(
            OIDCProviderCreateApiRequest apiRequest) {
        OIDCProviderCreateRequest request =
                this.oidcProviderRequestMapper().oidcCreateRequest(apiRequest);

        OIDCProviderApiResponse response = this.service.createOIDCProvider(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = OIDCProviderActions.DELETE_OIDC_PROVIDER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = OIDCProviderActions.DELETE_OIDC_PROVIDER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteOIDCProvider(String code) {
        OIDCProviderDeleteRequest request =
                this.oidcProviderRequestMapper().oidcProviderDeleteRequest(code);

        this.service.deleteOIDCProvider(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAudit(
            action = OIDCProviderActions.EDIT_OIDC_PROVIDER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = OIDCProviderActions.EDIT_OIDC_PROVIDER,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<OIDCProviderApiResponse> editOIDCProvider(
            String code, OIDCProviderEditApiRequest apiRequest) {
        OIDCProviderEditRequest request =
                this.oidcProviderRequestMapper().oidcProviderEditRequest(code, apiRequest);

        OIDCProviderApiResponse response = this.service.editOIDCProvider(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = OIDCProviderActions.DESCRIBE_OIDC_PROVIDERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<OIDCProviderApiResponse>> getAllOIDCProviders() {
        List<OIDCProviderApiResponse> responses = this.service.getAllOIDCProviders();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = OIDCProviderActions.DESCRIBE_OIDC_PROVIDERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<OIDCProviderApiResponse> getOIDCProviderDetails(String code) {
        OIDCProviderDetailsRequest request =
                this.oidcProviderRequestMapper().oidcProviderDetailsRequest(code);

        OIDCProviderApiResponse response = this.service.getOIDCProviderDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = OIDCProviderActions.TEST_OIDC_PROVIDER_CONFIGURATION,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> testOIDCProviderConnectivity(
            OIDCProviderTestConnectivityApiRequest apiRequest) {
        OIDCProviderTestConnectivityRequest request =
                this.oidcProviderRequestMapper().oidcProviderTestConnectivityRequest(apiRequest);

        this.service.testOIDCProviderConnectivity(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private OIDCProviderRequestMapper oidcProviderRequestMapper() {
        return this.managementRequestMapper.oidcProviderRequestMapper();
    }
}
