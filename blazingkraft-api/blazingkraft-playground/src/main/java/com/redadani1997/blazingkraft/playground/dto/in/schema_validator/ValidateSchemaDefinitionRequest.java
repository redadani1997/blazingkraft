package com.redadani1997.blazingkraft.playground.dto.in.schema_validator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ValidateSchemaDefinitionRequest {
    private String schema;

    private String schemaType;
}
