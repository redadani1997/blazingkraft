package com.redadani1997.blazingkraft.schemaregistry.service;

import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryCompatibilityRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryContentRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryDefinitionRequest;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryCompatibilityApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryContentApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryDefinitionApiResponse;

public interface SchemaRegistryValidatorService {
    ValidateSchemaRegistryDefinitionApiResponse validateSchemaRegistryDefinition(
            ValidateSchemaRegistryDefinitionRequest request);

    ValidateSchemaRegistryContentApiResponse validateSchemaRegistryContent(
            ValidateSchemaRegistryContentRequest request);

    ValidateSchemaRegistryCompatibilityApiResponse validateSchemaRegistryCompatibility(
            ValidateSchemaRegistryCompatibilityRequest request);
}
