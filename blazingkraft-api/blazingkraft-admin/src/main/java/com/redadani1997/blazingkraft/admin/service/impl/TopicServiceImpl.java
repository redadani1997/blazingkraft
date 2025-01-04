package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.dto.in.offset.OffsetsListRequest;
import com.redadani1997.blazingkraft.admin.dto.in.topic.*;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.topic.TopicResponseMapper;
import com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse;
import com.redadani1997.blazingkraft.admin.service.OffsetService;
import com.redadani1997.blazingkraft.admin.service.TopicService;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicConfigurationApiResponse;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicDetailsApiResponse;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicListingApiResponse;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.IsolationLevel;
import org.apache.kafka.common.Node;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.config.ConfigResource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final OffsetService offsetService;
    private final AdminResponseMapper adminResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public TopicListingApiResponse createTopic(TopicCreateRequest topicCreateRequest) {
        Collection<NewTopic> newTopics = Collections.singleton(topicCreateRequest.getNewTopic());
        CreateTopicsResult createTopicsResult =
                this.currentAdminClient().client().createTopics(newTopics);
        KafkaFutureUtils.resolve(createTopicsResult.all(), KafkaFutureMode.ADMIN);

        return this.topicResponseMapper()
                .topicListingApiResponse(null, false, topicCreateRequest.getNewTopic().name());
    }

    @Override
    public List<TopicDescriptionApiResponse> describeTopics(
            TopicsDescriptionRequest topicsDescriptionRequest) {
        DescribeTopicsOptions describeTopicsOptions = new DescribeTopicsOptions();
        describeTopicsOptions.includeAuthorizedOperations(true);

        DescribeTopicsResult describeTopicsResult =
                this.currentAdminClient()
                        .client()
                        .describeTopics(topicsDescriptionRequest.getTopicNames(), describeTopicsOptions);
        Map<String, TopicDescription> topicDescriptionsByTopicNames =
                KafkaFutureUtils.resolve(describeTopicsResult.all(), KafkaFutureMode.ADMIN);
        Collection<TopicDescription> topicDescriptions = topicDescriptionsByTopicNames.values();

        return this.topicResponseMapper().topicDescriptionApiResponses(topicDescriptions);
    }

    @Override
    public List<TopicDescriptionApiResponse> describeTopics() {
        ListTopicsOptions listTopicsOptions = new ListTopicsOptions();
        listTopicsOptions.listInternal(true);
        ListTopicsResult listTopicsResult =
                this.currentAdminClient().client().listTopics(listTopicsOptions);
        Collection<TopicListing> topicListings =
                KafkaFutureUtils.resolve(listTopicsResult.listings(), KafkaFutureMode.ADMIN);
        List<String> topicNames =
                topicListings.stream().map(TopicListing::name).collect(Collectors.toList());

        DescribeTopicsOptions describeTopicsOptions = new DescribeTopicsOptions();
        describeTopicsOptions.includeAuthorizedOperations(true);

        DescribeTopicsResult describeTopicsResult =
                this.currentAdminClient().client().describeTopics(topicNames, describeTopicsOptions);
        Map<String, TopicDescription> topicDescriptionsByTopicNames =
                KafkaFutureUtils.resolve(describeTopicsResult.all(), KafkaFutureMode.ADMIN);
        Collection<TopicDescription> topicDescriptions = topicDescriptionsByTopicNames.values();
        return this.topicResponseMapper().topicDescriptionApiResponses(topicDescriptions);
    }

    @Override
    public TopicDescriptionApiResponse describeTopic(
            TopicDescriptionRequest topicDescriptionRequest) {
        DescribeTopicsOptions describeTopicsOptions = new DescribeTopicsOptions();
        describeTopicsOptions.includeAuthorizedOperations(true);

        DescribeTopicsResult describeTopicsResult =
                this.currentAdminClient()
                        .client()
                        .describeTopics(
                                Collections.singleton(topicDescriptionRequest.getTopicName()),
                                describeTopicsOptions);
        Map<String, TopicDescription> topicDescriptionsByTopicNames =
                KafkaFutureUtils.resolve(describeTopicsResult.all(), KafkaFutureMode.ADMIN);

        TopicDescription topicDescription =
                topicDescriptionsByTopicNames.get(topicDescriptionRequest.getTopicName());

        return this.topicResponseMapper().topicDescriptionApiResponse(topicDescription);
    }

    @Override
    public List<TopicListingApiResponse> listTopics() {
        ListTopicsOptions listTopicsOptions = new ListTopicsOptions();
        listTopicsOptions.listInternal(true);
        ListTopicsResult listTopicsResult =
                this.currentAdminClient().client().listTopics(listTopicsOptions);
        Collection<TopicListing> topicListings =
                KafkaFutureUtils.resolve(listTopicsResult.listings(), KafkaFutureMode.ADMIN);
        return this.topicResponseMapper().topicListingApiResponses(topicListings);
    }

    @Override
    public TopicDetailsApiResponse getTopicDetails(TopicDetailsRequest request) {
        TopicDescriptionRequest topicDescriptionRequest =
                TopicDescriptionRequest.builder().topicName(request.getTopic()).build();
        TopicDescriptionApiResponse topicDescriptionApiResponse =
                this.describeTopic(topicDescriptionRequest);

        OffsetsListRequest earliestOffsetsListRequest = new OffsetsListRequest();
        earliestOffsetsListRequest.setIsolationLevel(IsolationLevel.READ_UNCOMMITTED);
        Map<TopicPartition, OffsetSpec> topicPartitionEarliestOffsets =
                topicDescriptionApiResponse.getPartitions().stream()
                        .collect(
                                Collectors.toMap(
                                        topicPartition ->
                                                new TopicPartition(request.getTopic(), topicPartition.getPartition()),
                                        topicPartition -> OffsetSpec.earliest()));
        earliestOffsetsListRequest.setTopicPartitionOffsets(topicPartitionEarliestOffsets);
        List<OffsetInfoApiResponse> earliestOffsetInfoApiResponses =
                this.offsetService.listTopicPartitionsOffsets(earliestOffsetsListRequest);

        OffsetsListRequest latestOffsetsListRequest = new OffsetsListRequest();
        latestOffsetsListRequest.setIsolationLevel(IsolationLevel.READ_UNCOMMITTED);
        Map<TopicPartition, OffsetSpec> topicPartitionLatestOffsets =
                topicDescriptionApiResponse.getPartitions().stream()
                        .collect(
                                Collectors.toMap(
                                        topicPartition ->
                                                new TopicPartition(request.getTopic(), topicPartition.getPartition()),
                                        topicPartition -> OffsetSpec.latest()));
        latestOffsetsListRequest.setTopicPartitionOffsets(topicPartitionLatestOffsets);
        List<OffsetInfoApiResponse> latestOffsetInfoApiResponses =
                this.offsetService.listTopicPartitionsOffsets(latestOffsetsListRequest);

        DescribeClusterResult describeClusterResult =
                this.currentAdminClient().client().describeCluster();
        Collection<Node> nodes =
                KafkaFutureUtils.resolve(describeClusterResult.nodes(), KafkaFutureMode.ADMIN);
        List<Integer> nodeIds = nodes.stream().map(Node::id).toList();
        DescribeLogDirsResult describeLogDirsResult =
                this.currentAdminClient().client().describeLogDirs(nodeIds);
        Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions =
                KafkaFutureUtils.resolve(describeLogDirsResult.allDescriptions(), KafkaFutureMode.ADMIN);

        return this.topicResponseMapper()
                .topicDetailsApiResponse(
                        topicDescriptionApiResponse,
                        earliestOffsetInfoApiResponses,
                        latestOffsetInfoApiResponses,
                        lodDirDescriptions);
    }

    @Override
    public void deleteTopicRecords(TopicDeleteRecordsRequest request) {
        DeleteRecordsResult deleteRecordsResult =
                this.currentAdminClient().client().deleteRecords(request.getRecordsToDelete());
        KafkaFutureUtils.resolve(deleteRecordsResult.all(), KafkaFutureMode.ADMIN);
    }

    @Override
    public void editTopicConfiguration(TopicConfigurationEditRequest request) {
        ConfigResource configResource =
                new ConfigResource(ConfigResource.Type.TOPIC, request.getTopicName());

        Collection<ConfigEntry> entries =
                request.getConfiguration().entrySet().stream()
                        .map(entry -> new ConfigEntry(entry.getKey(), entry.getValue()))
                        .toList();
        Config config = new Config(entries);

        Map<ConfigResource, Config> configs = Map.of(configResource, config);

        AlterConfigsResult alterConfigsResult =
                this.currentAdminClient().client().alterConfigs(configs);

        KafkaFutureUtils.resolve(alterConfigsResult.all(), KafkaFutureMode.ADMIN);
    }

    @Override
    public void increaseTopicPartitions(TopicPartitionIncreaseRequest request) {
        Map<String, NewPartitions> newPartitions =
                Map.of(request.getTopicName(), NewPartitions.increaseTo(request.getIncreaseTo()));
        CreatePartitionsResult createPartitionsResult =
                this.currentAdminClient().client().createPartitions(newPartitions);
        KafkaFutureUtils.resolve(createPartitionsResult.all(), KafkaFutureMode.ADMIN);
    }

    @Override
    public TopicConfigurationApiResponse getTopicConfiguration(TopicConfigurationRequest request) {
        Collection<ConfigResource> configResources =
                List.of(new ConfigResource(ConfigResource.Type.TOPIC, request.getTopicName()));
        DescribeConfigsResult describeConfigsResult =
                this.currentAdminClient().client().describeConfigs(configResources);
        Map<ConfigResource, Config> configResourceResponse =
                KafkaFutureUtils.resolve(describeConfigsResult.all(), KafkaFutureMode.ADMIN);

        return this.topicResponseMapper().topicConfigurationApiResponse(configResourceResponse);
    }

    @Override
    public void deleteTopic(TopicDeleteRequest topicDeleteRequest) {
        DeleteTopicsResult deleteTopicsResult =
                this.currentAdminClient().client().deleteTopics(topicDeleteRequest.getTopicNames());
        KafkaFutureUtils.resolve(deleteTopicsResult.all(), KafkaFutureMode.ADMIN);
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private TopicResponseMapper topicResponseMapper() {
        return this.adminResponseMapper.topicResponseMapper();
    }
}
