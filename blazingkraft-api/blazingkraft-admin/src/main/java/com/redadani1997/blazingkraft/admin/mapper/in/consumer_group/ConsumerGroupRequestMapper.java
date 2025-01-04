package com.redadani1997.blazingkraft.admin.mapper.in.consumer_group;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupsDescriptionApiRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDescriptionRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupRemoveMemberRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupsDescriptionRequest;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.MemberToRemove;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerGroupRequestMapper {
    private final AuditLogService auditLogService;

    public ConsumerGroupRemoveMemberRequest consumerGroupRemoveMemberRequest(
            String consumerGroup, String member, String reason) {
        String subject =
                String.format(
                        "Consumer Group: '%s', Member: '%s', Reason: '%s'.", consumerGroup, member, reason);
        this.auditLogService.setSubject(subject);

        CommonValidator.assertNotBlank("Consumer Group", consumerGroup);
        CommonValidator.assertNotBlank("Member", member);

        MemberToRemove memberToRemove = new MemberToRemove(member);

        return ConsumerGroupRemoveMemberRequest.builder()
                .consumerGroup(consumerGroup)
                .member(memberToRemove)
                .reason(reason)
                .build();
    }

    public ConsumerGroupDeleteRequest consumerGroupDeleteRequest(String consumerGroup) {
        this.auditLogService.setSubject(String.format("Consumer Group: '%s'.", consumerGroup));

        CommonValidator.assertNotBlank("Consumer Group", consumerGroup);

        return ConsumerGroupDeleteRequest.builder()
                .consumerGroups(Collections.singleton(consumerGroup))
                .build();
    }

    public ConsumerGroupDescriptionRequest consumerGroupDescriptionRequest(
            String consumerGroup, Boolean includeAuthorizedOperations) {
        CommonValidator.assertNotBlank("Consumer Group", consumerGroup);

        return ConsumerGroupDescriptionRequest.builder()
                .includeAuthorizedOperations(
                        includeAuthorizedOperations != null && includeAuthorizedOperations)
                .consumerGroup(consumerGroup)
                .build();
    }

    public ConsumerGroupsDescriptionRequest consumerGroupsDescriptionRequest(
            ConsumerGroupsDescriptionApiRequest apiRequest, Boolean includeAuthorizedOperations) {
        CommonValidator.assertNotNull("request", apiRequest);
        CommonValidator.assertNotNull("Consumer Groups", apiRequest.getConsumerGroups());

        return ConsumerGroupsDescriptionRequest.builder()
                .includeAuthorizedOperations(
                        includeAuthorizedOperations != null && includeAuthorizedOperations)
                .consumerGroups(apiRequest.getConsumerGroups())
                .build();
    }
}
