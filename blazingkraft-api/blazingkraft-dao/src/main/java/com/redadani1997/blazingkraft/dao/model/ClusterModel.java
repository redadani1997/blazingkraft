package com.redadani1997.blazingkraft.dao.model;

import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import jakarta.persistence.*;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "clusters")
@Getter
@Setter
@NoArgsConstructor
public class ClusterModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String name;

    private String code;

    private String color;

    private String commonConfiguration;

    private Boolean jmxEnabled;

    private String jmxUrl;

    private String jmxEnvironment;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "clusterModel", cascade = CascadeType.REMOVE)
    private ProducerModel producerModel;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "clusterModel", cascade = CascadeType.REMOVE)
    private ConsumerModel consumerModel;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schema_registry_id")
    private SchemaRegistryModel schemaRegistryModel;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "clusterModel")
    private List<KafkaConnectModel> kafkaConnectModels;

    public Map<String, Object> commonConfiguration() {
        return CommonTextUtils.stringToMap(this.commonConfiguration);
    }

    public Map<String, Object> jmxEnvironment() {
        return CommonTextUtils.stringToMap(this.jmxEnvironment);
    }

    public String schemaRegistryCode() {
        if (this.schemaRegistryModel == null) {
            return null;
        }
        return this.schemaRegistryModel.getCode();
    }

    public String schemaRegistryName() {
        if (this.schemaRegistryModel == null) {
            return null;
        }
        return this.schemaRegistryModel.getName();
    }

    public void setCommonConfiguration(Map<String, Object> commonConfiguration) {
        this.commonConfiguration = CommonTextUtils.mapToString(commonConfiguration);
    }

    public void setJmxEnvironment(Map<String, Object> jmxEnvironment) {
        this.jmxEnvironment = CommonTextUtils.mapToString(jmxEnvironment);
    }
}
