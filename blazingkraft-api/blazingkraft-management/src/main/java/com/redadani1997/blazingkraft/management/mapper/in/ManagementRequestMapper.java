package com.redadani1997.blazingkraft.management.mapper.in;

import com.redadani1997.blazingkraft.management.mapper.in.data_masking.DataMaskingRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.group.GroupRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.oidc_provider.OIDCProviderRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.server_permissions.ServerPermissionsRequestMapper;
import com.redadani1997.blazingkraft.management.mapper.in.user.UserRequestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ManagementRequestMapper {
    private final OIDCProviderRequestMapper oidcProviderRequestMapper;
    private final UserRequestMapper userRequestMapper;
    private final GroupRequestMapper groupRequestMapper;
    private final DataMaskingRequestMapper dataMaskingRequestMapper;
    private final ServerPermissionsRequestMapper serverPermissionsRequestMapper;

    public OIDCProviderRequestMapper oidcProviderRequestMapper() {
        return this.oidcProviderRequestMapper;
    }

    public UserRequestMapper userRequestMapper() {
        return this.userRequestMapper;
    }

    public GroupRequestMapper groupRequestMapper() {
        return this.groupRequestMapper;
    }

    public DataMaskingRequestMapper dataMaskingRequestMapper() {
        return this.dataMaskingRequestMapper;
    }

    public ServerPermissionsRequestMapper serverPermissionRequestMapper() {
        return this.serverPermissionsRequestMapper;
    }
}
