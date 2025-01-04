package com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class SchemaVersionDeleteRequest {

    private String subject;

    private String version;

    private boolean permanent;
}
