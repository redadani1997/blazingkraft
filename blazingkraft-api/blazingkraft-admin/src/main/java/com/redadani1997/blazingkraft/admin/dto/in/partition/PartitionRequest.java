package com.redadani1997.blazingkraft.admin.dto.in.partition;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PartitionRequest {
    private int partition;

    private String topic;
}
