package com.redadani1997.blazingkraft.admin.mapper.out.partition;

import com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.TopicPartitionApiResponse;
import com.redadani1997.blazingkraft.admin.mapper.out.node.NodeResponseMapper;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.PartitionInfoApiResponse;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.TopicPartitionInfo;
import org.springframework.stereotype.Component;

@Component
public class PartitionResponseMapper {

    private final NodeResponseMapper nodeResponseMapper;

    public PartitionResponseMapper(NodeResponseMapper nodeResponseMapper) {
        this.nodeResponseMapper = nodeResponseMapper;
    }

    public TopicPartitionApiResponse consumerGroupTopicPartitionResponse(
            TopicPartition topicPartition) {
        if (topicPartition == null) {
            return null;
        }

        TopicPartitionApiResponse topicPartitionApiResponse = new TopicPartitionApiResponse();
        topicPartitionApiResponse.setPartition(topicPartition.partition());
        topicPartitionApiResponse.setTopic(topicPartition.topic());

        return topicPartitionApiResponse;
    }

    public List<TopicPartitionApiResponse> consumerGroupTopicPartitionResponses(
            Collection<TopicPartition> topicPartitions) {
        if (topicPartitions == null) {
            return Collections.emptyList();
        }
        return topicPartitions.stream()
                .map(this::consumerGroupTopicPartitionResponse)
                .collect(Collectors.toList());
    }

    public PartitionInfoApiResponse topicPartitionInfoApiResponse(
            TopicPartitionInfo topicPartitionInfo) {
        if (topicPartitionInfo == null) {
            return null;
        }

        PartitionInfoApiResponse partitionInfoApiResponse = new PartitionInfoApiResponse();
        partitionInfoApiResponse.setPartition(topicPartitionInfo.partition());
        partitionInfoApiResponse.setIsr(
                this.nodeResponseMapper.topicNodeApiResponses(topicPartitionInfo.isr()));
        partitionInfoApiResponse.setLeader(
                this.nodeResponseMapper.topicNodeApiResponse(topicPartitionInfo.leader()));
        partitionInfoApiResponse.setReplicas(
                this.nodeResponseMapper.topicNodeApiResponses(topicPartitionInfo.replicas()));

        return partitionInfoApiResponse;
    }

    public List<PartitionInfoApiResponse> topicPartitionInfoResponses(
            Collection<TopicPartitionInfo> topicPartitionsInfo) {
        if (topicPartitionsInfo == null) {
            return Collections.emptyList();
        }
        return topicPartitionsInfo.stream()
                .map(this::topicPartitionInfoApiResponse)
                .collect(Collectors.toList());
    }
}
