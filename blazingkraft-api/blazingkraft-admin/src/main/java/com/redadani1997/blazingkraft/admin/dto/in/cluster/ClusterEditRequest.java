package com.redadani1997.blazingkraft.admin.dto.in.cluster;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ClusterEditRequest {
    private String code;
    private String color;

    private String schemaRegistryCode;

    private Map<String, Object> commonConfiguration;

    private Boolean jmxEnabled;

    private String jmxUrl;

    private Map<String, Object> jmxEnvironment;
}
