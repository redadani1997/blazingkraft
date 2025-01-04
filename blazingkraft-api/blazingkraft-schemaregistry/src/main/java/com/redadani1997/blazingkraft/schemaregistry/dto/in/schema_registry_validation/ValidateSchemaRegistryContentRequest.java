package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation;

import com.redadani1997.blazingkraft.common.enums.SchemaType;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidateSchemaRegistryContentRequest {
    private String schema;

    private SchemaType schemaType;

    private List<SchemaReference> schemaReferences;

    private String content;
}
