package com.redadani1997.blazingkraft.admin.dto.in.cluster;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ClusterExportRequest {
    private String code;
}
