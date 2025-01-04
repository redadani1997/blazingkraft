package com.redadani1997.blazingkraft.management.mapper.out;

import com.redadani1997.blazingkraft.management.mapper.out.data_masking.DataMaskingResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.group.GroupResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.oidc_provider.OIDCProviderResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.server_permissions.ServerPermissionsResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.user.UserResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ManagementResponseMapper {
    private final OIDCProviderResponseMapper oidcProviderResponseMapper;
    private final UserResponseMapper userResponseMapper;
    private final GroupResponseMapper groupResponseMapper;
    private final DataMaskingResponseMapper dataMaskingResponseMapper;
    private final ServerPermissionsResponseMapper serverPermissionsResponseMapper;

    public OIDCProviderResponseMapper oidcProviderResponseMapper() {
        return this.oidcProviderResponseMapper;
    }

    public UserResponseMapper userResponseMapper() {
        return this.userResponseMapper;
    }

    public GroupResponseMapper groupResponseMapper() {
        return this.groupResponseMapper;
    }

    public DataMaskingResponseMapper dataMaskingResponseMapper() {
        return this.dataMaskingResponseMapper;
    }

    public ServerPermissionsResponseMapper serverPermissionResponseMapper() {
        return this.serverPermissionsResponseMapper;
    }
}
