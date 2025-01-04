package com.redadani1997.blazingkraft.client.model.cluster;

import com.redadani1997.blazingkraft.common.consumer.CommonDeserializer;
import java.util.Map;
import lombok.Builder;

@Builder
public class CommonConsumerClient {
    private String clusterCode;
    private String schemaRegistryCode;

    private Long pollTimeoutMs;

    private Map<String, Object> configuration;
    private Boolean perRequestKeyDeserializer;
    private CommonDeserializer keyDeserializer;
    private Boolean perRequestValueDeserializer;
    private CommonDeserializer valueDeserializer;

    public String clusterCode() {
        return this.clusterCode;
    }

    public String schemaRegistryCode() {
        return this.schemaRegistryCode;
    }

    public Boolean perRequestKeyDeserializer() {
        return this.perRequestKeyDeserializer;
    }

    public Boolean perRequestValueDeserializer() {
        return this.perRequestValueDeserializer;
    }

    public CommonDeserializer keyDeserializer() {
        return this.keyDeserializer;
    }

    public CommonDeserializer valueDeserializer() {
        return this.valueDeserializer;
    }

    public Map<String, Object> configuration() {
        return this.configuration;
    }

    public Long pollTimeoutMs() {
        return this.pollTimeoutMs;
    }
}
