package com.redadani1997.blazingkraft.client.factory;

import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;

public interface KafkaConnectClientFactory {
    CommonRestClient createKafkaConnectClient(
            String url, Boolean basicAuthEnabled, String basicAuthUsername, String basicAuthPassword);
}
