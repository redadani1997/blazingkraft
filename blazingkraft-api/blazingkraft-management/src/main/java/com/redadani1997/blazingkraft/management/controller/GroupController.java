package com.redadani1997.blazingkraft.management.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.GroupActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDetailsRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupEditRequest;
import com.redadani1997.blazingkraft.management.group.openapi.api.GroupApi;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupApiResponse;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupCreateApiRequest;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupEditApiRequest;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupMetaApiResponse;
import com.redadani1997.blazingkraft.management.mapper.in.ManagementRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.group.GroupRequestMapper;
import com.redadani1997.blazingkraft.management.service.GroupService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GroupController implements GroupApi {
    private final GroupService service;
    private final ManagementRequestMapper managementRequestMapper;

    @WithCleanUp
    @WithAudit(
            action = GroupActions.CREATE_GROUP,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(permission = GroupActions.CREATE_GROUP, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<GroupMetaApiResponse> createGroup(GroupCreateApiRequest apiRequest) {
        GroupCreateRequest request = this.requestMapper().groupCreateRequest(apiRequest);

        GroupMetaApiResponse response = this.service.createGroup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = GroupActions.DELETE_GROUP,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(permission = GroupActions.DELETE_GROUP, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteGroup(String code) {
        GroupDeleteRequest request = this.requestMapper().groupDeleteRequest(code);

        this.service.deleteGroup(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAudit(
            action = GroupActions.DELETE_GROUP_WITH_USERS,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = GroupActions.DELETE_GROUP_WITH_USERS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteGroupWithUsers(String code) {
        GroupDeleteRequest request = this.requestMapper().groupDeleteRequest(code);

        this.service.deleteGroupWithUsers(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAudit(
            action = GroupActions.EDIT_GROUP,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(permission = GroupActions.EDIT_GROUP, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<GroupMetaApiResponse> editGroup(
            String code, GroupEditApiRequest apiRequest) {
        GroupEditRequest request = this.requestMapper().groupEditRequest(code, apiRequest);

        GroupMetaApiResponse response = this.service.editGroup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(permission = GroupActions.DESCRIBE_GROUPS, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<GroupMetaApiResponse>> getAllGroups() {
        List<GroupMetaApiResponse> responses = this.service.getAllGroups();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAuthorization(permission = GroupActions.DESCRIBE_GROUPS, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<GroupApiResponse> getGroupDetails(String code) {
        GroupDetailsRequest request = this.requestMapper().groupDetailsRequest(code);

        GroupApiResponse response = this.service.getGroupDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private GroupRequestMapper requestMapper() {
        return this.managementRequestMapper.groupRequestMapper();
    }
}
