package com.redadani1997.blazingkraft.admin.mapper.in.partition;

import com.redadani1997.blazingkraft.admin.dto.in.partition.PartitionRequest;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.TopicPartitionApiRequest;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Component;

@Component
public class PartitionRequestMapper {

    public TopicPartition topicPartition(PartitionRequest partitionRequest) {
        if (partitionRequest == null) {
            return null;
        }
        CommonValidator.assertNotBlank("Topic Name", partitionRequest.getTopic());
        CommonValidator.assertNotNull("Partition", partitionRequest.getPartition());

        return new TopicPartition(partitionRequest.getTopic(), partitionRequest.getPartition());
    }

    public List<TopicPartition> topicPartitions(List<PartitionRequest> partitionRequests) {
        if (partitionRequests == null) {
            return Collections.EMPTY_LIST;
        }
        return partitionRequests.stream().map(this::topicPartition).collect(Collectors.toList());
    }

    public TopicPartition offsetTopicPartition(TopicPartitionApiRequest apiRequest) {
        if (apiRequest == null) {
            return null;
        }
        CommonValidator.assertNotBlank("Topic Name", apiRequest.getTopic());
        CommonValidator.assertNotNull("Partition", apiRequest.getPartition());

        return new TopicPartition(apiRequest.getTopic(), apiRequest.getPartition());
    }

    public List<TopicPartition> offsetTopicPartitions(List<TopicPartitionApiRequest> apiRequests) {
        if (apiRequests == null) {
            return Collections.EMPTY_LIST;
        }
        return apiRequests.stream().map(this::offsetTopicPartition).collect(Collectors.toList());
    }
}
