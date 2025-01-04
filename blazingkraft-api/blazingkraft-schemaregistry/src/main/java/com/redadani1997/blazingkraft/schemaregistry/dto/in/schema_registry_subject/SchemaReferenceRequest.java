package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SchemaReferenceRequest {
    private String subject;

    private Integer version;

    private String name;
}
