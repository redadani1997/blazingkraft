package com.redadani1997.blazingkraft.playground.service.impl;

import com.redadani1997.blazingkraft.common.util.CommonSchemaUtils;
import com.redadani1997.blazingkraft.error.common.SchemaContentValidationException;
import com.redadani1997.blazingkraft.error.common.SchemaParseException;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaDefinitionRequest;
import com.redadani1997.blazingkraft.playground.dto.in.schema_validator.ValidateSchemaRequest;
import com.redadani1997.blazingkraft.playground.mapper.out.PlaygroundResponseMapper;
import com.redadani1997.blazingkraft.playground.mapper.out.schema_validator.SchemaValidatorResponseMapper;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaContentApiResponse;
import com.redadani1997.blazingkraft.playground.openapi.model.ValidateSchemaDefinitionApiResponse;
import com.redadani1997.blazingkraft.playground.service.SchemaPlaygroundService;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import lombok.RequiredArgsConstructor;
import org.openapi4j.schema.validator.v3.SchemaValidator;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchemaPlaygroundServiceImpl implements SchemaPlaygroundService {
    private final PlaygroundResponseMapper playgroundResponseMapper;

    @Override
    public ValidateSchemaDefinitionApiResponse validateSchemaDefinition(
            ValidateSchemaDefinitionRequest request) {
        try {
            CommonSchemaUtils.parseSchema(request.getSchema(), request.getSchemaType());
        } catch (SchemaParseException ex) {
            return this.schemaValidatorResponseMapper()
                    .validateSchemaDefinitionApiResponse(false, ex.getErrorMessages());
        }
        return this.schemaValidatorResponseMapper().validateSchemaDefinitionApiResponse(true, null);
    }

    @Override
    public ValidateSchemaContentApiResponse validateSchemaContent(ValidateSchemaRequest request) {
        ParsedSchema parsedSchema;
        try {
            parsedSchema = CommonSchemaUtils.parseSchema(request.getSchema(), request.getSchemaType());
        } catch (SchemaParseException ex) {
            return this.schemaValidatorResponseMapper()
                    .validateSchemaContentApiResponse(false, null, false, ex.getErrorMessages());
        }
        try {
            CommonSchemaUtils.validateSchemaContent(
                    parsedSchema, request.getContent(), request.getContentType());
        } catch (SchemaContentValidationException ex) {
            return this.schemaValidatorResponseMapper()
                    .validateSchemaContentApiResponse(false, ex.getErrorMessages(), false, null);
        }
        return this.schemaValidatorResponseMapper()
                .validateSchemaContentApiResponse(true, null, true, null);
    }

    @Override
    public ValidateSchemaDefinitionApiResponse validateOpenAPIDefinition(
            ValidateSchemaDefinitionRequest request) {
        try {
            CommonSchemaUtils.parseOpenApiSchema(request.getSchema(), request.getSchemaType());
        } catch (SchemaParseException ex) {
            return this.schemaValidatorResponseMapper()
                    .validateSchemaDefinitionApiResponse(false, ex.getErrorMessages());
        }
        return this.schemaValidatorResponseMapper().validateSchemaDefinitionApiResponse(true, null);
    }

    @Override
    public ValidateSchemaContentApiResponse validateOpenAPIContent(ValidateSchemaRequest request) {
        SchemaValidator schemaValidator;
        try {
            schemaValidator =
                    CommonSchemaUtils.parseOpenApiSchema(request.getSchema(), request.getSchemaType());
        } catch (SchemaParseException ex) {
            return this.schemaValidatorResponseMapper()
                    .validateSchemaContentApiResponse(false, null, false, ex.getErrorMessages());
        }
        try {
            CommonSchemaUtils.validateOpenApiSchemaContent(
                    schemaValidator, request.getContent(), request.getContentType());
        } catch (SchemaContentValidationException ex) {
            return this.schemaValidatorResponseMapper()
                    .validateSchemaContentApiResponse(false, ex.getErrorMessages(), false, null);
        }
        return this.schemaValidatorResponseMapper()
                .validateSchemaContentApiResponse(true, null, true, null);
    }

    public SchemaValidatorResponseMapper schemaValidatorResponseMapper() {
        return this.playgroundResponseMapper.schemaValidatorResponseMapper();
    }
}
