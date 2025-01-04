package com.redadani1997.blazingkraft.common.current_user;

import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class CurrentUser {
    private String identifier;
    private String displayedName;
    private String picture;

    private String issuer;

    private Map<String, List<String>> clusterPermissions;
    private Map<String, List<String>> kafkaConnectPermissions;
    private Map<String, List<String>> schemaRegistryPermissions;
    private Map<String, List<String>> ksqlDbPermissions;
    private List<String> managementPermissions;
    private List<String> playgroundPermissions;

    private String group;

    private Boolean hasGroup;
    private Boolean isBlazingAdmin;
}
