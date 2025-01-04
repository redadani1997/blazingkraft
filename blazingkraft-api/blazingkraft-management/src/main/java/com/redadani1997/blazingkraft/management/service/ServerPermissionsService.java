package com.redadani1997.blazingkraft.management.service;

import com.redadani1997.blazingkraft.management.dto.in.server_permissions.ServerPermissionsEditRequest;
import com.redadani1997.blazingkraft.management.server_permissions.openapi.model.ServerPermissionsApiResponse;

public interface ServerPermissionsService {
    ServerPermissionsApiResponse editServerPermissions(ServerPermissionsEditRequest request);

    ServerPermissionsApiResponse getServerPermissions();
}
