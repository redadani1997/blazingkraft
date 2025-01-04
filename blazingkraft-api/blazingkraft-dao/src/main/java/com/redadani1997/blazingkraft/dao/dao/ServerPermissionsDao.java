package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;

public interface ServerPermissionsDao {
    ServerPermissionsModel update(ServerPermissionsModel model);

    ServerPermissionsModel get();
}
