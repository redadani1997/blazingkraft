package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SchemaRegistryModeUpdateRequest {

    private String mode;
}
