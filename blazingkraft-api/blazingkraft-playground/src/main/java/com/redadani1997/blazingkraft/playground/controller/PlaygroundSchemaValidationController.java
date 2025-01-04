package com.redadani1997.blazingkraft.playground.controller;

import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaDefinitionRequest;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaRequest;
import com.redadani1997.blazingkraft.playground.mapper.in.PlaygroundRequestMapper;
import com.redadani1997.blazingkraft.playground.mapper.in.schema_validator.SchemaValidatorRequestMapper;
import com.redadani1997.blazingkraft.playground.openapi.api.PlaygroundSchemaValidationApi;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaContentApiRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaContentApiResponse;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaDefinitionApiRequest;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaDefinitionApiResponse;
import com.redadani1997.blazingkraft.playground.service.SchemaPlaygroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PlaygroundSchemaValidationController implements PlaygroundSchemaValidationApi {
    private final SchemaPlaygroundService schemaPlaygroundService;
    private final PlaygroundRequestMapper playgroundRequestMapper;

    @WithCleanUp
    @Override
    public ResponseEntity<ValidateSchemaContentApiResponse> validateSchemaContent(
            ValidateSchemaContentApiRequest apiRequest) {

        ValidateSchemaRequest request =
                this.schemaValidatorRequestMapper().validateSchemaRequest(apiRequest);
        ValidateSchemaContentApiResponse response =
                this.schemaPlaygroundService.validateSchemaContent(request);
        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @Override
    public ResponseEntity<ValidateSchemaDefinitionApiResponse> validateSchemaDefinition(
            ValidateSchemaDefinitionApiRequest apiRequest) {

        ValidateSchemaDefinitionRequest request =
                this.schemaValidatorRequestMapper().validateSchemaDefinitionRequest(apiRequest);
        ValidateSchemaDefinitionApiResponse response =
                this.schemaPlaygroundService.validateSchemaDefinition(request);
        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @Override
    public ResponseEntity<ValidateSchemaContentApiResponse> validateOpenAPIContent(
            ValidateSchemaContentApiRequest apiRequest) {
        ValidateSchemaRequest request =
                this.schemaValidatorRequestMapper().validateSchemaRequest(apiRequest);

        ValidateSchemaContentApiResponse response =
                this.schemaPlaygroundService.validateOpenAPIContent(request);

        return ResponseEntity.ok(response);
    }

    @WithCleanUp
    @Override
    public ResponseEntity<ValidateSchemaDefinitionApiResponse> validateOpenAPIDefinition(
            ValidateSchemaDefinitionApiRequest apiRequest) {
        ValidateSchemaDefinitionRequest request =
                this.schemaValidatorRequestMapper().validateSchemaDefinitionRequest(apiRequest);

        ValidateSchemaDefinitionApiResponse response =
                this.schemaPlaygroundService.validateOpenAPIDefinition(request);

        return ResponseEntity.ok(response);
    }

    public SchemaValidatorRequestMapper schemaValidatorRequestMapper() {
        return this.playgroundRequestMapper.schemaValidatorRequestMapper();
    }
}
