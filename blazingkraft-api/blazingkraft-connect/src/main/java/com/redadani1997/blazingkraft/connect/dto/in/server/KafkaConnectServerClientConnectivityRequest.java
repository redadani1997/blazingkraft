package com.redadani1997.blazingkraft.connect.dto.in.server;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KafkaConnectServerClientConnectivityRequest {

    private String url;
    private Boolean basicAuthEnabled;
    private String basicAuthUsername;
    private String basicAuthPassword;
}
