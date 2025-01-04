package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation;

import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidateSchemaRegistryDefinitionRequest {
    private String schema;

    private String schemaType;

    private List<SchemaReference> schemaReferences;
}
