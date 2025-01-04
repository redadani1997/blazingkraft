package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import io.confluent.kafka.schemaregistry.ParsedSchema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubjectVersionCreateRequest {
    private String schemaType;

    private ParsedSchema parsedSchema;

    private String subject;
}
