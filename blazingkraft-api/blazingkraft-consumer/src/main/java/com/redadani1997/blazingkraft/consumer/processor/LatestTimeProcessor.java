package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.common.TopicPartition;

public class LatestTimeProcessor implements ConsumerProcessor {

    private static final Integer CONSUMER_POLL_SIZE = 1000;
    private final ConsumerAdditionalFiltersRequest.TimeFilter timeFilter;
    private Integer determinedPollSize;
    private Integer computedResultsSize;
    private List<CustomPartitionOffsetsAndRecordsInfo> partitionOffsetsAndRecordsInfos;

    public LatestTimeProcessor(
            ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest, Integer resultsSize) {
        this.timeFilter = consumerAdditionalFiltersRequest.getTimeFilter();
        if (!this.timeFilter.getDisabled() && this.timeFilter.getLatest()) {
            this.computedResultsSize = resultsSize > 0 ? resultsSize : CONSUMER_POLL_SIZE;
        }
    }

    @Override
    public void preProcess(Map<String, Object> overrides) {
        if (this.timeFilter.getDisabled()) {
            return;
        }
        if (this.timeFilter.getLatest()) {
            overrides.put("max.poll.records", CONSUMER_POLL_SIZE);
            overrides.put("fetch.max.bytes", Integer.MAX_VALUE);
        }
    }

    @Override
    public void postProcess(Consumer<byte[], byte[]> consumer) {
        if (this.timeFilter.getDisabled()) {
            return;
        }
        if (this.timeFilter.getLatest()) {
            Map<TopicPartition, Long> beginningOffsets = consumer.beginningOffsets(consumer.assignment());
            Map<TopicPartition, Long> endOffsets = consumer.endOffsets(consumer.assignment());

            this.partitionOffsetsAndRecordsInfos =
                    beginningOffsets.entrySet().stream()
                            .filter(entry -> endOffsets.get(entry.getKey()) > entry.getValue())
                            .map(
                                    entry ->
                                            new CustomPartitionOffsetsAndRecordsInfo(
                                                    entry.getKey(), entry.getValue(), endOffsets.get(entry.getKey())))
                            .toList();

            this.determinedPollSize = this.determinePollSize();
        }
    }

    public LatestTimeProcessorPollResponse pollProcess(
            Consumer<byte[], byte[]> consumer, Long pollTimeoutMs) {
        if (this.timeFilter.getDisabled() || !this.timeFilter.getLatest()) {
            return null;
        }
        this.purgeCompletedPartitions();

        List<ConsumerRecord<byte[], byte[]>> records = this.getRecords(consumer, pollTimeoutMs);

        if (records == null) {
            return LatestTimeProcessorPollResponse.builder()
                    .allCompleted(true)
                    .records(new ArrayList<>())
                    .build();
        }

        return LatestTimeProcessorPollResponse.builder().allCompleted(false).records(records).build();
    }

    // To ignore completed partitions
    private void purgeCompletedPartitions() {
        this.partitionOffsetsAndRecordsInfos =
                this.partitionOffsetsAndRecordsInfos.stream().filter(info -> !info.isCompleted()).toList();
    }

    private List<ConsumerRecord<byte[], byte[]>> getRecords(
            Consumer<byte[], byte[]> consumer, Long pollTimeoutMs) {
        List<CustomPartitionOffsetsAndRecordsInfo> infos = this.sortPartitionOffsetsAndRecordsInfos();
        if (infos.isEmpty()) {
            return null;
        }
        CustomPartitionOffsetsAndRecordsInfo info = infos.get(0);

        return info.doSeekAndPoll(this.determinedPollSize, consumer, pollTimeoutMs);
    }

    private Integer determinePollSize() {
        if (this.partitionOffsetsAndRecordsInfos.isEmpty()) {
            return 0;
        }
        int pollSize = this.computedResultsSize / this.partitionOffsetsAndRecordsInfos.size();
        int pollSizeRest = this.computedResultsSize % this.partitionOffsetsAndRecordsInfos.size();

        if (pollSizeRest > 0) {
            pollSize++;
        }
        return pollSize;
    }

    // To handle partition with the lowest iteration count
    private List<CustomPartitionOffsetsAndRecordsInfo> sortPartitionOffsetsAndRecordsInfos() {
        return this.partitionOffsetsAndRecordsInfos.stream()
                .sorted(Comparator.comparing(CustomPartitionOffsetsAndRecordsInfo::getIteration))
                .collect(Collectors.toList());
    }

    @Getter
    @Builder
    public static class LatestTimeProcessorPollResponse {
        private boolean allCompleted;
        private List<ConsumerRecord<byte[], byte[]>> records;
    }

