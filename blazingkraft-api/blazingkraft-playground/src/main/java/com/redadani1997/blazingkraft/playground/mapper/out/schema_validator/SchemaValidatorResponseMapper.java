package com.redadani1997.blazingkraft.playground.mapper.out.schema_validator;

import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaContentApiResponse;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaDefinitionApiResponse;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SchemaValidatorResponseMapper {
    public ValidateSchemaDefinitionApiResponse validateSchemaDefinitionApiResponse(
            boolean succeeded, List<String> errorMessages) {
        ValidateSchemaDefinitionApiResponse response = new ValidateSchemaDefinitionApiResponse();
        response.setSucceeded(succeeded);
        response.setErrorMessages(errorMessages);
        return response;
    }

    public ValidateSchemaContentApiResponse validateSchemaContentApiResponse(
            boolean succeeded,
            List<String> errorMessages,
            boolean schemaDefinitionSucceeded,
            List<String> schemaDefinitionErrorMessages) {
        ValidateSchemaContentApiResponse response = new ValidateSchemaContentApiResponse();
        response.setSucceeded(succeeded);
        response.setErrorMessages(errorMessages);
        response.setSchemaDefinitionSucceeded(schemaDefinitionSucceeded);
        response.setSchemaDefinitionErrorMessages(schemaDefinitionErrorMessages);
        return response;
    }
}
