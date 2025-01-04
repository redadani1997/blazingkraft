package com.redadani1997.blazingkraft.admin.mapper.out.member;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.MemberAssignmentApiResponse;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.MemberDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.mapper.out.partition.PartitionResponseMapper;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.kafka.clients.admin.MemberAssignment;
import org.apache.kafka.clients.admin.MemberDescription;
import org.springframework.stereotype.Component;

@Component
public class MemberResponseMapper {

    private final PartitionResponseMapper partitionResponseMapper;

    public MemberResponseMapper(PartitionResponseMapper partitionResponseMapper) {
        this.partitionResponseMapper = partitionResponseMapper;
    }

    public MemberDescriptionApiResponse consumerGroupMemberDescriptionResponse(
            MemberDescription memberDescription) {
        if (memberDescription == null) {
            return null;
        }

        String groupInstance = memberDescription.groupInstanceId().orElse("");

        MemberDescriptionApiResponse memberDescriptionApiResponse = new MemberDescriptionApiResponse();
        memberDescriptionApiResponse.setMemberId(memberDescription.consumerId());
        memberDescriptionApiResponse.setHost(memberDescription.host());
        memberDescriptionApiResponse.setGroupInstanceId(groupInstance);
        memberDescriptionApiResponse.setClientId(memberDescription.clientId());
        memberDescriptionApiResponse.setAssignment(
                this.consumerGroupMemberAssignmentResponse(memberDescription.assignment()));

        return memberDescriptionApiResponse;
    }

    public List<MemberDescriptionApiResponse> consumerGroupMemberDescriptionResponses(
            Collection<MemberDescription> memberDescriptions) {
        if (memberDescriptions == null) {
            return Collections.emptyList();
        }

        return memberDescriptions.stream()
                .map(this::consumerGroupMemberDescriptionResponse)
                .collect(Collectors.toList());
    }

    public MemberAssignmentApiResponse consumerGroupMemberAssignmentResponse(
            MemberAssignment memberAssignment) {
        if (memberAssignment == null) {
            return null;
        }
        MemberAssignmentApiResponse memberAssignmentApiResponse = new MemberAssignmentApiResponse();
        memberAssignmentApiResponse.setTopicPartitions(
                this.partitionResponseMapper.consumerGroupTopicPartitionResponses(
                        memberAssignment.topicPartitions()));
        return memberAssignmentApiResponse;
    }

    public List<MemberAssignmentApiResponse> consumerGroupMemberAssignmentResponses(
            Collection<MemberAssignment> memberAssignments) {
        if (memberAssignments == null) {
            return Collections.emptyList();
        }

        return memberAssignments.stream()
                .map(this::consumerGroupMemberAssignmentResponse)
                .collect(Collectors.toList());
    }
}
