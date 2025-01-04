package com.redadani1997.blazingkraft.management.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.UserActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.management.dto.in.user.*;
import com.redadani1997.blazingkraft.management.mapper.in.ManagementRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.user.UserRequestMapper;
import com.redadani1997.blazingkraft.management.service.UserService;
import com.redadani1997.blazingkraft.management.user.openapi.api.UserApi;
import com.redadani1997.blazingkraft.management.user.openapi.model.*;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController implements UserApi {
    private final UserService service;
    private final ManagementRequestMapper managementRequestMapper;

    @WithCleanUp
    @WithAudit(
            action = UserActions.CREATE_USER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(permission = UserActions.CREATE_USER, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<UserMetaApiResponse> createUser(UserCreateApiRequest apiRequest) {
        UserCreateRequest request = this.requestMapper().userCreateRequest(apiRequest);

        UserMetaApiResponse response = this.service.createUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = UserActions.DELETE_USER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(permission = UserActions.DELETE_USER, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteUser(String email) {
        UserDeleteRequest request = this.requestMapper().userDeleteRequest(email);

        this.service.deleteUser(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithAudit(
            action = UserActions.EDIT_USER,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(permission = UserActions.EDIT_USER, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<UserMetaApiResponse> editUser(String email, UserEditApiRequest apiRequest) {
        UserEditRequest request = this.requestMapper().userEditRequest(email, apiRequest);

        UserMetaApiResponse response = this.service.editUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = UserActions.EDIT_USER_PASSWORD,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.MEDIUM)
    @WithAuthorization(permission = UserActions.EDIT_USER_PASSWORD, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<UserMetaApiResponse> editUserPassword(
            String email, UserEditPasswordApiRequest apiRequest) {
        UserEditPasswordRequest request =
                this.requestMapper().userEditPasswordRequest(email, apiRequest);

        UserMetaApiResponse response = this.service.editUserPassword(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = UserActions.EDIT_USER_PASSWORD_WITHOUT_CURRENT,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = UserActions.EDIT_USER_PASSWORD_WITHOUT_CURRENT,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<UserMetaApiResponse> editUserPasswordWithoutCurrent(
            String email, UserEditPasswordWithoutCurrentApiRequest apiRequest) {
        UserEditPasswordWithoutCurrentRequest request =
                this.requestMapper().userEditPasswordWithoutCurrentRequest(email, apiRequest);

        UserMetaApiResponse response = this.service.editUserPasswordWithoutCurrent(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(permission = UserActions.DESCRIBE_USERS, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<List<UserMetaApiResponse>> getAllUsers() {
        List<UserMetaApiResponse> responses = this.service.getAllUsers();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithAuthorization(permission = UserActions.DESCRIBE_USERS, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<UserApiResponse> getUserDetails(String email) {
        UserDetailsRequest request = this.requestMapper().userDetailsRequest(email);

        UserApiResponse response = this.service.getUserDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private UserRequestMapper requestMapper() {
        return this.managementRequestMapper.userRequestMapper();
    }
}
