package com.redadani1997.blazingkraft.authorization.service.impl;

import com.redadani1997.blazingkraft.authorization.service.AuthorizationService;
import com.redadani1997.blazingkraft.authorization.util.AuthorizationUtils;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.error.authorization.UserAuthorizationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Qualifier("userAuthorizationService")
public class UserAuthorizationService implements AuthorizationService {
    private final AuthorizationUtils authorizationUtils;

    @Override
    public void authorize(CurrentUser currentUser, String requiredPermission, EntityType type) {
        if (currentUser.getIsBlazingAdmin() || !currentUser.getHasGroup()) {
            return;
        }

        boolean hasUserPermission =
                this.authorizationUtils.hasPermission(
                        type,
                        requiredPermission,
                        currentUser.getClusterPermissions(),
                        currentUser.getKafkaConnectPermissions(),
                        currentUser.getSchemaRegistryPermissions(),
                        currentUser.getKsqlDbPermissions(),
                        currentUser.getManagementPermissions(),
                        currentUser.getPlaygroundPermissions());

        if (!hasUserPermission) {
            throw new UserAuthorizationException(
                    String.format(
                            "User with Group '%s' doesn't have the required permission", currentUser.getGroup()));
        }
    }
}
