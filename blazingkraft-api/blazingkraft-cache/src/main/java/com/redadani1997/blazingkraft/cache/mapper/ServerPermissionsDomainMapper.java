package com.redadani1997.blazingkraft.cache.mapper;

import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;
import com.redadani1997.blazingkraft.common.util.CommonPermissionUtils;
import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;
import org.springframework.stereotype.Component;

@Component
public class ServerPermissionsDomainMapper {
    public ServerPermissionsDomain serverPermissionsDomain(ServerPermissionsModel model) {

        ServerPermissionsDomain domain = new ServerPermissionsDomain();

        domain.setClusterPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getClusterPermissions()));
        domain.setKafkaConnectPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getKafkaConnectPermissions()));
        domain.setSchemaRegistryPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getSchemaRegistryPermissions()));
        domain.setKsqlDbPermissions(
                CommonPermissionUtils.constructMapPermissions(model.getKsqlDbPermissions()));
        domain.setManagementPermissions(
                CommonPermissionUtils.constructPermissions(model.getManagementPermissions()));
        domain.setPlaygroundPermissions(
                CommonPermissionUtils.constructPermissions(model.getPlaygroundPermissions()));

        return domain;
    }
}
