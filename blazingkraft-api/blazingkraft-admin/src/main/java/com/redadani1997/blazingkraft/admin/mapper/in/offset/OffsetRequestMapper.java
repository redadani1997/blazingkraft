package com.redadani1997.blazingkraft.admin.mapper.in.offset;

import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetConsumerGroupDeleteRequest;
import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetsListRequest;
import com.redadani1997.blazingkraft.admin.mapper.in.partition.PartitionRequestMapper;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.*;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.enums.CommonOffsetSpec;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.error.admin.OffsetException;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.OffsetSpec;
import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.IsolationLevel;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OffsetRequestMapper {
    private final AuditLogService auditLogService;
    private final PartitionRequestMapper partitionRequestMapper;

    public OffsetConsumerGroupDeleteRequest offsetConsumerGroupDeleteRequest(
            DeleteConsumerGroupOffsetsApiRequest apiRequest, String consumerGroup) {
        this.auditLogService.setSubject(consumerGroup);

        CommonValidator.assertNotBlank("Consumer Group", consumerGroup);

        List<TopicPartition> topicPartitions =
                this.partitionRequestMapper.offsetTopicPartitions(apiRequest.getTopicPartitions());

        return OffsetConsumerGroupDeleteRequest.builder()
                .consumerGroup(consumerGroup)
                .topicPartitions(new HashSet<>(topicPartitions))
                .build();
    }

    public OffsetConsumerGroupAlterRequest offsetConsumerGroupAlterRequest(
            OffsetConsumerGroupAlterApiRequest apiRequest) {
        this.auditLogService.setSubject(apiRequest.getGroupId());

        List<OffsetByTopicPartitionApiRequest> offsetsByTopicPartition =
                apiRequest.getOffsetsByTopicPartition();
        CommonValidator.assertNotBlank("Consumer Group", apiRequest.getGroupId());
        CommonValidator.assertNotNull("Offsets By Topic Partition", offsetsByTopicPartition);

        OffsetConsumerGroupAlterRequest request = new OffsetConsumerGroupAlterRequest();
        request.setGroupId(apiRequest.getGroupId());

        List<TopicPartitionApiRequest> allTopicPartitions =
                offsetsByTopicPartition.stream()
                        .map(OffsetByTopicPartitionApiRequest::getTopicPartition)
                        .toList();

        allTopicPartitions.forEach(
                item -> {
                    int frequency = Collections.frequency(allTopicPartitions, item);
                    if (frequency > 1) {
                        throw new OffsetException(
                                String.format(
                                        "The couple topic-partition '%s-%s' cannot be duplicated",
                                        item.getTopic(), item.getPartition()));
                    }
                });

        Map<TopicPartition, OffsetAndMetadata> offsetsByTopicPartitionRequest =
                offsetsByTopicPartition.stream()
                        .collect(
                                Collectors.toMap(
                                        item -> this.topicPartition(item.getTopicPartition()),
                                        item -> this.offsetAndMetadata(item.getOffsetAndMetadata())));

        request.setOffsetsByTopicPartition(offsetsByTopicPartitionRequest);

        return request;
    }

    public OffsetsListRequest offsetsListRequest(OffsetTopicPartitionsListApiRequest apiRequest) {
        String isolationLevel = apiRequest.getIsolationLevel();
        List<OffsetSpecByTopicPartitionApiRequest> offsetSpecsByTopicPartition =
                apiRequest.getOffsetSpecsByTopicPartition();

        CommonValidator.assertNotBlank("Isolation Level", isolationLevel);
        CommonValidator.assertNotNull("Offset Specs By Topic Partition", offsetSpecsByTopicPartition);

        OffsetsListRequest request = new OffsetsListRequest();

        request.setIsolationLevel(EnumUtils.fromName(IsolationLevel.class, isolationLevel));

        Map<TopicPartition, OffsetSpec> topicPartitionOffsets =
                offsetSpecsByTopicPartition.stream()
                        .collect(
                                Collectors.toMap(
                                        item -> this.topicPartition(item.getTopicPartition()),
                                        item -> this.getOffsetSpec(item.getOffsetSpec(), item.getTimestamp())));
        request.setTopicPartitionOffsets(topicPartitionOffsets);

        return request;
    }

    private OffsetSpec getOffsetSpec(String offsetSpec, Long timestamp) {
        CommonValidator.assertNotBlank("Offset Spec", offsetSpec);
        CommonOffsetSpec commonOffsetSpec = EnumUtils.fromName(CommonOffsetSpec.class, offsetSpec);
        return switch (commonOffsetSpec) {
            case EARLIEST:
                yield OffsetSpec.earliest();
            case LATEST:
                yield OffsetSpec.latest();
            case TIMESTAMP:
                CommonValidator.assertNotNull("Timestamp", timestamp);
                yield OffsetSpec.forTimestamp(timestamp);
            case MAX_TIMESTAMP:
                yield OffsetSpec.maxTimestamp();
        };
    }

    private TopicPartition topicPartition(TopicPartitionApiRequest topicPartition) {
        return this.partitionRequestMapper.offsetTopicPartition(topicPartition);
    }

    private OffsetAndMetadata offsetAndMetadata(OffsetAndMetadataApiRequest offsetAndMetadata) {
        CommonValidator.assertNotNull("Offset", offsetAndMetadata.getOffset());

        return new OffsetAndMetadata(
                offsetAndMetadata.getOffset(),
                Optional.ofNullable(offsetAndMetadata.getLeaderEpoch()),
                offsetAndMetadata.getMetadata());
    }
}
