package com.redadani1997.blazingkraft.admin.dto.in.offset;

import java.util.Map;
import lombok.Data;
import org.apache.kafka.clients.admin.OffsetSpec;
import org.apache.kafka.common.IsolationLevel;
import org.apache.kafka.common.TopicPartition;

@Data
public class OffsetsListRequest {

    private Map<TopicPartition, OffsetSpec> topicPartitionOffsets;

    private IsolationLevel isolationLevel;
}
