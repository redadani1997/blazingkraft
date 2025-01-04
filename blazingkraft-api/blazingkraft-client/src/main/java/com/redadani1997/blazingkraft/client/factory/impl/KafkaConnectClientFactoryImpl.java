package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.KafkaConnectClientFactory;
import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import com.redadani1997.blazingkraft.common.rest.client.impl.CommonBasicAuthRestTemplate;
import com.redadani1997.blazingkraft.common.rest.client.impl.CommonNoAuthRestTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaConnectClientFactoryImpl implements KafkaConnectClientFactory {

    @Override
    public CommonRestClient createKafkaConnectClient(
            String url, Boolean basicAuthEnabled, String basicAuthUsername, String basicAuthPassword) {
        if (basicAuthEnabled) {
            return new CommonBasicAuthRestTemplate(url, basicAuthUsername, basicAuthPassword);
        } else {
            return new CommonNoAuthRestTemplate(url);
        }
    }
}
