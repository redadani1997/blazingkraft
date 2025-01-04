package com.redadani1997.blazingkraft.consumer.mapper.out.blazing_consumer;

import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionMetadataResponse;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionPayloadResponse;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import com.redadani1997.blazingkraft.consumer.utils.ConsumerUtils;
import java.util.Map;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.stereotype.Component;

@Component
public class BlazingConsumerResponseMapper {
    public BlazingConsumptionResponse blazingConsumptionResponse(
            Integer id,
            ConsumerRecord record,
            BlazingConsumptionPayloadResponse key,
            BlazingConsumptionPayloadResponse value) {
        BlazingConsumptionResponse response = new BlazingConsumptionResponse();

        BlazingConsumptionMetadataResponse metadata =
                BlazingConsumptionMetadataResponse.builder()
                        .topic(record.topic())
                        .partition(record.partition())
                        .offset(record.offset())
                        .timestamp(record.timestamp())
                        .timestampType(record.timestampType())
                        .serializedKeySize(record.serializedKeySize())
                        .serializedValueSize(record.serializedValueSize())
                        .leaderEpoch(record.leaderEpoch().orElse(null))
                        .build();

        Map<String, Object> headers = ConsumerUtils.mapFromHeaders(record.headers());

        response.setId(id);
        response.setMetadata(metadata);
        response.setHeaders(headers);
        response.setKey(key);
        response.setValue(value);

        return response;
    }
}
