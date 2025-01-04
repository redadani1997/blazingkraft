package com.redadani1997.blazingkraft.client.factory;

import io.confluent.ksql.api.client.Client;

public interface KsqlDbClientFactory {

    Client createKsqlDbClient(
            String host,
            Integer port,
            Boolean basicAuthEnabled,
            String basicAuthUsername,
            String basicAuthPassword,
            Boolean keyStoreEnabled,
            String keyStore,
            String keyStorePassword,
            Boolean trustStoreEnabled,
            String trustStore,
            String trustStorePassword,
            Boolean useTls,
            Boolean verifyHost,
            Boolean useAlpn,
            Integer executeQueryMaxResultRows);
}
