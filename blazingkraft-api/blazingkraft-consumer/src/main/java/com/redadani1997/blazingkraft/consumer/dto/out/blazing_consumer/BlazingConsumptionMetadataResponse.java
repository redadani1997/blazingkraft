package com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.kafka.common.record.TimestampType;

@Data
@Builder
@AllArgsConstructor
public class BlazingConsumptionMetadataResponse {
    private final String topic;
    private final int partition;
    private final long offset;
    private final long timestamp;
    private final TimestampType timestampType;
    private final int serializedKeySize;
    private final int serializedValueSize;
    private final Object leaderEpoch;
}
