package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaDescribeRequest;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaDescribeApiResponse;
import java.util.List;

public interface QuotaService {
    void alterQuotas(QuotaAlterRequest request);

    List<QuotaDescribeApiResponse> describeQuotas(QuotaDescribeRequest request);
}
