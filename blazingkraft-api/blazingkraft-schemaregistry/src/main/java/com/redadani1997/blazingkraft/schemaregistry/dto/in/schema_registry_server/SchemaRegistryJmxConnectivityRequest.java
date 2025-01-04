package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchemaRegistryJmxConnectivityRequest {

    private String jmxUrl;
    private Map<String, Object> jmxEnvironment;
}
