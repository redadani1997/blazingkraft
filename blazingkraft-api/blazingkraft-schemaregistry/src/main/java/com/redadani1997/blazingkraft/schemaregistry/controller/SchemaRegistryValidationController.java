package com.redadani1997.blazingkraft.schemaregistry.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryClient;
import com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryCode;
import com.redadani1997.blazingkraft.common.actions.schema_registry.SubjectActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryCompatibilityRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryContentRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryDefinitionRequest;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.SchemaRegistryRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.in.schema_registry_validation.SchemaRegistryValidatorRequestMapper;
import com.redadani1997.blazingkraft.schemaregistry.openapi.api.SchemaRegistryValidationApi;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.*;
import com.redadani1997.blazingkraft.schemaregistry.service.SchemaRegistryValidatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SchemaRegistryValidationController implements SchemaRegistryValidationApi {

    private final SchemaRegistryRequestMapper schemaRegistryRequestMapper;
    private final SchemaRegistryValidatorService schemaRegistryValidatorService;

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<ValidateSchemaRegistryDefinitionApiResponse>
            validateSchemaRegistryDefinition(
                    ValidateSchemaRegistryDefinitionApiRequest validateSchemaRegistryDefinitionApiRequest) {
        ValidateSchemaRegistryDefinitionRequest request =
                this.schemaRegistryValidatorRequestMapper()
                        .validateSchemaDefinitionRequest(validateSchemaRegistryDefinitionApiRequest);

        ValidateSchemaRegistryDefinitionApiResponse response =
                this.schemaRegistryValidatorService.validateSchemaRegistryDefinition(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<ValidateSchemaRegistryCompatibilityApiResponse>
            validateSchemaRegistryCompatibility(
                    ValidateSchemaRegistryCompatibilityApiRequest
                            validateSchemaRegistryCompatibilityApiRequest) {
        ValidateSchemaRegistryCompatibilityRequest request =
                this.schemaRegistryValidatorRequestMapper()
                        .validateSchemaCompatibilityRequest(validateSchemaRegistryCompatibilityApiRequest);

        ValidateSchemaRegistryCompatibilityApiResponse response =
                this.schemaRegistryValidatorService.validateSchemaRegistryCompatibility(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithSchemaRegistryCode
    @WithSchemaRegistryClient
    @WithAuthorization(
            permission = SubjectActions.DESCRIBE_SUBJECTS,
            type = EntityType.SCHEMA_REGISTRY)
    @Override
    public ResponseEntity<ValidateSchemaRegistryContentApiResponse> validateSchemaRegistryContent(
            ValidateSchemaRegistryContentApiRequest validateSchemaRegistryContentApiRequest) {
        ValidateSchemaRegistryContentRequest request =
                this.schemaRegistryValidatorRequestMapper()
                        .validateSchemaRegistryContentRequest(validateSchemaRegistryContentApiRequest);

        ValidateSchemaRegistryContentApiResponse response =
                this.schemaRegistryValidatorService.validateSchemaRegistryContent(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    private SchemaRegistryValidatorRequestMapper schemaRegistryValidatorRequestMapper() {
        return this.schemaRegistryRequestMapper.schemaRegistryValidatorRequestMapper();
    }
}
