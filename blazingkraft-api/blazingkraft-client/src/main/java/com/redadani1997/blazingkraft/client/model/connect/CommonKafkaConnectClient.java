package com.redadani1997.blazingkraft.client.model.connect;

import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import lombok.Builder;
import org.springframework.web.client.RestTemplate;

@Builder
public class CommonKafkaConnectClient implements AutoCloseable {
    private CommonJmxClient jmxClient;
    private final CommonRestClient restClient;
    private final String kafkaConnectCode;

    public CommonJmxClient jmx() {
        return this.jmxClient;
    }

    public RestTemplate restTemplate() {
        return this.restClient.restTemplate();
    }

    public String kafkaConnectCode() {
        return this.kafkaConnectCode;
    }

    @Override
    public void close() throws Exception {
        if (this.jmxClient != null) {
            this.jmxClient.close();
        }
    }
}
