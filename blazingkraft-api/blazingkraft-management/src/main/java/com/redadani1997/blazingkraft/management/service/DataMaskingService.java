package com.redadani1997.blazingkraft.management.service;

import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingApiResponse;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingEditRequest;
import java.util.List;

public interface DataMaskingService {
    DataMaskingApiResponse createDataMasking(DataMaskingCreateRequest request);

    void deleteDataMasking(DataMaskingDeleteRequest request);

    DataMaskingApiResponse editDataMasking(DataMaskingEditRequest request);

    List<DataMaskingApiResponse> getAllDataMaskings();
}
