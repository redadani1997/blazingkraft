package com.redadani1997.blazingkraft.consumer.service;

import com.redadani1997.blazingkraft.consumer.dto.in.consumer_configuration.ConsumerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerConfigurationApiResponse;

public interface ConsumerConfigurationService {
    ConsumerConfigurationApiResponse updateConsumerConfiguration(
            ConsumerConfigurationUpdateRequest request);

    ConsumerCompleteConfigurationApiResponse getConsumerCompleteConfiguration();

    ConsumerConfigurationApiResponse getConsumerConfiguration();
}
