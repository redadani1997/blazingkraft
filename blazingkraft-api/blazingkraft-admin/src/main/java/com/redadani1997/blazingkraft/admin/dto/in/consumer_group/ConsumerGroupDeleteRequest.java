package com.redadani1997.blazingkraft.admin.dto.in.consumer_group;

import java.util.Collection;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ConsumerGroupDeleteRequest {
    Collection<String> consumerGroups;
}
