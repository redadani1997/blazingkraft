package com.redadani1997.blazingkraft.schemaregistry.service.impl;

import com.google.protobuf.Descriptors;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.common.util.CommonSchemaUtils;
import com.redadani1997.blazingkraft.error.common.SchemaContentValidationException;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryCompatibilityRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryContentRequest;
import com.redadani1997.blazingkraft.schemaregistry.dto.in.schema_registry_validation.ValidateSchemaRegistryDefinitionRequest;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.SchemaRegistryResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.mapper.out.schema_registry_validator.SchemaRegistryValidatorResponseMapper;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryCompatibilityApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryContentApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.openapi.model.ValidateSchemaRegistryDefinitionApiResponse;
import com.redadani1997.blazingkraft.schemaregistry.service.SchemaRegistryValidatorService;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.schemaregistry.SchemaProvider;
import io.confluent.kafka.schemaregistry.avro.AvroSchema;
import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.entities.Schema;
import io.confluent.kafka.schemaregistry.client.rest.entities.SchemaReference;
import io.confluent.kafka.schemaregistry.json.JsonSchema;
import io.confluent.kafka.schemaregistry.protobuf.ProtobufSchema;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchemaRegistryValidatorServiceImpl implements SchemaRegistryValidatorService {
    private final ClientsFactory clientsFactory;

    private final SchemaRegistryResponseMapper schemaRegistryResponseMapper;

    @Override
    public ValidateSchemaRegistryDefinitionApiResponse validateSchemaRegistryDefinition(
            ValidateSchemaRegistryDefinitionRequest request) {
        try {
            this.resolveParsedSchema(
                    request.getSchema(), request.getSchemaType(), request.getSchemaReferences());
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            Throwable cause = ex.getCause();
            if (cause instanceof Descriptors.DescriptorValidationException) {
                errorMessages = List.of(cause.getMessage());
            }
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryDefinitionApiResponse(false, errorMessages);
        }

        return this.schemaRegistryValidatorResponseMapper()
                .validateSchemaRegistryDefinitionApiResponse(true, null);
    }

    @Override
    public ValidateSchemaRegistryContentApiResponse validateSchemaRegistryContent(
            ValidateSchemaRegistryContentRequest request) {
        if (request.getSchemaType() == SchemaType.PROTOBUF) {
            return this.validateProtobufSchemaContent(request);
        } else if (request.getSchemaType() == SchemaType.AVRO) {
            return this.validateAvroSchemaContent(request);
        } else {
            return this.validateJsonSchemaContent(request);
        }
    }

    @Override
    public ValidateSchemaRegistryCompatibilityApiResponse validateSchemaRegistryCompatibility(
            ValidateSchemaRegistryCompatibilityRequest request) {
        ParsedSchema parsedSchema;
        try {
            parsedSchema =
                    this.resolveParsedSchema(
                            request.getSchema(), request.getSchemaType(), request.getSchemaReferences());
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            Throwable cause = ex.getCause();
            if (cause instanceof Descriptors.DescriptorValidationException) {
                errorMessages = List.of(cause.getMessage());
            }
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryCompatibilityApiResponse(false, null, false, errorMessages);
        }
        List<String> errorMessages = new ArrayList<>();
        boolean isCompatible = false;

        try {
            isCompatible =
                    this.currentSchemaRegistryClient().testCompatibility(request.getSubject(), parsedSchema);
            errorMessages.addAll(
                    this.currentSchemaRegistryClient()
                            .testCompatibilityVerbose(request.getSubject(), parsedSchema));
        } catch (Exception ex) {
            errorMessages.add(ex.getMessage());
        }
        if (!isCompatible && errorMessages.isEmpty()) {
            errorMessages.add("Schemas are incompatible");
        }
        if (errorMessages.isEmpty()) {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryCompatibilityApiResponse(true, null, true, null);
        } else {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryCompatibilityApiResponse(false, errorMessages, true, null);
        }
    }

    private ParsedSchema resolveParsedSchema(
            String schema, String schemaType, List<SchemaReference> schemaReferences) {
        if (schemaReferences == null) {
            schemaReferences = new ArrayList<>();
        }

        Map<String, SchemaProvider> schemaProviders =
                this.currentSchemaRegistryClient().getSchemaProviders();

        SchemaProvider schemaProvider = schemaProviders.get(schemaType);

        Schema computedSchema = new Schema(null, null, null, schemaType, schemaReferences, schema);

        ParsedSchema parsedSchema = schemaProvider.parseSchemaOrElseThrow(computedSchema, false, false);

        parsedSchema.validate();

        return parsedSchema;
    }

    private ValidateSchemaRegistryContentApiResponse validateJsonSchemaContent(
            ValidateSchemaRegistryContentRequest request) {
        JsonSchema parsedSchema;
        try {
            parsedSchema =
                    (JsonSchema)
                            this.resolveParsedSchema(
                                    request.getSchema(), SchemaType.JSON.name(), request.getSchemaReferences());
        } catch (Exception ex) {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryContentApiResponse(false, null, false, List.of(ex.getMessage()));
        }
        try {
            CommonSchemaUtils.validateSchemaContent(
                    parsedSchema, request.getContent(), ContentType.JSON.name());
        } catch (SchemaContentValidationException ex) {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryContentApiResponse(false, ex.getErrorMessages(), true, null);
        }
        return this.schemaRegistryValidatorResponseMapper()
                .validateSchemaRegistryContentApiResponse(true, null, true, null);
    }

    private ValidateSchemaRegistryContentApiResponse validateAvroSchemaContent(
            ValidateSchemaRegistryContentRequest request) {
        AvroSchema parsedSchema;
        try {
            parsedSchema =
                    (AvroSchema)
                            this.resolveParsedSchema(
                                    request.getSchema(), SchemaType.AVRO.name(), request.getSchemaReferences());
        } catch (Exception ex) {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryContentApiResponse(false, null, false, List.of(ex.getMessage()));
        }
        try {
            CommonSchemaUtils.validateSchemaContent(
                    parsedSchema, request.getContent(), ContentType.JSON.name());
        } catch (SchemaContentValidationException ex) {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryContentApiResponse(false, ex.getErrorMessages(), true, null);
        }
        return this.schemaRegistryValidatorResponseMapper()
                .validateSchemaRegistryContentApiResponse(true, null, true, null);
    }

    private ValidateSchemaRegistryContentApiResponse validateProtobufSchemaContent(
            ValidateSchemaRegistryContentRequest request) {
        ProtobufSchema parsedSchema;
        try {
            parsedSchema =
                    (ProtobufSchema)
                            this.resolveParsedSchema(
                                    request.getSchema(), SchemaType.PROTOBUF.name(), request.getSchemaReferences());
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            Throwable cause = ex.getCause();
            if (cause instanceof Descriptors.DescriptorValidationException) {
                errorMessages = List.of(cause.getMessage());
            }
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryContentApiResponse(false, null, false, errorMessages);
        }
        try {
            CommonSchemaUtils.validateSchemaContent(
                    parsedSchema, request.getContent(), ContentType.JSON.name());
        } catch (SchemaContentValidationException ex) {
            return this.schemaRegistryValidatorResponseMapper()
                    .validateSchemaRegistryContentApiResponse(false, ex.getErrorMessages(), true, null);
        }
        return this.schemaRegistryValidatorResponseMapper()
                .validateSchemaRegistryContentApiResponse(true, null, true, null);
    }

    public SchemaRegistryValidatorResponseMapper schemaRegistryValidatorResponseMapper() {
        return this.schemaRegistryResponseMapper.schemaRegistryValidatorResponseMapper();
    }

    public CachedSchemaRegistryClient currentSchemaRegistryClient() {
        return (CachedSchemaRegistryClient) this.clientsFactory.currentSchemaRegistryClient().client();
    }
}
