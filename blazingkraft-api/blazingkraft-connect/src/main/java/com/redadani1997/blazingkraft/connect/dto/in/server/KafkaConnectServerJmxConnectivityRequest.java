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
public class KafkaConnectServerJmxConnectivityRequest {

    private String jmxUrl;
    private Map<String, Object> jmxEnvironment;
}
