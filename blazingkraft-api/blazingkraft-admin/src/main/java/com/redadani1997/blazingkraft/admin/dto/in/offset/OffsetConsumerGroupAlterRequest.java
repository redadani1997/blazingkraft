package com.redadani1997.blazingkraft.admin.dto.in.offset;

import java.util.Map;
import lombok.Data;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;

@Data
public class OffsetConsumerGroupAlterRequest {

    private String groupId;

    private Map<TopicPartition, OffsetAndMetadata> offsetsByTopicPartition;
}
