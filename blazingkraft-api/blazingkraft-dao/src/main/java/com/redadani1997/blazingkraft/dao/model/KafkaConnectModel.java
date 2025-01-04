package com.redadani1997.blazingkraft.dao.model;

import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import jakarta.persistence.*;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "kafka_connects")
@Getter
@Setter
@NoArgsConstructor
public class KafkaConnectModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String name;

    private String code;

    private String color;

    private String url;

    private Boolean basicAuthEnabled;

    private String basicAuthUsername;

    private String basicAuthPassword;

    private Boolean jmxEnabled;

    private String jmxUrl;

    private String jmxEnvironment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cluster_id")
    private ClusterModel clusterModel;

    public KafkaConnectModel(
            String name,
            String code,
            String color,
            String url,
            Boolean basicAuthEnabled,
            String basicAuthUsername,
            String basicAuthPassword,
            ClusterModel clusterModel) {
        this.name = name;
        this.code = code;
        this.color = color;
        this.url = url;
        this.basicAuthEnabled = basicAuthEnabled;
        this.basicAuthUsername = basicAuthUsername;
        this.basicAuthPassword = basicAuthPassword;
        this.clusterModel = clusterModel;
    }

    public Map<String, Object> jmxEnvironment() {
        return CommonTextUtils.stringToMap(this.jmxEnvironment);
    }

    public void setJmxEnvironment(Map<String, Object> jmxEnvironment) {
        this.jmxEnvironment = CommonTextUtils.mapToString(jmxEnvironment);
    }
}
