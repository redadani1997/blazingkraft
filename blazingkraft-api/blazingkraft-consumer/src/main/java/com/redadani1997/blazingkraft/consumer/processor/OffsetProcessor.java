package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.common.TopicPartition;

public class OffsetProcessor implements ConsumerProcessor {

    private final Boolean timeDisabled;
    private final Boolean disabled;
    private final Map<String, Long> offsets;

    public OffsetProcessor(ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest) {

        ConsumerAdditionalFiltersRequest.OffsetFilter offsetFilter =
                consumerAdditionalFiltersRequest.getOffsetFilter();
        ConsumerAdditionalFiltersRequest.TimeFilter timeFilter =
                consumerAdditionalFiltersRequest.getTimeFilter();

        this.timeDisabled = timeFilter.getDisabled();
        this.disabled = offsetFilter.getDisabled();
        this.offsets = offsetFilter.getOffsets();
    }

    @Override
    public void postProcess(Consumer<byte[], byte[]> consumer) {
        if (this.disabled || !this.timeDisabled) {
            return;
        }

        Set<TopicPartition> assignment = consumer.assignment();

        Map<TopicPartition, Long> beginningOffsets = consumer.beginningOffsets(assignment);

        for (Map.Entry<String, Long> entry : this.offsets.entrySet()) {
            String topic = entry.getKey();
            Long offset = entry.getValue();

            Set<TopicPartition> computeTopicPartitionsForOffset =
                    this.computeTopicPartitionsForOffset(assignment, topic);

            for (TopicPartition topicPartition : computeTopicPartitionsForOffset) {
                Long beginningOffset = beginningOffsets.get(topicPartition);
                long validOffset = Math.max(offset, beginningOffset);
                consumer.seek(topicPartition, validOffset);
            }
        }
    }

    private Set<TopicPartition> computeTopicPartitionsForOffset(
            Set<TopicPartition> assignment, String topic) {
        return assignment.stream()
                .filter(topicPartition -> topicPartition.topic().equals(topic))
                .collect(Collectors.toSet());
    }
}
