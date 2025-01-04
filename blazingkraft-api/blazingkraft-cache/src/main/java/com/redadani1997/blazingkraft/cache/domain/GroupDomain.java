package com.redadani1997.blazingkraft.cache.domain;

import java.util.List;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupDomain {
    private String code;

    private Map<String, List<String>> clusterPermissions;

    private Map<String, List<String>> kafkaConnectPermissions;

    private Map<String, List<String>> schemaRegistryPermissions;

    private Map<String, List<String>> ksqlDbPermissions;

    private List<String> managementPermissions;

    private List<String> playgroundPermissions;
}
