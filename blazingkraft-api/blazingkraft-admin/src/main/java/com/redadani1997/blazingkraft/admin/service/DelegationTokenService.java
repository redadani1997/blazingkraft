package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.DelegationTokenDescribeApiResponse;
import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.DelegationTokenRenewApiResponse;
import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.ExpireDelegationTokenApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenExpireRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenRenewRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokensDescribeRequest;
import java.util.List;

public interface DelegationTokenService {
    DelegationTokenDescribeApiResponse createDelegationToken(DelegationTokenCreateRequest request);

    List<DelegationTokenDescribeApiResponse> describeDelegationTokens(
            DelegationTokensDescribeRequest request);

    ExpireDelegationTokenApiResponse expireDelegationToken(DelegationTokenExpireRequest request);

    DelegationTokenRenewApiResponse renewDelegationToken(DelegationTokenRenewRequest request);
}
