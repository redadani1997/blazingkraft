package com.redadani1997.blazingkraft.common.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.protobuf.Descriptors;
import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.error.common.CastingException;
import com.redadani1997.blazingkraft.error.common.SchemaContentValidationException;
import com.redadani1997.blazingkraft.error.common.SchemaParseException;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.schemaregistry.avro.AvroSchema;
import io.confluent.kafka.schemaregistry.avro.AvroSchemaUtils;
import io.confluent.kafka.schemaregistry.json.JsonSchema;
import io.confluent.kafka.schemaregistry.json.JsonSchemaUtils;
import io.confluent.kafka.schemaregistry.protobuf.ProtobufSchema;
import io.confluent.kafka.schemaregistry.protobuf.ProtobufSchemaUtils;
import java.util.List;
import lombok.experimental.UtilityClass;
import org.everit.json.schema.ValidationException;
import org.openapi4j.schema.validator.v3.SchemaValidator;

@UtilityClass
public class CommonSchemaUtils {

    public static ParsedSchema parseSchema(String schemaString, String schemaType)
            throws SchemaParseException {
        try {
            ParsedSchema parsedSchema;
            if (SchemaType.JSON.name().equals(schemaType)) {
                parsedSchema = new JsonSchema(schemaString);
            } else if (SchemaType.AVRO.name().equals(schemaType)) {
                parsedSchema = new AvroSchema(schemaString);
            } else if (SchemaType.PROTOBUF.name().equals(schemaType)) {
                parsedSchema = new ProtobufSchema(schemaString);
            } else {
                throw new SchemaParseException("Unsupported schema type: " + schemaType);
            }

            parsedSchema.validate();

            return parsedSchema;
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            Throwable cause = ex.getCause();
            if (cause instanceof Descriptors.DescriptorValidationException) {
                errorMessages = List.of(cause.getMessage());
            }

            throw new SchemaParseException(errorMessages);
        }
    }

    public static Object validateSchemaContent(
            ParsedSchema parsedSchema, String content, String contentType)
            throws SchemaContentValidationException {
        try {
            String jsonContent;
            if (ContentType.JSON.name().equals(contentType)) {
                jsonContent = content;
            } else if (ContentType.YAML.name().equals(contentType)) {
                jsonContent = CommonCastingUtils.yamlStringToJsonString(content);
            } else {
                throw new SchemaContentValidationException("Unsupported content type: " + contentType);
            }

            if (parsedSchema instanceof JsonSchema jsonSchema) {
                return JsonSchemaUtils.toObject(jsonContent, jsonSchema);
            } else if (parsedSchema instanceof AvroSchema avroSchema) {
                return AvroSchemaUtils.toObject(jsonContent, avroSchema);
            } else if (parsedSchema instanceof ProtobufSchema protobufSchema) {
                return ProtobufSchemaUtils.toObject(jsonContent, protobufSchema);
            } else {
                throw new SchemaContentValidationException(parsedSchema.schemaType());
            }
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            if (ex instanceof ValidationException validationException) {
                errorMessages = validationException.getAllMessages();
            }

            throw new SchemaContentValidationException(errorMessages);
        }
    }

    // OPENAPI
    public SchemaValidator parseOpenApiSchema(String schemaString, String schemaType)
            throws SchemaParseException {
        try {
            String jsonSchemaString;
            if (SchemaType.OPENAPI_JSON.name().equals(schemaType)) {
                jsonSchemaString = schemaString;
            } else if (SchemaType.OPENAPI_YAML.name().equals(schemaType)) {
                jsonSchemaString = CommonCastingUtils.yamlStringToJsonString(schemaString);
            } else {
                throw new SchemaParseException("Unsupported schema type: " + schemaType);
            }
            JsonNode schemaNode = CommonCastingUtils.toJsonNode(jsonSchemaString);
            return new SchemaValidator(null, schemaNode);
        } catch (CastingException ex) {
            Throwable cause = ex.getCause() == null ? ex : ex.getCause();
            List<String> errorMessages = List.of(cause.getMessage());
            throw new SchemaParseException(errorMessages);
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            throw new SchemaParseException(errorMessages);
        }
    }

    public Object validateOpenApiSchemaContent(
            SchemaValidator schemaValidator, String content, String contentType)
            throws SchemaContentValidationException {
        try {
            String jsonContent;
            if (ContentType.JSON.name().equals(contentType)) {
                jsonContent = content;
            } else if (ContentType.YAML.name().equals(contentType)) {
                jsonContent = CommonCastingUtils.yamlStringToJsonString(content);
            } else {
                throw new SchemaContentValidationException("Unsupported content type: " + contentType);
            }
            JsonNode contentNode = CommonCastingUtils.toJsonNode(jsonContent);
            schemaValidator.validate(contentNode);
            return contentNode;
        } catch (ValidationException ex) {
            List<String> errorMessages = ex.getAllMessages();
            throw new SchemaContentValidationException(errorMessages);
        } catch (Exception ex) {
            List<String> errorMessages = List.of(ex.getMessage());
            throw new SchemaContentValidationException(errorMessages);
        }
    }
}
