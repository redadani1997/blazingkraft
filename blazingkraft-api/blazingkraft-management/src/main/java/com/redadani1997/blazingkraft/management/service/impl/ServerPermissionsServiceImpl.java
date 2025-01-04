package com.redadani1997.blazingkraft.management.service.impl;

import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.cache.service.ServerPermissionsCache;
import com.redadani1997.blazingkraft.common.util.CommonTimeUtils;
import com.redadani1997.blazingkraft.dao.dao.ServerPermissionsDao;
import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;
import com.redadani1997.blazingkraft.management.dto.in.server_permissions.ServerPermissionsEditRequest;
import com.redadani1997.blazingkraft.management.mapper.out.ManagementResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.server_permissions.ServerPermissionsResponseMapper;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.model.ServerPermissionsApiResponse;
import com.redadani1997.blazingkraft.management.service.ServerPermissionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServerPermissionsServiceImpl implements ServerPermissionsService {
    private final ServerPermissionsDao dao;
    private final ManagementResponseMapper managementResponseMapper;
    private final ServerPermissionsCache serverPermissionsCache;
    private final CurrentUserFacade currentUserFacade;

    @Override
    public ServerPermissionsApiResponse editServerPermissions(ServerPermissionsEditRequest request) {
        ServerPermissionsModel model = this.dao.get();

        Long now = CommonTimeUtils.now();

        model.setUpdateTime(now);
        model.setUpdatedBy(this.currentUserFacade.currentUser().getIdentifier());
        model.setClusterPermissions(request.getClusterPermissions());
        model.setKafkaConnectPermissions(request.getKafkaConnectPermissions());
        model.setSchemaRegistryPermissions(request.getSchemaRegistryPermissions());
        model.setKsqlDbPermissions(request.getKsqlDbPermissions());
        model.setManagementPermissions(request.getManagementPermissions());
        model.setPlaygroundPermissions(request.getPlaygroundPermissions());

        ServerPermissionsModel savedModel = this.dao.update(model);

        ServerPermissionsApiResponse response =
                this.responseMapper().serverPermissionsApiResponse(savedModel);

        this.serverPermissionsCache.invalidate();

        return response;
    }

    @Override
    public ServerPermissionsApiResponse getServerPermissions() {
        return this.responseMapper()
                .serverPermissionsApiResponseFromCache(this.serverPermissionsCache.get());
    }

    private ServerPermissionsResponseMapper responseMapper() {
        return this.managementResponseMapper.serverPermissionResponseMapper();
    }
}
