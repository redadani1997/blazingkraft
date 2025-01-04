package com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BlazingConsumptionRequest {
    private Integer resultsSize;
    private String clusterCode;
    private List<String> topics;
    private String keySchema;
    private String valueSchema;

    private ConsumerAdditionalConfigurationRequest consumerAdditionalConfigurationRequest;

    private ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest;
}
