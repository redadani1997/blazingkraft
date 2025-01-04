package com.redadani1997.blazingkraft.producer.service;

import com.redadani1997.blazingkraft.producer.dto.in.blazing_producer.BlazingProductionRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionApiResponse;

public interface BlazingProducerService {

    BlazingProductionApiResponse producerBlazingRecord(BlazingProductionRequest request);
}
