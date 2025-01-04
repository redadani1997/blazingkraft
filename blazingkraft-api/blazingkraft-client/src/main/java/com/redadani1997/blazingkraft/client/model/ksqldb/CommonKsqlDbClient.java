package com.redadani1997.blazingkraft.client.model.ksqldb;

import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import io.confluent.ksql.api.client.Client;
import lombok.Builder;

@Builder
public class CommonKsqlDbClient implements AutoCloseable {
    private CommonJmxClient jmxClient;

    private Client ksqlDbClient;

    private String ksqlDbCode;

    public CommonJmxClient jmx() {
        return this.jmxClient;
    }

    public Client client() {
        return this.ksqlDbClient;
    }

    public String ksqlDbCode() {
        return this.ksqlDbCode;
    }

    @Override
    public void close() throws Exception {
        if (this.jmxClient != null) {
            this.jmxClient.close();
        }
        if (this.ksqlDbClient != null) {
            this.ksqlDbClient.close();
        }
    }
}
