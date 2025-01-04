package com.redadani1997.blazingkraft.producer.service;

import com.redadani1997.blazingkraft.producer.dto.in.producer_configuration.ProducerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerConfigurationApiResponse;

public interface ProducerConfigurationService {
    ProducerConfigurationApiResponse updateProducerConfiguration(
            ProducerConfigurationUpdateRequest updateProducerConfigurationRequest);

    ProducerCompleteConfigurationApiResponse getProducerCompleteConfiguration();

    ProducerConfigurationApiResponse getProducerConfiguration();
}
