package com.redadani1997.blazingkraft.playground.dto.out.schema_validator;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ValidateSchemaDefinitionResponse {
    private Boolean succeeded;

    private List<String> errorMessages;
}
