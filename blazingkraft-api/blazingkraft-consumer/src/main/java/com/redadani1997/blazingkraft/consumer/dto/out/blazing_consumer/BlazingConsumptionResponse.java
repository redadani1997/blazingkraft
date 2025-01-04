package com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BlazingConsumptionResponse {
    private Integer id;
    private BlazingConsumptionMetadataResponse metadata;

    private Map<String, Object> headers;
    private BlazingConsumptionPayloadResponse key;
    private BlazingConsumptionPayloadResponse value;
}
