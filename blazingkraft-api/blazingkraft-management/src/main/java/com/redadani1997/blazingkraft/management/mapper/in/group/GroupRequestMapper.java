package com.redadani1997.blazingkraft.management.mapper.in.group;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.util.CommonPermissionUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDetailsRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupEditRequest;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupCreateApiRequest;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupEditApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupRequestMapper {
    private final AuditLogService auditLogService;

    public GroupCreateRequest groupCreateRequest(GroupCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertExpression("Code", apiRequest.getCode(), "^[a-zA-Z0-9]+$");
        CommonValidator.assertNotBlank("Name", apiRequest.getName());
        CommonValidator.assertNotBlank("Description", apiRequest.getDescription());

        GroupCreateRequest request = new GroupCreateRequest();

        request.setCode(apiRequest.getCode());
        request.setName(apiRequest.getName());
        request.setDescription(apiRequest.getDescription());
        request.setClusterPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getClusterPermissions(), "CLUSTER")));
        request.setKafkaConnectPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getKafkaConnectPermissions(), "KAFKACONNECT")));
        request.setSchemaRegistryPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getSchemaRegistryPermissions(), "SCHEMAREGISTRY")));
        request.setKsqlDbPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getKsqlDbPermissions(), "KSQL")));
        request.setManagementPermissions(
                CommonPermissionUtils.concatPermissions(apiRequest.getManagementPermissions()));
        request.setPlaygroundPermissions(
                CommonPermissionUtils.concatPermissions(apiRequest.getPlaygroundPermissions()));

        return request;
    }

    public GroupEditRequest groupEditRequest(String code, GroupEditApiRequest apiRequest) {
        this.auditLogService.setSubject(code);

        CommonValidator.assertNotBlank("Existing Code", code);
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("New Code", apiRequest.getCode());
        CommonValidator.assertExpression("New Code", apiRequest.getCode(), "^[a-zA-Z0-9]+$");
        CommonValidator.assertNotBlank("Name", apiRequest.getName());
        CommonValidator.assertNotBlank("Description", apiRequest.getDescription());

        GroupEditRequest request = new GroupEditRequest();

        request.setExistingCode(code);
        request.setNewCode(apiRequest.getCode());
        request.setName(apiRequest.getName());
        request.setDescription(apiRequest.getDescription());
        request.setClusterPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getClusterPermissions(), "CLUSTER")));
        request.setKafkaConnectPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getKafkaConnectPermissions(), "KAFKA_CONNECT")));
        request.setSchemaRegistryPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getSchemaRegistryPermissions(), "SCHEMA_REGISTRY")));
        request.setKsqlDbPermissions(
                CommonPermissionUtils.concatPermissions(
                        CommonPermissionUtils.generateCodePermissions(
                                apiRequest.getKsqlDbPermissions(), "KSQL")));
        request.setManagementPermissions(
                CommonPermissionUtils.concatPermissions(apiRequest.getManagementPermissions()));
        request.setPlaygroundPermissions(
                CommonPermissionUtils.concatPermissions(apiRequest.getPlaygroundPermissions()));

        return request;
    }

    public GroupDeleteRequest groupDeleteRequest(String code) {
        this.auditLogService.setSubject(code);

        CommonValidator.assertNotBlank("Code", code);

        GroupDeleteRequest request = new GroupDeleteRequest();
        request.setCode(code);
        return request;
    }

    public GroupDetailsRequest groupDetailsRequest(String code) {
        CommonValidator.assertNotBlank("Code", code);

        GroupDetailsRequest request = new GroupDetailsRequest();
        request.setCode(code);
        return request;
    }
}
