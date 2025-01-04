package com.redadani1997.blazingkraft.common.application_event;

import lombok.Data;

@Data
public class ClusterDeletedApplicationEvent {
    private final String clusterCode;
}