    @Getter
    @Setter
    private class CustomPartitionOffsetsAndRecordsInfo {
        private TopicPartition topicPartition;
        private Integer iteration;
        private long earliestOffset;
        private long latestOffset;
        private long fromOffset;
        private long initialFromOffset;
        private long toOffset;
        private boolean completed;
        private int processedRecordsCount;
        private boolean isOptimistic;
        private boolean initialPoll;
        private List<ConsumerRecord<byte[], byte[]>> records;

        public CustomPartitionOffsetsAndRecordsInfo(
                TopicPartition topicPartition, long earliestOffset, long latestOffset) {
            this.topicPartition = topicPartition;
            this.earliestOffset = earliestOffset;
            this.latestOffset = latestOffset;
            this.fromOffset = latestOffset;
            this.toOffset = latestOffset;
            this.iteration = 0;
            this.completed = false;
            this.processedRecordsCount = 0;
            this.isOptimistic = true;
            this.initialPoll = true;
            this.records = new ArrayList<>();
        }

        public List<ConsumerRecord<byte[], byte[]>> doSeekAndPoll(
                int determinedPollSize, Consumer<byte[], byte[]> consumer, Long pollTimeoutMs) {

            List<ConsumerRecord<byte[], byte[]>> recordsList;

            if (this.isOptimistic) {
                recordsList = this.optimisticConsumption(consumer, pollTimeoutMs, determinedPollSize);
            } else {
                this.records = new ArrayList<>();
                recordsList = this.nonOptimisticConsumption(consumer, pollTimeoutMs);
            }

            return recordsList;
        }

        private List<ConsumerRecord<byte[], byte[]>> optimisticConsumption(
                Consumer<byte[], byte[]> consumer, Long pollTimeoutMs, int determinedPollSize) {
            if (this.initialPoll) {
                this.initialFromOffset =
                        Math.max(this.earliestOffset, this.latestOffset - CONSUMER_POLL_SIZE);
                consumer.assign(List.of(this.topicPartition));

                consumer.seek(this.topicPartition, this.initialFromOffset);

                this.doPoll(consumer, pollTimeoutMs);

                this.initialPoll = false;
            }

            this.toOffset = this.fromOffset - 1;

            long optimisticFromOffset = this.fromOffset - determinedPollSize;

            if (optimisticFromOffset <= this.initialFromOffset) {
                this.fromOffset = this.initialFromOffset;
            } else {
                this.fromOffset = optimisticFromOffset;
            }

            if (this.toOffset <= this.fromOffset) {
                this.isOptimistic = false;
            }

            this.iteration++;

            if (this.fromOffset == this.earliestOffset) {
                this.completed = true;
            }

            List<ConsumerRecord<byte[], byte[]>> recordsList = new ArrayList<>();

            for (ConsumerRecord<byte[], byte[]> record : this.records) {
                if (this.fromOffset <= record.offset() && this.toOffset >= record.offset()) {
                    recordsList.add(record);
                }
                if (recordsList.size() == determinedPollSize) {
                    break;
                }
            }

            if (recordsList.size() < determinedPollSize) {
                this.isOptimistic = false;
            }

            return recordsList;
        }

        private List<ConsumerRecord<byte[], byte[]>> nonOptimisticConsumption(
                Consumer<byte[], byte[]> consumer, Long pollTimeoutMs) {
            this.toOffset = this.fromOffset - 1;

            long optimisticFromOffset = this.fromOffset - CONSUMER_POLL_SIZE;

            this.fromOffset = Math.max(optimisticFromOffset, this.earliestOffset);

            this.iteration++;

            if (this.fromOffset == this.earliestOffset) {
                this.completed = true;
            }

            consumer.assign(List.of(this.topicPartition));

            consumer.seek(this.topicPartition, this.fromOffset);

            this.doPoll(consumer, pollTimeoutMs);

            return this.records;
        }

        private void doPoll(Consumer<byte[], byte[]> consumer, long pollTimeoutMs) {
            ConsumerRecords<byte[], byte[]> consumerRecords =
                    consumer.poll(Duration.of(pollTimeoutMs, ChronoUnit.MILLIS));

            if (consumerRecords.count() == 0) {
                return;
            }

            for (ConsumerRecord<byte[], byte[]> record : consumerRecords) {
                if (this.toOffset >= record.offset()) {
                    this.records.add(record);
                } else {
                    return;
                }
            }

            if (this.records.size() == CONSUMER_POLL_SIZE) {
                return;
            }

            doPoll(consumer, pollTimeoutMs);
        }
    }
}
