package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_server;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SchemaRegistryDetailsRequest {

    private String code;
}
