package com.redadani1997.blazingkraft.admin.dto.in.topic;

import java.util.Collection;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TopicDeleteRequest {
    Collection<String> topicNames;
}
