package com.redadani1997.blazingkraft.cache.service;

import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;

public interface ServerPermissionsCache {
    ServerPermissionsDomain get();

    void invalidate();
}
