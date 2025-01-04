package com.redadani1997.blazingkraft.admin.mapper.out.consumer_group;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupListingApiResponse;
import com.redadani1997.blazingkraft.admin.mapper.out.member.MemberResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.node.NodeResponseMapper;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.kafka.clients.admin.ConsumerGroupDescription;
import org.apache.kafka.clients.admin.ConsumerGroupListing;
import org.apache.kafka.common.ConsumerGroupState;
import org.apache.kafka.common.acl.AclOperation;
import org.springframework.stereotype.Component;

@Component
public class ConsumerGroupResponseMapper {

    private final NodeResponseMapper nodeResponseMapper;
    private final MemberResponseMapper memberResponseMapper;

    public ConsumerGroupResponseMapper(
            MemberResponseMapper memberResponseMapper, NodeResponseMapper nodeResponseMapper) {
        this.nodeResponseMapper = nodeResponseMapper;
        this.memberResponseMapper = memberResponseMapper;
    }

    public ConsumerGroupListingApiResponse consumerGroupListingApiResponse(
            ConsumerGroupListing consumerGroupListing) {
        if (consumerGroupListing == null) {
            return null;
        }
        ConsumerGroupState consumerGroupState =
                consumerGroupListing.state().orElse(ConsumerGroupState.UNKNOWN);

        ConsumerGroupListingApiResponse consumerGroupListingApiResponse =
                new ConsumerGroupListingApiResponse();

        consumerGroupListingApiResponse.setGroupId(consumerGroupListing.groupId());
        consumerGroupListingApiResponse.setIsSimpleConsumerGroup(
                consumerGroupListing.isSimpleConsumerGroup());
        consumerGroupListingApiResponse.setState(EnumUtils.toName(consumerGroupState));

        return consumerGroupListingApiResponse;
    }

    public List<ConsumerGroupListingApiResponse> consumerGroupListingApiResponses(
            Collection<ConsumerGroupListing> ConsumerGroupListings) {
        if (ConsumerGroupListings == null) {
            return Collections.emptyList();
        }
        return ConsumerGroupListings.stream()
                .map(this::consumerGroupListingApiResponse)
                .collect(Collectors.toList());
    }

    public ConsumerGroupDescriptionApiResponse consumerGroupDescriptionApiResponse(
            ConsumerGroupDescription consumerGroupDescription) {
        if (consumerGroupDescription == null) {
            return null;
        }
        Set<AclOperation> aclOperations =
                consumerGroupDescription.authorizedOperations() != null
                        ? consumerGroupDescription.authorizedOperations()
                        : Collections.EMPTY_SET;

        ConsumerGroupDescriptionApiResponse consumerGroupDescriptionApiResponse =
                new ConsumerGroupDescriptionApiResponse();

        consumerGroupDescriptionApiResponse.setAuthorizedOperations(EnumUtils.toNames(aclOperations));
        consumerGroupDescriptionApiResponse.setGroupId(consumerGroupDescription.groupId());
        consumerGroupDescriptionApiResponse.setIsSimpleConsumerGroup(
                consumerGroupDescription.isSimpleConsumerGroup());
        consumerGroupDescriptionApiResponse.setState(consumerGroupDescription.state().name());
        consumerGroupDescriptionApiResponse.setPartitionAssignor(
                consumerGroupDescription.partitionAssignor());
        consumerGroupDescriptionApiResponse.setCoordinator(
                this.nodeResponseMapper.consumerGroupNodeApiResponse(
                        consumerGroupDescription.coordinator()));
        consumerGroupDescriptionApiResponse.setMembers(
                this.memberResponseMapper.consumerGroupMemberDescriptionResponses(
                        consumerGroupDescription.members()));

        return consumerGroupDescriptionApiResponse;
    }

    public List<ConsumerGroupDescriptionApiResponse> consumerGroupDescriptionResponses(
            Collection<ConsumerGroupDescription> consumerGroupDescriptions) {
        if (consumerGroupDescriptions == null) {
            return Collections.emptyList();
        }
        return consumerGroupDescriptions.stream()
                .map(this::consumerGroupDescriptionApiResponse)
                .collect(Collectors.toList());
    }
}
