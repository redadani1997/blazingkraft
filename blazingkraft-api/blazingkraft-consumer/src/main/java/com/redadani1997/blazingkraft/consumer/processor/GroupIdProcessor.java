package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import java.time.Duration;
import java.util.Map;
import java.util.Set;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;

public class GroupIdProcessor implements ConsumerProcessor {

    private String groupId;
    private Integer resultsSize;

    public GroupIdProcessor(
            ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest, Integer resultsSize) {
        String groupIdFilter = consumerAdditionalFiltersRequest.getGroupIdFilter();
        if (groupIdFilter != null && !groupIdFilter.isBlank()) {
            this.groupId = groupIdFilter;
            this.resultsSize = resultsSize;
        }
    }

    @Override
    public void preProcess(Map<String, Object> overrides) {
        if (this.groupId != null) {
            overrides.put("group.id", this.groupId);
            overrides.put("enable.auto.commit", true);
            if (this.resultsSize > 0) {
                overrides.put("max.poll.records", this.resultsSize);
            }
        }
    }

    @Override
    public void postProcess(Consumer<byte[], byte[]> consumer) {
        if (this.groupId != null) {
            consumer.enforceRebalance("Blazing KRaft consumer member joined the group");
            consumer.poll(Duration.ZERO);

            Set<TopicPartition> assignment = consumer.assignment();
            Map<TopicPartition, OffsetAndMetadata> committed = consumer.committed(assignment);
            Map<TopicPartition, Long> beginningOffsets = consumer.beginningOffsets(assignment);

            for (TopicPartition topicPartition : consumer.assignment()) {
                OffsetAndMetadata offsetAndMetadata = committed.get(topicPartition);
                if (offsetAndMetadata != null) {
                    consumer.seek(topicPartition, offsetAndMetadata.offset());
                } else {
                    consumer.seek(topicPartition, beginningOffsets.get(topicPartition));
                }
            }
        }
    }
}
