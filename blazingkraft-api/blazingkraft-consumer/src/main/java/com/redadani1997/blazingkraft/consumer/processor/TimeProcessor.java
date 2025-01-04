package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.OffsetAndTimestamp;
import org.apache.kafka.common.TopicPartition;

public class TimeProcessor implements ConsumerProcessor {

    private final ConsumerAdditionalFiltersRequest.TimeFilter timeFilter;
    private final Boolean shouldProcess;

    public TimeProcessor(ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest) {
        this.timeFilter = consumerAdditionalFiltersRequest.getTimeFilter();
        this.shouldProcess = !this.timeFilter.getDisabled() && this.timeFilter.getEnd() != null;
    }

    @Override
    public void postProcess(Consumer<byte[], byte[]> consumer) {
        if (this.timeFilter.getDisabled()) {
            return;
        }
        if (this.timeFilter.getEarliest()
                || (this.timeFilter.getStart() == null && this.timeFilter.getEnd() != null)) {
            consumer.seekToBeginning(consumer.assignment());
        } else if (this.timeFilter.getStart() != null) {
            Map<TopicPartition, Long> timestampsToSearch =
                    consumer.assignment().stream()
                            .collect(
                                    Collectors.toMap(
                                            topicPartition -> topicPartition,
                                            topicPartition -> this.timeFilter.getStart()));

            Map<TopicPartition, OffsetAndTimestamp> offsetsForTimes =
                    consumer.offsetsForTimes(timestampsToSearch);

            offsetsForTimes.forEach(
                    (topicPartition, offsetAndTimestamp) -> {
                        if (offsetAndTimestamp != null) {
                            consumer.seek(topicPartition, offsetAndTimestamp.offset());
                        }
                    });

        } else if (this.timeFilter.getLiveConsumption()) {
            consumer.seekToEnd(consumer.assignment());
        }
    }

    @Override
    public Boolean doProcess(BlazingConsumptionResponse response) {
        if (!this.shouldProcess) {
            return true;
        }
        return this.timeFilter.getEnd() >= response.getMetadata().getTimestamp();
    }
}
