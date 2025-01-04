package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupListingApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDescriptionRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupRemoveMemberRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupsDescriptionRequest;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.consumer_group.ConsumerGroupResponseMapper;
import com.redadani1997.blazingkraft.admin.service.ConsumerGroupService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsumerGroupServiceImpl implements ConsumerGroupService {
    private final AdminResponseMapper adminResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public void removeMemberFromConsumerGroup(ConsumerGroupRemoveMemberRequest request) {
        RemoveMembersFromConsumerGroupOptions removeMembersFromConsumerGroupOptions =
                new RemoveMembersFromConsumerGroupOptions(Collections.singleton(request.getMember()));

        KafkaFutureUtils.resolve(
                this.currentAdminClient()
                        .client()
                        .removeMembersFromConsumerGroup(
                                request.getConsumerGroup(), removeMembersFromConsumerGroupOptions)
                        .all(),
                KafkaFutureMode.ADMIN);
    }

    @Override
    public List<ConsumerGroupDescriptionApiResponse> describeConsumerGroups(
            ConsumerGroupsDescriptionRequest request) {
        DescribeConsumerGroupsOptions describeConsumerGroupsOptions =
                new DescribeConsumerGroupsOptions();
        describeConsumerGroupsOptions.includeAuthorizedOperations(
                request.getIncludeAuthorizedOperations());

        DescribeConsumerGroupsResult describeConsumerGroupsResult =
                this.currentAdminClient()
                        .client()
                        .describeConsumerGroups(request.getConsumerGroups(), describeConsumerGroupsOptions);
        Map<String, ConsumerGroupDescription> consumerGroupDescriptionsByConsumerGroupNames =
                KafkaFutureUtils.resolve(describeConsumerGroupsResult.all(), KafkaFutureMode.ADMIN);
        Collection<ConsumerGroupDescription> consumerGroupDescriptions =
                consumerGroupDescriptionsByConsumerGroupNames.values();

        return this.consumerGroupResponseMapper()
                .consumerGroupDescriptionResponses(consumerGroupDescriptions);
    }

    @Override
    public List<ConsumerGroupDescriptionApiResponse> describeConsumerGroups(
            Boolean includeAuthorizedOperations) {
        ListConsumerGroupsResult listConsumerGroupsResult =
                this.currentAdminClient().client().listConsumerGroups();
        Collection<ConsumerGroupListing> consumerGroupListings =
                KafkaFutureUtils.resolve(listConsumerGroupsResult.all(), KafkaFutureMode.ADMIN);
        List<String> consumerGroupNames =
                consumerGroupListings.stream()
                        .map(ConsumerGroupListing::groupId)
                        .collect(Collectors.toList());

        DescribeConsumerGroupsOptions describeConsumerGroupsOptions =
                new DescribeConsumerGroupsOptions();
        describeConsumerGroupsOptions.includeAuthorizedOperations(includeAuthorizedOperations);

        DescribeConsumerGroupsResult describeConsumerGroupsResult =
                this.currentAdminClient()
                        .client()
                        .describeConsumerGroups(consumerGroupNames, describeConsumerGroupsOptions);
        Map<String, ConsumerGroupDescription> consumerGroupDescriptionsByConsumerGroupNames =
                KafkaFutureUtils.resolve(describeConsumerGroupsResult.all(), KafkaFutureMode.ADMIN);
        Collection<ConsumerGroupDescription> consumerGroupDescriptions =
                consumerGroupDescriptionsByConsumerGroupNames.values();
        return this.consumerGroupResponseMapper()
                .consumerGroupDescriptionResponses(consumerGroupDescriptions);
    }

    @Override
    public ConsumerGroupDescriptionApiResponse describeConsumerGroup(
            ConsumerGroupDescriptionRequest request) {
        DescribeConsumerGroupsOptions describeConsumerGroupsOptions =
                new DescribeConsumerGroupsOptions();
        describeConsumerGroupsOptions.includeAuthorizedOperations(
                request.getIncludeAuthorizedOperations());

        DescribeConsumerGroupsResult describeConsumerGroupsResult =
                this.currentAdminClient()
                        .client()
                        .describeConsumerGroups(
                                Collections.singleton(request.getConsumerGroup()), describeConsumerGroupsOptions);

        Map<String, ConsumerGroupDescription> consumerGroupDescriptionsByConsumerGroupNames =
                KafkaFutureUtils.resolve(describeConsumerGroupsResult.all(), KafkaFutureMode.ADMIN);
        ConsumerGroupDescription consumerGroupDescription =
                consumerGroupDescriptionsByConsumerGroupNames.get(request.getConsumerGroup());
        return this.consumerGroupResponseMapper()
                .consumerGroupDescriptionApiResponse(consumerGroupDescription);
    }

    @Override
    public List<ConsumerGroupListingApiResponse> listConsumerGroups() {
        ListConsumerGroupsResult listConsumerGroupsResult =
                this.currentAdminClient().client().listConsumerGroups();
        Collection<ConsumerGroupListing> consumerGroupListings =
                KafkaFutureUtils.resolve(listConsumerGroupsResult.all(), KafkaFutureMode.ADMIN);
        return this.consumerGroupResponseMapper()
                .consumerGroupListingApiResponses(consumerGroupListings);
    }

    @Override
    public void deleteConsumerGroup(ConsumerGroupDeleteRequest request) {
        DeleteConsumerGroupsResult deleteConsumerGroupsResult =
                this.currentAdminClient().client().deleteConsumerGroups(request.getConsumerGroups());
        KafkaFutureUtils.resolve(deleteConsumerGroupsResult.all(), KafkaFutureMode.ADMIN);
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private ConsumerGroupResponseMapper consumerGroupResponseMapper() {
        return this.adminResponseMapper.consumerGroupResponseMapper();
    }
}
