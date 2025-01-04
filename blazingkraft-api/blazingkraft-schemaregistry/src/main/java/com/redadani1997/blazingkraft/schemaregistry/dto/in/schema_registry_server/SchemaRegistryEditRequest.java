package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SchemaRegistryEditRequest {

    private String code;

    private String color;

    private String schemaRegistryUrls;

    private Integer schemasCacheSize;

    private Map<String, Object> mainConfiguration;

    private Boolean jmxEnabled;

    private String jmxUrl;

    private Map<String, Object> jmxEnvironment;
}
