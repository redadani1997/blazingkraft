package com.redadani1997.blazingkraft.common.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.protobuf.Descriptors;
import com.google.protobuf.DynamicMessage;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import com.redadani1997.blazingkraft.common.enums.ContentType;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.error.common.SchemaDeserializationException;
import com.redadani1997.blazingkraft.error.common.SchemaJsonStringException;
import com.redadani1997.blazingkraft.error.common.SchemaParseException;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.schemaregistry.avro.AvroSchema;
import io.confluent.kafka.schemaregistry.avro.AvroSchemaUtils;
import io.confluent.kafka.schemaregistry.json.JsonSchema;
import io.confluent.kafka.schemaregistry.protobuf.ProtobufSchema;
import java.io.IOException;
import lombok.experimental.UtilityClass;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.Decoder;
import org.apache.avro.io.DecoderFactory;
import org.jetbrains.annotations.NotNull;

@UtilityClass
public class CommonSchemaDeserializerUtils {

    public static String toJsonString(Object computedObject, String schemaType) {
        if (computedObject == null) {
            return null;
        }
        try {
            if (SchemaType.JSON.name().equals(schemaType)) {
                if (computedObject instanceof JsonNode convertedJsonNode) {
                    return convertedJsonNode.toString();
                }
                if (computedObject instanceof String convertedString) {
                    return convertedString;
                }
                return CommonCastingUtils.toJsonString(computedObject);
            } else if (SchemaType.AVRO.name().equals(schemaType)) {
                if (computedObject instanceof GenericData.Record convertedGenericData) {
                    return convertedGenericData.toString();
                }
                return CommonByteUtils.toString(AvroSchemaUtils.toJson(computedObject));
            } else if (SchemaType.PROTOBUF.name().equals(schemaType)) {
                if (computedObject instanceof Message convertedMessage) {
                    return JsonFormat.printer().print(convertedMessage);
                }
                return CommonCastingUtils.toJsonString(computedObject);
            } else {
                throw new SchemaJsonStringException("Unsupported schema type: " + schemaType);
            }
        } catch (Exception ex) {
            Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
            throw new SchemaJsonStringException(
                    String.format("Error while converting to json stringifying => '%s'", cause.getMessage()));
        }
    }

    public static Object deserializeWithSchema(byte[] content, ParsedSchema parsedSchema)
            throws SchemaParseException {
        String schemaType = parsedSchema.schemaType();
        try {
            if (SchemaType.JSON.name().equals(schemaType)) {
                return deserializeJson(content, (JsonSchema) parsedSchema);
            } else if (SchemaType.AVRO.name().equals(schemaType)) {
                return deserializeAvro(content, (AvroSchema) parsedSchema);
            } else if (SchemaType.PROTOBUF.name().equals(schemaType)) {
                return deserializeProtobuf(content, (ProtobufSchema) parsedSchema);
            } else {
                throw new SchemaDeserializationException("Unsupported schema type: " + schemaType);
            }
        } catch (Exception ex) {
            throw new SchemaDeserializationException(
                    String.format("Failed to deserialize content to '%s': %s", schemaType, ex.getMessage()));
        }
    }

    private static Object deserializeJson(byte[] content, JsonSchema jsonSchema) {
        String jsonContent = CommonByteUtils.toString(content);
        return CommonSchemaUtils.validateSchemaContent(
                jsonSchema, jsonContent, ContentType.JSON.name());
    }

    private static GenericRecord deserializeAvro(byte[] content, AvroSchema avroSchema)
            throws IOException {
        Schema schema = avroSchema.rawSchema();
        DatumReader<GenericRecord> datumReader = new GenericDatumReader<>(schema);
        Decoder decoder = DecoderFactory.get().binaryDecoder(content, null);
        return datumReader.read(null, decoder);
    }

    @NotNull
    private static DynamicMessage deserializeProtobuf(byte[] content, ProtobufSchema protobufSchema)
            throws InvalidProtocolBufferException {
        Descriptors.Descriptor descriptor = protobufSchema.toDescriptor();
        if (descriptor == null) {
            throw new SchemaDeserializationException(
                    "Could not find descriptor with name " + protobufSchema.name());
        }
        return DynamicMessage.parseFrom(descriptor, content);
    }
}
