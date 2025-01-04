package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.delegation_token.openapi.api.DelegationTokenApi;
import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.*;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenExpireRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenRenewRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokensDescribeRequest;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.delegation_token.DelegationTokenRequestMapper;
import com.redadani1997.blazingkraft.admin.service.DelegationTokenService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.DelegationTokenActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DelegationTokenController implements DelegationTokenApi {

    private final AdminRequestMapper adminRequestMapper;
    private final DelegationTokenService delegationTokenService;

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = DelegationTokenActions.CREATE_DELEGATION_TOKEN,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(
            permission = DelegationTokenActions.CREATE_DELEGATION_TOKEN,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<DelegationTokenDescribeApiResponse> createDelegationToken(
            DelegationTokenCreateApiRequest apiRequest) {
        DelegationTokenCreateRequest request =
                this.delegationTokenRequestMapper().delegationTokenCreateRequest(apiRequest);
        DelegationTokenDescribeApiResponse response =
                this.delegationTokenService.createDelegationToken(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = DelegationTokenActions.DESCRIBE_DELEGATION_TOKENS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<DelegationTokenDescribeApiResponse>> describeDelegationTokens(
            DelegationTokensDescribeApiRequest apiRequest) {
        DelegationTokensDescribeRequest request =
                this.delegationTokenRequestMapper().delegationTokensDescribeRequest(apiRequest);
        List<DelegationTokenDescribeApiResponse> responses =
                this.delegationTokenService.describeDelegationTokens(request);
        return ResponseEntity.ok(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = DelegationTokenActions.EXPIRE_DELEGATION_TOKEN,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(
            permission = DelegationTokenActions.EXPIRE_DELEGATION_TOKEN,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ExpireDelegationTokenApiResponse> expireDelegationToken(
            DelegationTokenExpireApiRequest delegationTokenExpireApiRequest) {
        DelegationTokenExpireRequest request =
                this.delegationTokenRequestMapper()
                        .delegationTokenExpireRequest(delegationTokenExpireApiRequest);
        ExpireDelegationTokenApiResponse response =
                this.delegationTokenService.expireDelegationToken(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = DelegationTokenActions.RENEW_DELEGATION_TOKEN,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(
            permission = DelegationTokenActions.RENEW_DELEGATION_TOKEN,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<DelegationTokenRenewApiResponse> renewDelegationToken(
            DelegationTokenRenewApiRequest delegationTokenRenewApiRequest) {
        DelegationTokenRenewRequest request =
                this.delegationTokenRequestMapper()
                        .delegationTokenRenewRequest(delegationTokenRenewApiRequest);
        DelegationTokenRenewApiResponse response =
                this.delegationTokenService.renewDelegationToken(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private DelegationTokenRequestMapper delegationTokenRequestMapper() {
        return this.adminRequestMapper.delegationTokenRequestMapper();
    }
}
