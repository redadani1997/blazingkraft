package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.api.ConsumerGroupApi;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupListingApiResponse;
import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.ConsumerGroupsDescriptionApiRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupDescriptionRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupRemoveMemberRequest;
import com.redadani1997.blazingkraft.admin.dto.in.consumer_group.ConsumerGroupsDescriptionRequest;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.consumer_group.ConsumerGroupRequestMapper;
import com.redadani1997.blazingkraft.admin.service.ConsumerGroupService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.ConsumerGroupActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConsumerGroupController implements ConsumerGroupApi {

    private final AdminRequestMapper adminRequestMapper;
    private final ConsumerGroupService consumerGroupService;

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ConsumerGroupActions.DESCRIBE_CONSUMER_GROUPS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<ConsumerGroupDescriptionApiResponse> describeConsumerGroup(
            String consumerGroup, Boolean includeAuthorizedOperations) {
        ConsumerGroupDescriptionRequest request =
                this.consumerGroupRequestMapper()
                        .consumerGroupDescriptionRequest(
                                consumerGroup, includeAuthorizedOperations != null && includeAuthorizedOperations);

        ConsumerGroupDescriptionApiResponse response =
                this.consumerGroupService.describeConsumerGroup(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ConsumerGroupActions.DESCRIBE_CONSUMER_GROUPS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<ConsumerGroupDescriptionApiResponse>> describeSpecificConsumerGroups(
            Boolean includeAuthorizedOperations, ConsumerGroupsDescriptionApiRequest apiRequest) {
        ConsumerGroupsDescriptionRequest request =
                this.consumerGroupRequestMapper()
                        .consumerGroupsDescriptionRequest(apiRequest, includeAuthorizedOperations);

        List<ConsumerGroupDescriptionApiResponse> responses =
                this.consumerGroupService.describeConsumerGroups(request);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ConsumerGroupActions.DESCRIBE_CONSUMER_GROUPS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<ConsumerGroupDescriptionApiResponse>> describeAllConsumerGroups(
            Boolean includeAuthorizedOperations) {

        List<ConsumerGroupDescriptionApiResponse> responses =
                this.consumerGroupService.describeConsumerGroups(includeAuthorizedOperations);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(
            permission = ConsumerGroupActions.DESCRIBE_CONSUMER_GROUPS,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<ConsumerGroupListingApiResponse>> listConsumerGroups() {
        List<ConsumerGroupListingApiResponse> responses =
                this.consumerGroupService.listConsumerGroups();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = ConsumerGroupActions.DELETE_CONSUMER_GROUP,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(
            permission = ConsumerGroupActions.DELETE_CONSUMER_GROUP,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> deleteConsumerGroup(String consumerGroup) {
        ConsumerGroupDeleteRequest request =
                this.consumerGroupRequestMapper().consumerGroupDeleteRequest(consumerGroup);

        this.consumerGroupService.deleteConsumerGroup(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = ConsumerGroupActions.REMOVE_CONSUMER_GROUP_MEMBER,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(
            permission = ConsumerGroupActions.REMOVE_CONSUMER_GROUP_MEMBER,
            type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> removeConsumerGroupMember(
            String consumerGroup, String memberId, String reason) {
        ConsumerGroupRemoveMemberRequest request =
                this.consumerGroupRequestMapper()
                        .consumerGroupRemoveMemberRequest(consumerGroup, memberId, reason);

        this.consumerGroupService.removeMemberFromConsumerGroup(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private ConsumerGroupRequestMapper consumerGroupRequestMapper() {
        return this.adminRequestMapper.consumerGroupRequestMapper();
    }
}
