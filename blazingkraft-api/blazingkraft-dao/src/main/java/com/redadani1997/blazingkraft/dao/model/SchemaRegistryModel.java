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
@Table(name = "schema_registries")
@Getter
@Setter
@NoArgsConstructor
public class SchemaRegistryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String name;

    private String code;
    private String color;

    private String schemaRegistryUrls;

    private Integer schemasCacheSize;

    private String mainConfiguration;

    private Boolean jmxEnabled;

    private String jmxUrl;

    private String jmxEnvironment;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "schemaRegistryModel")
    private List<ClusterModel> clusterModels;

    public Map<String, Object> mainConfiguration() {
        return CommonTextUtils.stringToMap(this.mainConfiguration);
    }

    public void setMainConfiguration(Map<String, Object> mainConfiguration) {
        this.mainConfiguration = CommonTextUtils.mapToString(mainConfiguration);
    }

    public Map<String, Object> jmxEnvironment() {
        return CommonTextUtils.stringToMap(this.jmxEnvironment);
    }

    public void setJmxEnvironment(Map<String, Object> jmxEnvironment) {
        this.jmxEnvironment = CommonTextUtils.mapToString(jmxEnvironment);
    }
}
