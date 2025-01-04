package com.redadani1997.blazingkraft.client.factory;

import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import java.util.Map;

public interface SchemaRegistryClientFactory {
    SchemaRegistryClient createSchemaRegistryClient(
            String schemaRegistryUrls, Integer schemasCacheSize, Map<String, Object> configuration);
}
