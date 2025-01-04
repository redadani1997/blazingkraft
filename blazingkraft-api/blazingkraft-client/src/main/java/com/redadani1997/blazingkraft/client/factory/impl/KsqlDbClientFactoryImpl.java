package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.KsqlDbClientFactory;
import io.confluent.ksql.api.client.Client;
import io.confluent.ksql.api.client.ClientOptions;
import org.springframework.stereotype.Component;

@Component
public class KsqlDbClientFactoryImpl implements KsqlDbClientFactory {

    @Override
    public Client createKsqlDbClient(
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
            Integer executeQueryMaxResultRows) {

        ClientOptions options = ClientOptions.create().setHost(host).setPort(port);

        if (basicAuthEnabled != null && basicAuthEnabled) {
            options.setBasicAuthCredentials(basicAuthUsername, basicAuthPassword);
        }
        if (keyStoreEnabled != null && keyStoreEnabled) {
            options.setKeyStore(keyStore);
            options.setKeyStorePassword(keyStorePassword);
        }
        if (trustStoreEnabled != null && trustStoreEnabled) {
            options.setTrustStore(trustStore);
            options.setTrustStorePassword(trustStorePassword);
        }
        if (useTls != null && useTls) {
            options.setUseTls(true);
        }
        if (verifyHost != null && verifyHost) {
            options.setVerifyHost(true);
        }
        if (useAlpn != null && useAlpn) {
            options.setUseAlpn(true);
        }
        if (executeQueryMaxResultRows != null) {
            options.setExecuteQueryMaxResultRows(executeQueryMaxResultRows);
        }

        return Client.create(options);
    }
}
