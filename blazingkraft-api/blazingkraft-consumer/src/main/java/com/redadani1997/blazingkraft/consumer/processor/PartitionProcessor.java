package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import java.util.List;
import java.util.Map;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.common.TopicPartition;

public class PartitionProcessor implements ConsumerProcessor {

    private final Map<String, List<Integer>> partitionFilter;

    public PartitionProcessor(ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest) {
        this.partitionFilter = consumerAdditionalFiltersRequest.getPartitionFilter();
    }

    @Override
    public void postProcess(Consumer<byte[], byte[]> consumer) {
        List<TopicPartition> topicPartitions =
                this.partitionFilter.entrySet().stream()
                        .flatMap(
                                entry ->
                                        entry.getValue().stream()
                                                .map(partition -> new TopicPartition(entry.getKey(), partition)))
                        .toList();

        consumer.assign(topicPartitions);
    }
}
