package com.redadani1997.blazingkraft.management.mapper.out.server_permissions;

import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;
import com.redadani1997.blazingkraft.common.util.CommonPermissionUtils;
import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.model.ServerPermissionsApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ServerPermissionsResponseMapper {
    public ServerPermissionsApiResponse serverPermissionsApiResponse(ServerPermissionsModel model) {
        ServerPermissionsApiResponse response = new ServerPermissionsApiResponse();

        response.setClusterPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getClusterPermissions()));
        response.setKafkaConnectPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getKafkaConnectPermissions()));
        response.setSchemaRegistryPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getSchemaRegistryPermissions()));
        response.setKsqlDbPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getKsqlDbPermissions()));
        response.setManagementPermissions(
                CommonPermissionUtils.constructPermissions(model.getManagementPermissions()));
        response.setPlaygroundPermissions(
                CommonPermissionUtils.constructPermissions(model.getPlaygroundPermissions()));

        return response;
    }

    public ServerPermissionsApiResponse serverPermissionsApiResponseFromCache(
            ServerPermissionsDomain domain) {
        if (domain == null) {
            return null;
        }

        ServerPermissionsApiResponse response = new ServerPermissionsApiResponse();

        response.setClusterPermissions(domain.getClusterPermissions());
        response.setKafkaConnectPermissions(domain.getKafkaConnectPermissions());
        response.setSchemaRegistryPermissions(domain.getSchemaRegistryPermissions());
        response.setKsqlDbPermissions(domain.getKsqlDbPermissions());
        response.setManagementPermissions(domain.getManagementPermissions());
        response.setPlaygroundPermissions(domain.getPlaygroundPermissions());

        return response;
    }
}
