package com.redadani1997.blazingkraft.playground.service;

import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaDefinitionRequest;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaContentApiResponse;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaDefinitionApiResponse;

public interface SchemaPlaygroundService {
    ValidateSchemaDefinitionApiResponse validateSchemaDefinition(
            ValidateSchemaDefinitionRequest request);

    ValidateSchemaContentApiResponse validateSchemaContent(ValidateSchemaRequest request);

    ValidateSchemaContentApiResponse validateOpenAPIContent(ValidateSchemaRequest request);

    ValidateSchemaDefinitionApiResponse validateOpenAPIDefinition(
            ValidateSchemaDefinitionRequest request);
}
