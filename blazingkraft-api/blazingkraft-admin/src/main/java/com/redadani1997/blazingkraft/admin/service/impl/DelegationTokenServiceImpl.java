package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.DelegationTokenDescribeApiResponse;
import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.DelegationTokenRenewApiResponse;
import com.redadani1997.blazingkraft.admin.delegation_token.openapi.model.ExpireDelegationTokenApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenExpireRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokenRenewRequest;
import com.redadani1997.blazingkraft.admin.dto.in.delegation_token.DelegationTokensDescribeRequest;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.delegation_token.DelegationTokenResponseMapper;
import com.redadani1997.blazingkraft.admin.service.DelegationTokenService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.CreateDelegationTokenOptions;
import org.apache.kafka.clients.admin.DescribeDelegationTokenOptions;
import org.apache.kafka.clients.admin.ExpireDelegationTokenOptions;
import org.apache.kafka.clients.admin.RenewDelegationTokenOptions;
import org.apache.kafka.common.security.token.delegation.DelegationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DelegationTokenServiceImpl implements DelegationTokenService {

    private final AdminResponseMapper adminResponseMapper;

    private final ClientsFactory clientsFactory;

    @Override
    public DelegationTokenDescribeApiResponse createDelegationToken(
            DelegationTokenCreateRequest request) {
        CreateDelegationTokenOptions options = new CreateDelegationTokenOptions();

        options.maxlifeTimeMs(request.getMaxLifeTimeMs());
        options.renewers(request.getRenewers());
        options.owner(request.getOwner());
        DelegationToken delegationToken =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient().client().createDelegationToken(options).delegationToken(),
                        KafkaFutureMode.ADMIN);

        return this.delegationTokenResponseMapper().delegationTokenDescribeApiResponse(delegationToken);
    }

    @Override
    public List<DelegationTokenDescribeApiResponse> describeDelegationTokens(
            DelegationTokensDescribeRequest request) {
        DescribeDelegationTokenOptions options = new DescribeDelegationTokenOptions();
        options.owners(request.getOwners());

        List<DelegationToken> delegationTokens =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient().client().describeDelegationToken(options).delegationTokens(),
                        KafkaFutureMode.ADMIN);

        return this.delegationTokenResponseMapper()
                .delegationTokenDescribeApiResponses(delegationTokens);
    }

    @Override
    public ExpireDelegationTokenApiResponse expireDelegationToken(
            DelegationTokenExpireRequest request) {
        ExpireDelegationTokenOptions options = new ExpireDelegationTokenOptions();
        options.expiryTimePeriodMs(request.getExpiryTimePeriodMs());

        Long expiryTimestamp =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient()
                                .client()
                                .expireDelegationToken(request.getHmac(), options)
                                .expiryTimestamp(),
                        KafkaFutureMode.ADMIN);

        return this.delegationTokenResponseMapper().expireDelegationTokenApiResponse(expiryTimestamp);
    }

    @Override
    public DelegationTokenRenewApiResponse renewDelegationToken(DelegationTokenRenewRequest request) {
        RenewDelegationTokenOptions options = new RenewDelegationTokenOptions();
        options.renewTimePeriodMs(request.getRenewTimePeriodMs());

        Long expiryTimestamp =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient()
                                .client()
                                .renewDelegationToken(request.getHmac(), options)
                                .expiryTimestamp(),
                        KafkaFutureMode.ADMIN);

        return this.delegationTokenResponseMapper().renewDelegationTokenApiResponse(expiryTimestamp);
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private DelegationTokenResponseMapper delegationTokenResponseMapper() {
        return this.adminResponseMapper.delegationTokenResponseMapper();
    }
}
