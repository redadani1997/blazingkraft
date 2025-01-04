package com.redadani1997.blazingkraft.admin.mapper.in.topic;

import com.redadani1997.blazingkraft.admin.dto.in.topic.*;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.*;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.client.validator.TopicConfigurationValidator;
import com.redadani1997.blazingkraft.common.util.CommonMapUtils;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.admin.RecordsToDelete;
import org.apache.kafka.common.TopicPartition;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TopicRequestMapper {
    private final TopicConfigurationValidator topicConfigurationValidator;
    private final AuditLogService auditLogService;

    public TopicCreateRequest topicCreateRequest(TopicCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getName());

        CommonValidator.assertNotBlank("Topic Name", apiRequest.getName());
        CommonValidator.assertNotNull("Number of Partitions", apiRequest.getNumPartitions());
        CommonValidator.assertNotNull("Replication Factor", apiRequest.getReplicationFactor());

        Map<String, String> configuration = CommonMapUtils.toStringMap(apiRequest.getConfiguration());

        Map<String, String> computedConfiguration =
                this.topicConfigurationValidator.validateAndCompute(configuration);

        NewTopic newTopic =
                new NewTopic(
                        apiRequest.getName(),
                        apiRequest.getNumPartitions(),
                        apiRequest.getReplicationFactor().shortValue());
        newTopic.configs(computedConfiguration);

        TopicCreateRequest computedTopicCreateRequest = new TopicCreateRequest();
        computedTopicCreateRequest.setNewTopic(newTopic);

        return computedTopicCreateRequest;
    }

    public TopicDeleteRequest topicDeleteRequest(String topicName) {
        this.auditLogService.setSubject(topicName);

        CommonValidator.assertNotBlank("Topic Name", topicName);

        return TopicDeleteRequest.builder().topicNames(Collections.singleton(topicName)).build();
    }

    public TopicDescriptionRequest topicDescriptionRequest(String topicName) {
        CommonValidator.assertNotBlank("Topic Name", topicName);

        return TopicDescriptionRequest.builder().topicName(topicName).build();
    }

    public TopicsDescriptionRequest topicsDescriptionRequest(TopicDescriptionApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotNull("Topic Names", apiRequest.getTopicNames());
        return TopicsDescriptionRequest.builder().topicNames(apiRequest.getTopicNames()).build();
    }

    public TopicDetailsRequest topicDetailsRequest(String topic) {
        CommonValidator.assertNotBlank("Topic Name", topic);

        return TopicDetailsRequest.builder().topic(topic).build();
    }

    public TopicDeleteRecordsRequest topicDeleteRecordsRequest(
            String topic, TopicDeleteRecordsApiRequest apiRequest) {
        this.auditLogService.setSubject(topic);

        CommonValidator.assertNotBlank("Topic Name", topic);
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotNull("partitionsOffset", apiRequest.getPartitionsOffset());

        Map<TopicPartition, RecordsToDelete> recordsToDelete =
                apiRequest.getPartitionsOffset().stream()
                        .collect(
                                Collectors.toMap(
                                        partitionOffset -> {
                                            return new TopicPartition(topic, partitionOffset.getPartition());
                                        },
                                        partitionOffset -> {
                                            return RecordsToDelete.beforeOffset(partitionOffset.getOffset());
                                        }));

        return TopicDeleteRecordsRequest.builder().recordsToDelete(recordsToDelete).build();
    }

    public TopicConfigurationEditRequest topicConfigurationEditRequest(
            String topic, TopicConfigurationEditApiRequest apiRequest) {
        this.auditLogService.setSubject(topic);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Topic Name", topic);
        CommonValidator.assertNotNull("Configuration", apiRequest.getConfiguration());

        Map<String, String> configuration = CommonMapUtils.toStringMap(apiRequest.getConfiguration());

        Map<String, String> computedConfiguration =
                this.topicConfigurationValidator.validateAndCompute(configuration);

        return TopicConfigurationEditRequest.builder()
                .configuration(computedConfiguration)
                .topicName(topic)
                .build();
    }

    public TopicConfigurationRequest topicConfigurationRequest(String topic) {
        CommonValidator.assertNotBlank("Topic Name", topic);

        return TopicConfigurationRequest.builder().topicName(topic).build();
    }

    public TopicPartitionIncreaseRequest topicPartitionIncreaseRequest(
            String topic, TopicPartitionIncreaseApiRequest apiRequest) {
        this.auditLogService.setSubject(topic);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Topic Name", topic);
        CommonValidator.assertNotNull("Increase To", apiRequest.getIncreaseTo());

        return TopicPartitionIncreaseRequest.builder()
                .topicName(topic)
                .increaseTo(apiRequest.getIncreaseTo())
                .build();
    }
}
