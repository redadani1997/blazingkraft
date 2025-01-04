package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.ServerPermissionsDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.ServerPermissionsRepository;
import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;
import java.util.List;

public class ServerPermissionsJdbcDao implements ServerPermissionsDao {
    private final ServerPermissionsRepository repository;

    public ServerPermissionsJdbcDao(ServerPermissionsRepository repository) {
        this.repository = repository;
    }

    @Override
    public ServerPermissionsModel update(ServerPermissionsModel model) {
        return this.repository.save(model);
    }

    @Override
    public ServerPermissionsModel get() {
        List<ServerPermissionsModel> serverPermissionsModels = this.repository.findAll();
        if (serverPermissionsModels.isEmpty()) {
            ServerPermissionsModel model = new ServerPermissionsModel();
            return this.repository.save(model);
        }
        return serverPermissionsModels.get(0);
    }
}
