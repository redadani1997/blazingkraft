package com.redadani1997.blazingkraft.authorization.service;

import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;

public interface AuthorizationService {
    void authorize(CurrentUser currentUser, String requiredPermission, EntityType type);
}
