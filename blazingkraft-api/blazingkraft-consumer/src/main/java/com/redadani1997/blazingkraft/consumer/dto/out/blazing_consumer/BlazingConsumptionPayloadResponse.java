package com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BlazingConsumptionPayloadResponse {
    private String payload;
    private Boolean succeeded;
    private String errorMessage;
}
