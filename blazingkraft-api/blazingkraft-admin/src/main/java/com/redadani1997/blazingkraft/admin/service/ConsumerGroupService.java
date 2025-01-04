package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupListingApiResponse;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDescriptionRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupRemoveMemberRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupsDescriptionRequest;
import java.util.List;

public interface ConsumerGroupService {

    void removeMemberFromConsumerGroup(ConsumerGroupRemoveMemberRequest request);

    List<ConsumerGroupDescriptionApiResponse> describeConsumerGroups(
            ConsumerGroupsDescriptionRequest request);

    List<ConsumerGroupDescriptionApiResponse> describeConsumerGroups(
            Boolean includeAuthorizedOperations);

    ConsumerGroupDescriptionApiResponse describeConsumerGroup(
            ConsumerGroupDescriptionRequest request);

    List<ConsumerGroupListingApiResponse> listConsumerGroups();

    void deleteConsumerGroup(ConsumerGroupDeleteRequest request);
}
