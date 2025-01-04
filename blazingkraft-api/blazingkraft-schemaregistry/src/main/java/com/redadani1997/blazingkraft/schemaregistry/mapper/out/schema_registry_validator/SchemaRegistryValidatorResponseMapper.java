package com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_validator;

import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryCompatibilityApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryContentApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryDefinitionApiResponse;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SchemaRegistryValidatorResponseMapper {
    public ValidateSchemaRegistryDefinitionApiResponse validateSchemaRegistryDefinitionApiResponse(
            boolean succeeded, List<String> errorMessages) {
        ValidateSchemaRegistryDefinitionApiResponse response =
                new ValidateSchemaRegistryDefinitionApiResponse();

        response.setErrorMessages(errorMessages);
        response.setSucceeded(succeeded);

        return response;
    }

    public ValidateSchemaRegistryContentApiResponse validateSchemaRegistryContentApiResponse(
            boolean succeeded,
            List<String> errorMessages,
            boolean schemaDefinitionSucceeded,
            List<String> schemaDefinitionErrorMessages) {
        ValidateSchemaRegistryContentApiResponse response =
                new ValidateSchemaRegistryContentApiResponse();

        response.setErrorMessages(errorMessages);
        response.setSucceeded(succeeded);
        response.setSchemaDefinitionSucceeded(schemaDefinitionSucceeded);
        response.setSchemaDefinitionErrorMessages(schemaDefinitionErrorMessages);

        return response;
    }

    public ValidateSchemaRegistryCompatibilityApiResponse
            validateSchemaRegistryCompatibilityApiResponse(
                    boolean succeeded,
                    List<String> errorMessages,
                    boolean schemaDefinitionSucceeded,
                    List<String> schemaDefinitionErrorMessages) {
        ValidateSchemaRegistryCompatibilityApiResponse response =
                new ValidateSchemaRegistryCompatibilityApiResponse();

        response.setErrorMessages(errorMessages);
        response.setSucceeded(succeeded);
        response.setSchemaDefinitionSucceeded(schemaDefinitionSucceeded);
        response.setSchemaDefinitionErrorMessages(schemaDefinitionErrorMessages);

        return response;
    }
}
