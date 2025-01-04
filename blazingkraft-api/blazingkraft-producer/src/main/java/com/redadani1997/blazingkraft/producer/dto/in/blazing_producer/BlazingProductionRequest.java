package com.redadani1997.blazingkraft.producer.dto.in.blazing_producer;

import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BlazingProductionRequest {
    private String topic;
    private Integer partition;
    private String key;
    private String keySchema;
    private String value;
    private String valueSchema;
    private Map<String, Object> headers;

    private ProducerAdditionalConfigurationRequest producerAdditionalConfigurationRequest;
}
