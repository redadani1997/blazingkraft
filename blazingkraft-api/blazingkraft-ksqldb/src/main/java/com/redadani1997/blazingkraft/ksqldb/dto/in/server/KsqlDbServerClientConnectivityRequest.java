package com.redadani1997.blazingkraft.ksqldb.dto.in.server;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KsqlDbServerClientConnectivityRequest {

    private String host;
    private Integer port;
    private Boolean basicAuthEnabled;
    private String basicAuthUsername;
    private String basicAuthPassword;
    private Boolean keyStoreEnabled;
    private String keyStore;
    private String keyStorePassword;
    private Boolean trustStoreEnabled;
    private String trustStore;
    private String trustStorePassword;
    private Boolean useTls;
    private Boolean verifyHost;
    private Boolean useAlpn;
    private Integer executeQueryMaxResultRows;
}
