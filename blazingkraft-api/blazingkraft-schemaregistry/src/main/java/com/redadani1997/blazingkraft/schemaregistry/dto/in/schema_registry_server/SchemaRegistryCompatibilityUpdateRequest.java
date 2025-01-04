package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchemaRegistryCompatibilityUpdateRequest {

    private String compatibility;
}
