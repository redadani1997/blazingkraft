package com.redadani1997.blazingkraft.producer.service;

import com.redadani1997.blazingkraft.producer.dto.in.producer_import.ProducerImportRecordsRequest;
import com.redadani1997.blazingkraft.producer.openapi.model.BlazingProductionMetadataOrErrorApiResponse;
import java.util.List;

public interface ProducerImportService {

    List<BlazingProductionMetadataOrErrorApiResponse> importProducerRecords(
            ProducerImportRecordsRequest request);
}
