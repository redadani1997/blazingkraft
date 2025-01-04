package com.redadani1997.blazingkraft.dao.model;

import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "producers")
@Getter
@Setter
@NoArgsConstructor
public class ProducerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String code;

    private Boolean perRequestKeySerializer;
    private String keySerializer;
    private String keySerializerConfiguration;

    private Boolean perRequestValueSerializer;
    private String valueSerializer;
    private String valueSerializerConfiguration;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cluster_id")
    private ClusterModel clusterModel;

    private String mainConfiguration;

    public ProducerModel(ClusterModel clusterModel, Map<String, Object> mainConfiguration) {
        this.perRequestKeySerializer = true;
        this.keySerializer = null;
        this.keySerializerConfiguration = null;

        this.perRequestValueSerializer = true;
        this.valueSerializer = null;
        this.valueSerializerConfiguration = null;

        this.mainConfiguration = CommonTextUtils.mapToString(mainConfiguration);
        this.clusterModel = clusterModel;
        this.code = clusterModel.getCode();
    }

    public Map<String, Object> mergedConfiguration() {
        Map<String, Object> mergedConfiguration = new HashMap<>();

        mergedConfiguration.putAll(this.mainConfiguration());
        mergedConfiguration.putAll(this.commonClusterConfiguration());
        mergedConfiguration.putAll(this.customClusterConfiguration());

        return mergedConfiguration;
    }

    public Map<String, Object> mainConfiguration() {
        return CommonTextUtils.stringToMap(this.mainConfiguration);
    }

    public Map<String, Object> commonClusterConfiguration() {
        Map<String, Object> commonClusterConfiguration = new HashMap<>();

        commonClusterConfiguration.putAll(this.clusterModel.commonConfiguration());

        return commonClusterConfiguration;
    }

    public Map<String, Object> customClusterConfiguration() {
        return new HashMap<>();
    }

    public String schemaRegistryCode() {
        SchemaRegistryModel schemaRegistryModel = this.clusterModel.getSchemaRegistryModel();
        if (schemaRegistryModel != null) {
            return schemaRegistryModel.getCode();
        }
        return null;
    }

    public void setMainConfiguration(Map<String, Object> mainConfiguration) {
        this.mainConfiguration = CommonTextUtils.mapToString(mainConfiguration);
    }

    public void setKeySerializerConfiguration(Map<String, Object> keySerializerConfiguration) {
        this.keySerializerConfiguration = CommonTextUtils.mapToString(keySerializerConfiguration);
    }

    public Map<String, Object> keySerializerConfiguration() {
        return CommonTextUtils.stringToMap(this.keySerializerConfiguration);
    }

    public void setValueSerializerConfiguration(Map<String, Object> valueSerializerConfiguration) {
        this.valueSerializerConfiguration = CommonTextUtils.mapToString(valueSerializerConfiguration);
    }

    public Map<String, Object> valueSerializerConfiguration() {
        return CommonTextUtils.stringToMap(this.valueSerializerConfiguration);
    }
}
