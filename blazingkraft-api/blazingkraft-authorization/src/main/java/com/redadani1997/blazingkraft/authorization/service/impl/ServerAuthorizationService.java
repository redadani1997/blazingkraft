package com.redadani1997.blazingkraft.authorization.service.impl;

import com.redadani1997.blazingkraft.authorization.service.AuthorizationService;
import com.redadani1997.blazingkraft.authorization.util.AuthorizationUtils;
import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;
import com.redadani1997.blazingkraft.cache.service.ServerPermissionsCache;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.error.authorization.ServerAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Qualifier("serverAuthorizationService")
public class ServerAuthorizationService implements AuthorizationService {

    private final ServerPermissionsCache serverPermissionsCache;
    private final AuthorizationUtils authorizationUtils;

    @Override
    public void authorize(CurrentUser currentUser, String requiredPermission, EntityType type) {

        if (currentUser.getIsBlazingAdmin()) {
            return;
        }

        ServerPermissionsDomain serverPermissions = this.serverPermissionsCache.get();

        boolean hasServerPermission =
                this.authorizationUtils.hasPermission(
                        type,
                        requiredPermission,
                        serverPermissions.getClusterPermissions(),
                        serverPermissions.getKafkaConnectPermissions(),
                        serverPermissions.getSchemaRegistryPermissions(),
                        serverPermissions.getKsqlDbPermissions(),
                        serverPermissions.getManagementPermissions(),
                        serverPermissions.getPlaygroundPermissions());

        if (!hasServerPermission) {
            throw new ServerAuthorizationException("This feature is disabled on the server side");
        }
    }
}
