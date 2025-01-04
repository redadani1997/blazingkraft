package com.redadani1997.blazingkraft.producer.serializer;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.schemaregistry.CommonSchemaRegistryClient;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProducerSerializerDeterminer {

    private final ClientsFactory clientsFactory;

    public CommonSerializer determineKey(
            CommonSerde commonSerde, String schemaRegistryCode, Map<String, Object> serializerProps) {
        return this.determine(commonSerde, schemaRegistryCode, serializerProps, true);
    }

    public CommonSerializer determineValue(
            CommonSerde commonSerde, String schemaRegistryCode, Map<String, Object> serializerProps) {

        return this.determine(commonSerde, schemaRegistryCode, serializerProps, false);
    }

    private CommonSerializer determine(
            CommonSerde commonSerde,
            String schemaRegistryCode,
            Map<String, Object> serializerProps,
            boolean isKey) {
        return switch (commonSerde) {
            case LONG -> new ProducerLongSerializer();
            case STRING -> new ProducerStringSerializer();
            case DOUBLE -> new ProducerDoubleSerializer();
            case BASE64 -> new ProducerBase64Serializer();
            case NULL -> new ProducerNullSerializer();
            case JSON -> new ProducerJsonSerializer();
            case JSON_SCHEMA_REGISTRY ->
                    new ProducerJsonSchemaRegistrySerializer(
                            getSchemaRegistry(schemaRegistryCode), serializerProps, isKey);
            case AVRO_SCHEMA_REGISTRY ->
                    new ProducerAvroSchemaRegistrySerializer(
                            getSchemaRegistry(schemaRegistryCode), serializerProps, isKey);
            case PROTOBUF_SCHEMA_REGISTRY ->
                    new ProducerProtobufSchemaRegistrySerializer(
                            getSchemaRegistry(schemaRegistryCode), serializerProps, isKey);
            case JSON_SCHEMA -> new ProducerJsonSchemaSerializer();
            case AVRO_SCHEMA -> new ProducerAvroSchemaSerializer();
            case PROTOBUF_SCHEMA -> new ProducerProtobufSchemaSerializer();
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
