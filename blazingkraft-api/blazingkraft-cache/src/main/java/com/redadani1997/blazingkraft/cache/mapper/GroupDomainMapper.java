package com.redadani1997.blazingkraft.cache.mapper;

import com.redadani1997.blazingkraft.cache.domain.GroupDomain;
import com.redadani1997.blazingkraft.common.util.CommonPermissionUtils;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import org.springframework.stereotype.Component;

@Component
public class GroupDomainMapper {
    public GroupDomain groupDomain(GroupModel model) {

        GroupDomain domain = new GroupDomain();

        domain.setCode(model.getCode());
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
