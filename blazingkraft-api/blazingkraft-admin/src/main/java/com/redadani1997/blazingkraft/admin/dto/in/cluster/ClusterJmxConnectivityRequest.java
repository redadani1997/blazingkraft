package com.redadani1997.blazingkraft.admin.dto.in.cluster;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClusterJmxConnectivityRequest {
    private String jmxUrl;
    private Map<String, Object> jmxEnvironment;
}
