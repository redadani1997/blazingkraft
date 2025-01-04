package com.redadani1997.blazingkraft.client.model.schemaregistry;

import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import lombok.Builder;

@Builder
public class CommonSchemaRegistryClient implements AutoCloseable {
    private CommonJmxClient jmxClient;
    private SchemaRegistryClient schemaRegistryClient;
    private String schemaRegistryCode;

    public CommonJmxClient jmx() {
        return this.jmxClient;
    }

    public SchemaRegistryClient client() {
        return this.schemaRegistryClient;
    }

    public String schemaRegistryCode() {
        return this.schemaRegistryCode;
    }

    @Override
    public void close() throws Exception {
        if (this.jmxClient != null) {
            this.jmxClient.close();
        }
    }
}
