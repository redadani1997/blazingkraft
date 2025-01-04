package com.redadani1997.blazingkraft.authorization.util;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthorizationUtils {

    private final ClientsFactory clientsFactory;

    public Boolean hasPermission(
            EntityType type,
            String requiredPermission,
            Map<String, List<String>> clusterPermissions,
            Map<String, List<String>> kafkaConnectPermissions,
            Map<String, List<String>> schemaRegistryPermissions,
            Map<String, List<String>> ksqlDbPermissions,
            List<String> managementPermissions,
            List<String> playgroundPermissions) {

        return switch (type) {
            case CLUSTER -> codeHasPermission(clusterPermissions, requiredPermission);
            case KAFKA_CONNECT -> codeHasPermission(kafkaConnectPermissions, requiredPermission);
            case SCHEMA_REGISTRY -> codeHasPermission(schemaRegistryPermissions, requiredPermission);
            case KSQLDB -> codeHasPermission(ksqlDbPermissions, requiredPermission);
            case MANAGEMENT -> normalHasPermission(managementPermissions, requiredPermission);
            case PLAYGROUND -> normalHasPermission(playgroundPermissions, requiredPermission);
        };
    }

    private Boolean codeHasPermission(
            Map<String, List<String>> codePermissions, String requiredPermission) {
        if (codePermissions == null) {
            return false;
        }
        if (this.clientsFactory.currentCode() == null) {
            return false;
        }
        String code = this.clientsFactory.currentCode().getCode();
        if (code == null) {
            return false;
        }

        List<String> permissions = codePermissions.get(code);

        if (permissions == null) {
            return false;
        }

        return permissions.contains(requiredPermission);
    }

    private Boolean normalHasPermission(List<String> permissions, String requiredPermission) {
        if (permissions == null) {
            return false;
        }

        return permissions.contains(requiredPermission);
    }
}
