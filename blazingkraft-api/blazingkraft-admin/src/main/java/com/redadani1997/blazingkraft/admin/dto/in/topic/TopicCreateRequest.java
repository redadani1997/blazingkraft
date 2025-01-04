package com.redadani1997.blazingkraft.admin.dto.in.topic;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.clients.admin.NewTopic;

@Data
@NoArgsConstructor
public class TopicCreateRequest {

    private NewTopic newTopic;
}
