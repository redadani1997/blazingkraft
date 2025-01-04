package com.redadani1997.blazingkraft.dao.model;

import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import jakarta.persistence.*;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "ksqldbs")
@Getter
@Setter
@NoArgsConstructor
public class KsqlDbModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String code;
    private String name;
    private String color;
    private String host;
    private Integer port;
    private Boolean basicAuthEnabled;
    private String basicAuthUsername;
    private String basicAuthPassword;
    private String keyStore;
    private Boolean keyStoreEnabled;
    private String keyStorePassword;
    private Boolean trustStoreEnabled;
    private String trustStore;
    private String trustStorePassword;
    private Boolean useTls;
    private Boolean verifyHost;
    private Boolean useAlpn;
    private Integer executeQueryMaxResultRows;

    private Boolean jmxEnabled;
    private String jmxUrl;
    private String jmxEnvironment;

    public Map<String, Object> jmxEnvironment() {
        return CommonTextUtils.stringToMap(this.jmxEnvironment);
    }

    public void setJmxEnvironment(Map<String, Object> jmxEnvironment) {
        this.jmxEnvironment = CommonTextUtils.mapToString(jmxEnvironment);
    }
}
