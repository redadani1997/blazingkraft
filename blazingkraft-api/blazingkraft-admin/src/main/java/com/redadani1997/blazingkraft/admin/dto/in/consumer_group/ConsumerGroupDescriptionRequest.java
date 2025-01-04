package com.redadani1997.blazingkraft.admin.dto.in.consumer_group;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ConsumerGroupDescriptionRequest {
    private String consumerGroup;

    private Boolean includeAuthorizedOperations;
}
