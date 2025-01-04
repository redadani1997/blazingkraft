package com.redadani1997.blazingkraft.playground.dto.out.schema_validator;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ValidateSchemaResponse {
    private Boolean succeeded;

    private Boolean schemaDefinitionSucceeded;

    private List<String> errorMessages;

    private List<String> schemaDefinitionErrorMessages;
}
