package com.redadani1997.blazingkraft.admin.dto.in.consumer_group;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ConsumerGroupsDescriptionRequest {
    private List<String> consumerGroups;
    private Boolean includeAuthorizedOperations;
}
