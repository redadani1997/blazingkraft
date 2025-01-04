package com.redadani1997.blazingkraft.consumer.deserializer;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.schemaregistry.CommonSchemaRegistryClient;
import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsumerDeserializerDeterminer {

    private final ClientsFactory clientsFactory;

    public CommonDeserializer determineKey(
            CommonSerde commonSerde,
            String schemaRegistryCode,
            Map<String, Object> serializerProps,
            String schema) {
        return this.determine(commonSerde, schemaRegistryCode, serializerProps, schema, true);
    }

    public CommonDeserializer determineValue(
            CommonSerde commonSerde,
            String schemaRegistryCode,
            Map<String, Object> serializerProps,
            String schema) {

        return this.determine(commonSerde, schemaRegistryCode, serializerProps, schema, false);
    }

    private CommonDeserializer determine(
            CommonSerde commonSerde,
            String schemaRegistryCode,
            Map<String, Object> serializerProps,
            String schema,
            boolean isKey) {
        return switch (commonSerde) {
            case LONG -> new ConsumerLongDeserializer();
            case STRING -> new ConsumerStringDeserializer();
            case DOUBLE -> new ConsumerDoubleDeserializer();
            case BASE64 -> new ConsumerBase64Deserializer();
            case NULL -> new ConsumerNullDeserializer();
            case JSON -> new ConsumerJsonDeserializer(isKey);
            case JSON_SCHEMA_REGISTRY ->
                    new ConsumerJsonSchemaRegistryDeserializer(
                            getSchemaRegistry(schemaRegistryCode), serializerProps, isKey);
            case AVRO_SCHEMA_REGISTRY ->
                    new ConsumerAvroSchemaRegistryDeserializer(
                            getSchemaRegistry(schemaRegistryCode), serializerProps, isKey);
            case PROTOBUF_SCHEMA_REGISTRY ->
                    new ConsumerProtobufSchemaRegistryDeserializer(
                            getSchemaRegistry(schemaRegistryCode), serializerProps, isKey);
            case JSON_SCHEMA -> new ConsumerJsonSchemaDeserializer(schema);
            case AVRO_SCHEMA -> new ConsumerAvroSchemaDeserializer(schema);
            case PROTOBUF_SCHEMA -> new ConsumerProtobufSchemaDeserializer(schema);
        };
    }

    private SchemaRegistryClient getSchemaRegistry(String schemaRegistryCode) {
        if (schemaRegistryCode == null) {
            throw new ProducerException(
                    "Schema registry code cannot be null when using a schema registry serializer");
        }

        CommonSchemaRegistryClient commonSchemaRegistryClient =
                this.clientsFactory.getSchemaRegistries().get(schemaRegistryCode);
        if (commonSchemaRegistryClient == null) {
            throw new ProducerException(
                    String.format("No Schema Registry found for code => '%s'!", schemaRegistryCode));
        }
        return commonSchemaRegistryClient.client();
    }
}
