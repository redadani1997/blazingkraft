package com.redadani1997.blazingkraft.management.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.ServerPermissionsActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.management.dto.in.server_permissions.ServerPermissionsEditRequest;
import com.redadani1997.blazingkraft.management.mapper.in.ManagementRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.server_permissions.ServerPermissionsRequestMapper;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.api.ServerPermissionsApi;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.model.ServerPermissionsApiResponse;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.model.ServerPermissionsEditApiRequest;
import com.redadani1997.blazingkraft.management.service.ServerPermissionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ServerPermissionsController implements ServerPermissionsApi {
    private final ServerPermissionsService service;
    private final ManagementRequestMapper managementRequestMapper;

    @WithCleanUp
    @WithAudit(
            action = ServerPermissionsActions.EDIT_SERVER_PERMISSIONS,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(
            permission = ServerPermissionsActions.EDIT_SERVER_PERMISSIONS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ServerPermissionsApiResponse> editServerPermissions(
            ServerPermissionsEditApiRequest apiRequest) {
        ServerPermissionsEditRequest request =
                this.requestMapper().serverPermissionsEditRequest(apiRequest);

        ServerPermissionsApiResponse response = this.service.editServerPermissions(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithAuthorization(
            permission = ServerPermissionsActions.DESCRIBE_SERVER_PERMISSIONS,
            type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<ServerPermissionsApiResponse> getServerPermissions() {
        ServerPermissionsApiResponse response = this.service.getServerPermissions();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private ServerPermissionsRequestMapper requestMapper() {
        return this.managementRequestMapper.serverPermissionRequestMapper();
    }
}
