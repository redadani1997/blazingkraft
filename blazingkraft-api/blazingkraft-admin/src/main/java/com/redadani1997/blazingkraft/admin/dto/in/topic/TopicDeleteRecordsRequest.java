package com.redadani1997.blazingkraft.admin.dto.in.topic;

import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import org.apache.kafka.clients.admin.RecordsToDelete;
import org.apache.kafka.common.TopicPartition;

@Builder
@Getter
public class TopicDeleteRecordsRequest {
    private Map<TopicPartition, RecordsToDelete> recordsToDelete;
}
