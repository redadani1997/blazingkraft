package com.redadani1997.blazingkraft.management.dto.in.server_permissions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServerPermissionsEditRequest {
    private String clusterPermissions;
    private String kafkaConnectPermissions;
    private String schemaRegistryPermissions;
    private String ksqlDbPermissions;
    private String managementPermissions;
    private String playgroundPermissions;
}
