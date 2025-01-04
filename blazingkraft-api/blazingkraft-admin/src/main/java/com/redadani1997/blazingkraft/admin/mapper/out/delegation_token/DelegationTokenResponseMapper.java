package com.redadani1997.blazingkraft.admin.mapper.out.delegation_token;

import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.*;
import java.util.Base64;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.kafka.common.security.auth.KafkaPrincipal;
import org.apache.kafka.common.security.token.delegation.DelegationToken;
import org.apache.kafka.common.security.token.delegation.TokenInformation;
import org.springframework.stereotype.Component;

@Component
public class DelegationTokenResponseMapper {
    public DelegationTokenDescribeApiResponse delegationTokenDescribeApiResponse(
            DelegationToken delegationToken) {
        DelegationTokenDescribeApiResponse response = new DelegationTokenDescribeApiResponse();
        byte[] encodedHMAC = Base64.getEncoder().encode(delegationToken.hmac());
        response.setHmac(new String(encodedHMAC));
        response.setTokenInformation(
                this.delegationTokenInformationApiResponse(delegationToken.tokenInfo()));
        return response;
    }

    public List<DelegationTokenDescribeApiResponse> delegationTokenDescribeApiResponses(
            List<DelegationToken> delegationTokens) {
        if (delegationTokens == null) {
            return Collections.emptyList();
        } else {
            return delegationTokens.stream()
                    .map(this::delegationTokenDescribeApiResponse)
                    .collect(Collectors.toList());
        }
    }

    public ExpireDelegationTokenApiResponse expireDelegationTokenApiResponse(Long expiryTimestamp) {
        ExpireDelegationTokenApiResponse response = new ExpireDelegationTokenApiResponse();
        response.setExpiryTimestamp(expiryTimestamp);
        return response;
    }

    public DelegationTokenRenewApiResponse renewDelegationTokenApiResponse(Long expiryTimestamp) {
        DelegationTokenRenewApiResponse response = new DelegationTokenRenewApiResponse();
        response.setExpiryTimestamp(expiryTimestamp);
        return response;
    }

    private DelegationTokenInformationApiResponse delegationTokenInformationApiResponse(
            TokenInformation tokenInformation) {
        DelegationTokenInformationApiResponse response = new DelegationTokenInformationApiResponse();
        response.setTokenId(tokenInformation.tokenId());
        response.setIssueTimestamp(tokenInformation.issueTimestamp());
        response.setMaxTimestamp(tokenInformation.maxTimestamp());
        response.setExpiryTimestamp(tokenInformation.expiryTimestamp());
        response.setRenewers(this.kafkaPrincipalApiResponses(tokenInformation.renewers()));
        response.setTokenRequester(this.kafkaPrincipalApiResponse(tokenInformation.tokenRequester()));
        response.setOwner(this.kafkaPrincipalApiResponse(tokenInformation.owner()));
        return response;
    }

    private KafkaPrincipalApiResponse kafkaPrincipalApiResponse(KafkaPrincipal kafkaPrincipal) {
        KafkaPrincipalApiResponse response = new KafkaPrincipalApiResponse();
        response.setPrincipalName(kafkaPrincipal.getName());
        response.setPrincipalType(kafkaPrincipal.getPrincipalType());
        response.setTokenAuthenticated(kafkaPrincipal.tokenAuthenticated());
        return response;
    }

    private List<KafkaPrincipalApiResponse> kafkaPrincipalApiResponses(
            Collection<KafkaPrincipal> kafkaPrincipals) {
        if (kafkaPrincipals == null) {
            return Collections.emptyList();
        }
        return kafkaPrincipals.stream()
                .map(this::kafkaPrincipalApiResponse)
                .collect(Collectors.toList());
    }
}
