package com.redadani1997.blazingkraft.admin.dto.in.topic;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopicsDescriptionRequest {
    private List<String> topicNames;
}
