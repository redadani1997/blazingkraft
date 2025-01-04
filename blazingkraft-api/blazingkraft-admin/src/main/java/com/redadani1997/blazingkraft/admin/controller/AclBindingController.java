package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.acl_binding.openapi.api.AclBindingApi;
import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingApiResponse;
import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingCreateApiRequest;
import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingDeleteApiRequest;
import com.redadani1997.blazingkraft.admin.acl_binding.openapi.model.AclBindingListingApiRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingCreateRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.acl.AclBindingGetRequest;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.acl.AclBindingRequestMapper;
import com.redadani1997.blazingkraft.admin.service.AclBindingService;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.AclActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AclBindingController implements AclBindingApi {

    private final AdminRequestMapper adminRequestMapper;
    private final AclBindingService aclBindingService;

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = AclActions.DESCRIBE_ACLS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<AclBindingApiResponse>> getAclBindings(
            AclBindingListingApiRequest apiRequest) {

        AclBindingGetRequest request = this.aclBindingRequestMapper().aclBindingGetRequest(apiRequest);

        List<AclBindingApiResponse> responses = this.aclBindingService.getAclBindings(request);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = AclActions.DELETE_ACL,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(permission = AclActions.DELETE_ACL, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> deleteAclBinding(AclBindingDeleteApiRequest apiRequest) {
        AclBindingDeleteRequest request =
                this.aclBindingRequestMapper().aclBindingDeleteRequest(apiRequest);

        this.aclBindingService.deleteAclBinding(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = AclActions.CREATE_ACL,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.LOW)
    @WithClusterClient
    @WithAuthorization(permission = AclActions.CREATE_ACL, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<AclBindingApiResponse> createAclBinding(
            AclBindingCreateApiRequest apiRequest) {
        AclBindingCreateRequest request =
                this.aclBindingRequestMapper().aclBindingCreateRequest(apiRequest);

        AclBindingApiResponse aclBinding = this.aclBindingService.createAclBinding(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(aclBinding);
    }

    private AclBindingRequestMapper aclBindingRequestMapper() {
        return this.adminRequestMapper.aclBindingRequestMapper();
    }
}
