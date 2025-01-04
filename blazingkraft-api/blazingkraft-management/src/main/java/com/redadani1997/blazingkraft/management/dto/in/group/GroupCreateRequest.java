package com.redadani1997.blazingkraft.management.dto.in.group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupCreateRequest {
    private String name;
    private String code;
    private String description;
    private String clusterPermissions;
    private String kafkaConnectPermissions;
    private String schemaRegistryPermissions;
    private String ksqlDbPermissions;
    private String managementPermissions;
    private String playgroundPermissions;
}
