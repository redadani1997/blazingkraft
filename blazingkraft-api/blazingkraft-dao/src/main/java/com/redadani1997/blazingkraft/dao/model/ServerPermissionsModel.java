package com.redadani1997.blazingkraft.dao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "server_permissions")
@Getter
@Setter
@NoArgsConstructor
public class ServerPermissionsModel {
    @Id private Long id;

    private String createdBy;
    private String updatedBy;
    private Long creationTime;
    private Long updateTime;

    private String clusterPermissions;
    private String kafkaConnectPermissions;
    private String schemaRegistryPermissions;
    private String ksqlDbPermissions;
    private String managementPermissions;
    private String playgroundPermissions;
}
