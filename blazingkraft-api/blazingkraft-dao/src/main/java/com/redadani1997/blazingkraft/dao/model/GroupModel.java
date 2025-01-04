package com.redadani1997.blazingkraft.dao.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "blazing_groups")
@Getter
@Setter
@NoArgsConstructor
public class GroupModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String name;
    private String code;
    private String description;
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupModel", cascade = CascadeType.ALL)
    private List<UserModel> users;
}
