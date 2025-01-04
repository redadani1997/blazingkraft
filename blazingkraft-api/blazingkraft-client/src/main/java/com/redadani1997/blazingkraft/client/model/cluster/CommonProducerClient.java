package com.redadani1997.blazingkraft.client.model.cluster;

import com.redadani1997.blazingkraft.common.producer.CommonSerializer;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import lombok.Builder;
import org.apache.kafka.clients.producer.Producer;

@Builder
public class CommonProducerClient implements AutoCloseable {
    private Producer<byte[], byte[]> producerClient;

    private String clusterCode;
    private String schemaRegistryCode;

    private Boolean perRequestKeySerializer;
    private CommonSerializer keySerializer;
    private Boolean perRequestValueSerializer;
    private CommonSerializer valueSerializer;

    public Producer<byte[], byte[]> client() {
        return this.producerClient;
    }

    public String clusterCode() {
        return this.clusterCode;
    }

    public String schemaRegistryCode() {
        return this.schemaRegistryCode;
    }

    public Boolean perRequestKeySerializer() {
        return this.perRequestKeySerializer;
    }

    public Boolean perRequestValueSerializer() {
        return this.perRequestValueSerializer;
    }

    public CommonSerializer keySerializer() {
        return this.keySerializer;
    }

    public CommonSerializer valueSerializer() {
        return this.valueSerializer;
    }

    @Override
    public void close() {
        if (this.producerClient != null) {
            this.producerClient.close(Duration.of(1, ChronoUnit.SECONDS));
        }
    }
}
