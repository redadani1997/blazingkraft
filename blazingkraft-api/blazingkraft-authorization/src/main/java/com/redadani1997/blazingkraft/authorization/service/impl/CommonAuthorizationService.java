package com.redadani1997.blazingkraft.authorization.service.impl;

import com.redadani1997.blazingkraft.authorization.service.AuthorizationService;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@Qualifier("commonAuthorizationService")
public class CommonAuthorizationService implements AuthorizationService {
    private final AuthorizationService serverAuthorizationService;
    private final AuthorizationService userAuthorizationService;

    public CommonAuthorizationService(
            @Qualifier("serverAuthorizationService") AuthorizationService serverAuthorizationService,
            @Qualifier("userAuthorizationService") AuthorizationService userAuthorizationService) {
        this.serverAuthorizationService = serverAuthorizationService;
        this.userAuthorizationService = userAuthorizationService;
    }

    @Override
    public void authorize(CurrentUser currentUser, String requiredPermission, EntityType type) {
        this.serverAuthorizationService.authorize(currentUser, requiredPermission, type);

        this.userAuthorizationService.authorize(currentUser, requiredPermission, type);
    }
}
