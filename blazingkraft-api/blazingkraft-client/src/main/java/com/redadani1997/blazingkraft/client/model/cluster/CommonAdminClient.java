package com.redadani1997.blazingkraft.client.model.cluster;

import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import lombok.Builder;
import org.apache.kafka.clients.admin.Admin;

@Builder
public class CommonAdminClient implements AutoCloseable {
    private CommonJmxClient jmxClient;

    private Admin adminClient;

    private String clusterCode;

    public CommonJmxClient jmx() {
        return this.jmxClient;
    }

    public Admin client() {
        return this.adminClient;
    }

    public String clusterCode() {
        return this.clusterCode;
    }

    @Override
    public void close() throws Exception {
        if (this.jmxClient != null) {
            this.jmxClient.close();
        }
        if (this.adminClient != null) {
            this.adminClient.close(Duration.of(1, ChronoUnit.SECONDS));
        }
    }
}
