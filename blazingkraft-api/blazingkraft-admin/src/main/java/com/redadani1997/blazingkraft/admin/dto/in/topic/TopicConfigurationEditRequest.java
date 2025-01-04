package com.redadani1997.blazingkraft.admin.dto.in.topic;

import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TopicConfigurationEditRequest {
    private String topicName;
    private Map<String, String> configuration;
}
