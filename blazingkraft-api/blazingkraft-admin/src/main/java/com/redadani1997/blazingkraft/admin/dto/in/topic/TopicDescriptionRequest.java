package com.redadani1997.blazingkraft.admin.dto.in.topic;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TopicDescriptionRequest {
    private String topicName;
}
