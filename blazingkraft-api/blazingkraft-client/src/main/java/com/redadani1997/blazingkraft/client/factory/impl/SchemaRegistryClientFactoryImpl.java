package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.SchemaRegistryClientFactory;
import com.redadani1997.blazingkraft.client.validator.SchemaRegistryClientConfigurationValidator;
import io.confluent.kafka.schemaregistry.SchemaProvider;
import io.confluent.kafka.schemaregistry.avro.AvroSchemaProvider;
import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.schemaregistry.json.JsonSchemaProvider;
import io.confluent.kafka.schemaregistry.protobuf.ProtobufSchemaProvider;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class SchemaRegistryClientFactoryImpl implements SchemaRegistryClientFactory {
    private final SchemaRegistryClientConfigurationValidator
            schemaRegistryClientConfigurationValidator;

    public SchemaRegistryClientFactoryImpl(
            SchemaRegistryClientConfigurationValidator schemaRegistryClientConfigurationValidator) {
        this.schemaRegistryClientConfigurationValidator = schemaRegistryClientConfigurationValidator;
    }

    @Override
    public SchemaRegistryClient createSchemaRegistryClient(
            String schemaRegistryUrls, Integer schemasCacheSize, Map<String, Object> configuration) {
        Map<String, Object> computedConfiguration =
                this.schemaRegistryClientConfigurationValidator.validateAndCompute(configuration);

        List<SchemaProvider> providers =
                List.of(new AvroSchemaProvider(), new JsonSchemaProvider(), new ProtobufSchemaProvider());

        return new CachedSchemaRegistryClient(
                schemaRegistryUrls, schemasCacheSize, providers, computedConfiguration);
    }
}
