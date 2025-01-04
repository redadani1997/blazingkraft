package com.redadani1997.blazingkraft.admin.dto.in.quota;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.quota.ClientQuotaFilter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuotaDescribeRequest {
    private ClientQuotaFilter filter;
}
