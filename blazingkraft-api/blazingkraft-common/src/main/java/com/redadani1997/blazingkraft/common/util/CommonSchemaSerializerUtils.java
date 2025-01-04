package com.redadani1997.blazingkraft.common.util;

import com.google.protobuf.Message;
import com.redadani1997.blazingkraft.common.enums.SchemaType;
import com.redadani1997.blazingkraft.error.common.SchemaParseException;
import com.redadani1997.blazingkraft.error.common.SchemaSerializationException;
import io.confluent.kafka.schemaregistry.ParsedSchema;
import io.confluent.kafka.schemaregistry.avro.AvroSchema;
import io.confluent.kafka.serializers.NonRecordContainer;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import lombok.experimental.UtilityClass;
import org.apache.avro.Schema;
import org.apache.avro.io.BinaryEncoder;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.specific.SpecificDatumWriter;
import org.apache.kafka.common.errors.SerializationException;

@UtilityClass
public class CommonSchemaSerializerUtils {
    private static final EncoderFactory encoderFactory = EncoderFactory.get();

    public static byte[] serializeWithSchema(Object computedObject, ParsedSchema parsedSchema)
            throws SchemaParseException {
        if (computedObject == null) {
            return null;
        }
        String schemaType = parsedSchema.schemaType();
        try {
            if (SchemaType.JSON.name().equals(parsedSchema.schemaType())) {
                return serializeJson(computedObject);
            } else if (SchemaType.AVRO.name().equals(schemaType)) {
                return serializeAvro(computedObject, (AvroSchema) parsedSchema);
            } else if (SchemaType.PROTOBUF.name().equals(schemaType)) {
                return serializeProtobuf(computedObject);
            } else {
                throw new SchemaSerializationException("Unsupported schema type: " + schemaType);
            }
        } catch (Exception ex) {
            throw new SchemaSerializationException(
                    String.format("Failed to serialize object to '%s': %s", schemaType, ex.getMessage()));
        }
    }

    private static byte[] serializeJson(Object computedObject) {
        String jsonString = (String) computedObject;
        return CommonByteUtils.toByteArray(jsonString);
    }

    private static byte[] serializeAvro(Object computedObject, AvroSchema avroSchema)
            throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Object value =
                computedObject instanceof NonRecordContainer
                        ? ((NonRecordContainer) computedObject).getValue()
                        : computedObject;
        Schema rawSchema = avroSchema.rawSchema();
        if (rawSchema.getType().equals(Schema.Type.BYTES)) {
            if (value instanceof byte[]) {
                out.write((byte[]) value);
            } else if (value instanceof ByteBuffer) {
                out.write(((ByteBuffer) value).array());
            } else {
                throw new SerializationException(
                        "Unrecognized bytes object of type: " + value.getClass().getName());
            }
        } else {
            writeDatum(out, value, rawSchema);
        }
        byte[] bytes = out.toByteArray();
        out.close();
        return bytes;
    }

    private static byte[] serializeProtobuf(Object computedObject) {
        Message message = (Message) computedObject;
        return message.toByteArray();
    }

    private static void writeDatum(ByteArrayOutputStream out, Object value, Schema rawSchema)
            throws IOException {
        BinaryEncoder encoder = encoderFactory.directBinaryEncoder(out, null);
        DatumWriter<Object> writer;
        writer = new SpecificDatumWriter<>(rawSchema);
        writer.write(value, encoder);
        encoder.flush();
    }
}
