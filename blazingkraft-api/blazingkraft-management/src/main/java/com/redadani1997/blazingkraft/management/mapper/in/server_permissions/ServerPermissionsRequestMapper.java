package com.redadani1997.blazingkraft.management.mapper.in.server_permissions;

import com.redadani1997.blazingkraft.common.util.CommonPermissionUtils;
import com.redadani1997.blazingkraft.management.dto.in.server_permissions.ServerPermissionsEditRequest;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.model.ServerPermissionsEditApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ServerPermissionsRequestMapper {
    public ServerPermissionsEditRequest serverPermissionsEditRequest(
            ServerPermissionsEditApiRequest apiRequest) {
        ServerPermissionsEditRequest request = new ServerPermissionsEditRequest();

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
}
