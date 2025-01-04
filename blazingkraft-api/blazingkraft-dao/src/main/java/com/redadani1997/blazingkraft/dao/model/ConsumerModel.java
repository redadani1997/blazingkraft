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
@Table(name = "consumers")
@Getter
@Setter
@NoArgsConstructor
public class ConsumerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String code;

    private Long pollTimeoutMs;

    private Boolean perRequestKeyDeserializer;
    private String keyDeserializer;
    private String keyDeserializerConfiguration;

    private Boolean perRequestValueDeserializer;
    private String valueDeserializer;
    private String valueDeserializerConfiguration;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cluster_id")
    private ClusterModel clusterModel;

    private String mainConfiguration;

    public ConsumerModel(ClusterModel clusterModel, Map<String, Object> mainConfiguration) {
        this.perRequestKeyDeserializer = true;
        this.keyDeserializer = null;
        this.keyDeserializerConfiguration = null;

        this.perRequestValueDeserializer = true;
        this.valueDeserializer = null;
        this.valueDeserializerConfiguration = null;

        this.pollTimeoutMs = 750L;

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

    public String schemaRegistryCode() {
        SchemaRegistryModel schemaRegistryModel = this.clusterModel.getSchemaRegistryModel();
        if (schemaRegistryModel != null) {
            return schemaRegistryModel.getCode();
        }
        return null;
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

    public void setMainConfiguration(Map<String, Object> mainConfiguration) {
        this.mainConfiguration = CommonTextUtils.mapToString(mainConfiguration);
    }

    public void setKeyDeserializerConfiguration(Map<String, Object> keyDeserializerConfiguration) {
        this.keyDeserializerConfiguration = CommonTextUtils.mapToString(keyDeserializerConfiguration);
    }

    public Map<String, Object> keyDeserializerConfiguration() {
        return CommonTextUtils.stringToMap(this.keyDeserializerConfiguration);
    }

    public void setValueDeserializerConfiguration(
            Map<String, Object> valueDeserializerConfiguration) {
        this.valueDeserializerConfiguration =
                CommonTextUtils.mapToString(valueDeserializerConfiguration);
    }

    public Map<String, Object> valueDeserializerConfiguration() {
        return CommonTextUtils.stringToMap(this.valueDeserializerConfiguration);
    }
}
