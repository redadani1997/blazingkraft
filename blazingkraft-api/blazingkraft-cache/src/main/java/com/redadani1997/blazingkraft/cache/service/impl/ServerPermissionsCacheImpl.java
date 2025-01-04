package com.redadani1997.blazingkraft.cache.service.impl;

import com.redadani1997.blazingkraft.cache.domain.ServerPermissionsDomain;
import com.redadani1997.blazingkraft.cache.mapper.ServerPermissionsDomainMapper;
import com.redadani1997.blazingkraft.cache.service.ServerPermissionsCache;
import com.redadani1997.blazingkraft.dao.dao.ServerPermissionsDao;
import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerPermissionsCacheImpl implements ServerPermissionsCache {

    private final ServerPermissionsDao dao;
    private final ServerPermissionsDomainMapper domainMapper;
    private ServerPermissionsDomain cache;

    @Override
    public ServerPermissionsDomain get() {
        if (this.cache == null) {
            ServerPermissionsModel serverPermissionsModel = this.dao.get();
            this.cache = this.domainMapper.serverPermissionsDomain(serverPermissionsModel);
        }
        return this.cache;
    }

    @Override
    public void invalidate() {
        this.cache = null;
    }
}
