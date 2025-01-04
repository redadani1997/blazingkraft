package com.redadani1997.blazingkraft.admin.dto.in.offset;

import java.util.Set;
import lombok.Builder;
import lombok.Data;
import org.apache.kafka.common.TopicPartition;

@Data
@Builder
public class OffsetConsumerGroupDeleteRequest {

    private String consumerGroup;
    private Set<TopicPartition> topicPartitions;
}
