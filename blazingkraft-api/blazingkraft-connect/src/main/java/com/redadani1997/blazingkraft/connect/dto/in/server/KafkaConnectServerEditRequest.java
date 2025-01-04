package com.redadani1997.blazingkraft.connect.dto.in.server;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KafkaConnectServerEditRequest {

    private String code;
    private String color;
    private String url;
    private Boolean basicAuthEnabled;
    private String basicAuthUsername;
    private String basicAuthPassword;
    private String clusterCode;

    private Boolean jmxEnabled;
    private String jmxUrl;
    private Map<String, Object> jmxEnvironment;
}
