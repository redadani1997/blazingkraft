package com.redadani1997.blazingkraft.admin.mapper.in.delegation_token;

import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.*;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenExpireRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenRenewRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokensDescribeRequest;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.security.auth.KafkaPrincipal;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DelegationTokenRequestMapper {
    private final AuditLogService auditLogService;

    public DelegationTokenCreateRequest delegationTokenCreateRequest(
            DelegationTokenCreateApiRequest apiRequest) {
        String subject = String.format("Request: %s.", CommonCastingUtils.toJsonString(apiRequest));
        this.auditLogService.setSubject(subject);

        return DelegationTokenCreateRequest.builder()
                .maxLifeTimeMs(apiRequest.getMaxLifeTimeMs())
                .owner(this.kafkaPrincipal(apiRequest.getOwner()))
                .renewers(this.kafkaPrincipals(apiRequest.getRenewers()))
                .build();
    }

    public DelegationTokensDescribeRequest delegationTokensDescribeRequest(
            DelegationTokensDescribeApiRequest apiRequest) {
        List<KafkaPrincipal> kafkaPrincipals = this.kafkaPrincipals(apiRequest.getOwners());
        List<KafkaPrincipal> owners = kafkaPrincipals.isEmpty() ? null : kafkaPrincipals;
        return DelegationTokensDescribeRequest.builder().owners(owners).build();
    }

    public DelegationTokenExpireRequest delegationTokenExpireRequest(
            DelegationTokenExpireApiRequest apiRequest) {
        this.auditLogService.setSubject(apiRequest.getHmac());

        CommonValidator.assertNotNull("HMAC", apiRequest.getHmac());
        byte[] decodedHMAC = Base64.getDecoder().decode(apiRequest.getHmac());

        return DelegationTokenExpireRequest.builder()
                .hmac(decodedHMAC)
                .expiryTimePeriodMs(apiRequest.getExpiryTimePeriodMs())
                .build();
    }

    public DelegationTokenRenewRequest delegationTokenRenewRequest(
            DelegationTokenRenewApiRequest apiRequest) {
        this.auditLogService.setSubject(apiRequest.getHmac());

        CommonValidator.assertNotNull("HMAC", apiRequest.getHmac());
        byte[] decodedHMAC = Base64.getDecoder().decode(apiRequest.getHmac());

        return DelegationTokenRenewRequest.builder()
                .hmac(decodedHMAC)
                .renewTimePeriodMs(apiRequest.getRenewTimePeriodMs())
                .build();
    }

    public KafkaPrincipal kafkaPrincipal(KafkaPrincipalApiRequest apiRequest) {
        CommonValidator.assertNotNull("Principal Type", apiRequest.getPrincipalType());
        CommonValidator.assertNotNull("Principal Name", apiRequest.getPrincipalName());

        return new KafkaPrincipal(
                apiRequest.getPrincipalType(),
                apiRequest.getPrincipalName(),
                apiRequest.getTokenAuthenticated());
    }

    public List<KafkaPrincipal> kafkaPrincipals(List<KafkaPrincipalApiRequest> apiRequests) {
        if (apiRequests == null) {
            return Collections.emptyList();
        }
        return apiRequests.stream().map(this::kafkaPrincipal).toList();
    }
}
