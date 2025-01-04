package com.redadani1997.blazingkraft.admin.controller;

import com.redadani1997.blazingkraft.admin.dto.in.topic.*;
import com.redadani1997.blazingkraft.admin.mapper.in.AdminRequestMapper;
import com.redadani1997.blazingkraft.admin.mapper.in.topic.TopicRequestMapper;
import com.redadani1997.blazingkraft.admin.service.TopicService;
import com.redadani1997.blazingkraft.admin.topic.openapi.api.TopicApi;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.*;
import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithClusterClient;
import com.redadani1997.blazingkraft.client.decorator.WithClusterCode;
import com.redadani1997.blazingkraft.common.actions.cluster.TopicActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TopicController implements TopicApi {

    private final AdminRequestMapper adminRequestMapper;
    private final TopicService topicService;

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DESCRIBE_TOPICS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<TopicDescriptionApiResponse> describeTopic(String topic) {
        TopicDescriptionRequest request = this.topicRequestMapper().topicDescriptionRequest(topic);

        TopicDescriptionApiResponse response = this.topicService.describeTopic(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DESCRIBE_TOPICS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<TopicConfigurationApiResponse> getTopicConfiguration(String topic) {
        TopicConfigurationRequest request = this.topicRequestMapper().topicConfigurationRequest(topic);

        TopicConfigurationApiResponse response = this.topicService.getTopicConfiguration(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = TopicActions.INCREASE_TOPIC_PARTITIONS,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.INCREASE_TOPIC_PARTITIONS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> increaseTopicPartitions(
            String topic, TopicPartitionIncreaseApiRequest apiRequest) {
        TopicPartitionIncreaseRequest request =
                this.topicRequestMapper().topicPartitionIncreaseRequest(topic, apiRequest);

        this.topicService.increaseTopicPartitions(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = TopicActions.ALTER_TOPIC_CONFIGURATION,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.ALTER_TOPIC_CONFIGURATION, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> editTopicConfiguration(
            String topic, TopicConfigurationEditApiRequest apiRequest) {
        TopicConfigurationEditRequest request =
                this.topicRequestMapper().topicConfigurationEditRequest(topic, apiRequest);

        this.topicService.editTopicConfiguration(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DESCRIBE_TOPICS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<TopicDetailsApiResponse> getTopicDetails(String topic) {
        TopicDetailsRequest request = this.topicRequestMapper().topicDetailsRequest(topic);

        TopicDetailsApiResponse responses = this.topicService.getTopicDetails(request);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DESCRIBE_TOPICS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<TopicDescriptionApiResponse>> describeSpecificTopics(
            TopicDescriptionApiRequest apiRequest) {
        TopicsDescriptionRequest request =
                this.topicRequestMapper().topicsDescriptionRequest(apiRequest);

        List<TopicDescriptionApiResponse> responses = this.topicService.describeTopics(request);

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DESCRIBE_TOPICS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<TopicDescriptionApiResponse>> describeAllTopics() {
        List<TopicDescriptionApiResponse> responses = this.topicService.describeTopics();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DESCRIBE_TOPICS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<List<TopicListingApiResponse>> listAllTopics() {
        List<TopicListingApiResponse> responses = this.topicService.listTopics();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = TopicActions.CREATE_TOPIC,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.MEDIUM)
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.CREATE_TOPIC, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<TopicListingApiResponse> createTopic(TopicCreateApiRequest apiRequest) {
        TopicCreateRequest request = this.topicRequestMapper().topicCreateRequest(apiRequest);

        TopicListingApiResponse response = this.topicService.createTopic(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = TopicActions.DELETE_TOPIC,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DELETE_TOPIC, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> deleteTopic(String topic) {
        TopicDeleteRequest topicDeleteRequest = this.topicRequestMapper().topicDeleteRequest(topic);

        this.topicService.deleteTopic(topicDeleteRequest);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @WithCleanUp
    @WithClusterCode
    @WithAudit(
            action = TopicActions.DELETE_TOPIC_RECORDS,
            type = EntityType.CLUSTER,
            severity = AuditSeverity.HIGH)
    @WithClusterClient
    @WithAuthorization(permission = TopicActions.DELETE_TOPIC_RECORDS, type = EntityType.CLUSTER)
    @Override
    public ResponseEntity<Void> deleteTopicRecords(
            String topic, TopicDeleteRecordsApiRequest apiRequest) {

        TopicDeleteRecordsRequest request =
                this.topicRequestMapper().topicDeleteRecordsRequest(topic, apiRequest);

        this.topicService.deleteTopicRecords(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private TopicRequestMapper topicRequestMapper() {
        return this.adminRequestMapper.topicRequestMapper();
    }
}
