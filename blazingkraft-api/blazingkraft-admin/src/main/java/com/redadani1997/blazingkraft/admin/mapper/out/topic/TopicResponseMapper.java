package com.redadani1997.blazingkraft.admin.mapper.out.topic;

import com.redadani1997.blazingkraft.admin.mapper.out.partition.PartitionResponseMapper;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.*;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.acl.AclOperation;
import org.apache.kafka.common.config.ConfigResource;
import org.springframework.stereotype.Component;

@Component
public class TopicResponseMapper {

    private final PartitionResponseMapper partitionResponseMapper;

    public TopicResponseMapper(PartitionResponseMapper partitionResponseMapper) {
        this.partitionResponseMapper = partitionResponseMapper;
    }

    public TopicListingApiResponse topicListingApiResponse(TopicListing topicListing) {
        if (topicListing == null) {
            return null;
        }
        TopicListingApiResponse topicListingApiResponse = new TopicListingApiResponse();
        topicListingApiResponse.setInternal(topicListing.isInternal());
        topicListingApiResponse.setName(topicListing.name());
        topicListingApiResponse.setTopicId(null);
        return topicListingApiResponse;
    }

    public List<TopicListingApiResponse> topicListingApiResponses(
            Collection<TopicListing> TopicListings) {
        if (TopicListings == null) {
            return Collections.emptyList();
        }
        return TopicListings.stream().map(this::topicListingApiResponse).collect(Collectors.toList());
    }

    public TopicDescriptionApiResponse topicDescriptionApiResponse(
            TopicDescription topicDescription) {
        if (topicDescription == null) {
            return null;
        }
        Set<AclOperation> aclOperations =
                topicDescription.authorizedOperations() != null
                        ? topicDescription.authorizedOperations()
                        : Collections.EMPTY_SET;

        TopicDescriptionApiResponse topicDescriptionApiResponse = new TopicDescriptionApiResponse();

        topicDescriptionApiResponse.setInternal(topicDescription.isInternal());
        topicDescriptionApiResponse.setTopicId(String.valueOf(topicDescription.topicId()));
        topicDescriptionApiResponse.setAuthorizedOperations(EnumUtils.toNames(aclOperations));
        topicDescriptionApiResponse.setName(topicDescription.name());
        topicDescriptionApiResponse.setPartitions(
                this.partitionResponseMapper.topicPartitionInfoResponses(topicDescription.partitions()));

        return topicDescriptionApiResponse;
    }

    public List<TopicDescriptionApiResponse> topicDescriptionApiResponses(
            Collection<TopicDescription> topicDescriptions) {
        if (topicDescriptions == null) {
            return Collections.emptyList();
        }
        return topicDescriptions.stream()
                .map(this::topicDescriptionApiResponse)
                .sorted(
                        Comparator.comparing(
                                TopicDescriptionApiResponse::getName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());
    }

    public TopicListingApiResponse topicListingApiResponse(
            String topicId, boolean internal, String name) {
        TopicListingApiResponse topicListingApiResponse = new TopicListingApiResponse();
        topicListingApiResponse.setInternal(internal);
        topicListingApiResponse.setName(name);
        topicListingApiResponse.setTopicId(topicId);
        return topicListingApiResponse;
    }

    public TopicDetailsApiResponse topicDetailsApiResponse(
            TopicDescriptionApiResponse topicDescriptionApiResponse,
            List<com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse>
                    earliestOffsetInfoApiResponses,
            List<com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse>
                    latestOffsetInfoApiResponses,
            Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions) {
        TopicDetailsApiResponse apiResponse = new TopicDetailsApiResponse();

        apiResponse.setPartitionsDetails(
                this.partitionsDetails(topicDescriptionApiResponse, lodDirDescriptions));
        apiResponse.setTopicDescription(topicDescriptionApiResponse);
        apiResponse.setEarliestOffsetInfos(this.offsetInfoApiResponses(earliestOffsetInfoApiResponses));
        apiResponse.setLatestOffsetInfos(this.offsetInfoApiResponses(latestOffsetInfoApiResponses));

        return apiResponse;
    }

    private List<PartitionDetailsApiResponse> partitionsDetails(
            TopicDescriptionApiResponse topicDescriptionApiResponse,
            Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions) {
        if (topicDescriptionApiResponse == null
                || lodDirDescriptions == null
                || lodDirDescriptions.isEmpty()) {
            return Collections.emptyList();
        }
        return topicDescriptionApiResponse.getPartitions().stream()
                .map(
                        topicPartition ->
                                this.partitionDetailsApiResponse(
                                        topicDescriptionApiResponse.getName(), topicPartition, lodDirDescriptions))
                .collect(Collectors.toList());
    }

    private PartitionDetailsApiResponse partitionDetailsApiResponse(
            String topic,
            PartitionInfoApiResponse topicPartition,
            Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions) {
        PartitionDetailsApiResponse partitionDetailsApiResponse = new PartitionDetailsApiResponse();
        Long size = 0L;
        Long offsetLag = 0L;
        Integer partition = topicPartition.getPartition();

        for (Map.Entry<Integer, Map<String, LogDirDescription>> logDirDescriptionBrokerEntry :
                lodDirDescriptions.entrySet()) {
            Map<String, LogDirDescription> logDirDescriptionBrokerValue =
                    logDirDescriptionBrokerEntry.getValue();

            for (LogDirDescription logDirDescription : logDirDescriptionBrokerValue.values()) {
                for (Map.Entry<TopicPartition, ReplicaInfo> topicPartitionReplicaInfoEntry :
                        logDirDescription.replicaInfos().entrySet()) {
                    TopicPartition tp = topicPartitionReplicaInfoEntry.getKey();
                    if (partition == tp.partition() && topic.equals(tp.topic())) {
                        ReplicaInfo replicaInfo = topicPartitionReplicaInfoEntry.getValue();
                        size += replicaInfo.size();
                        offsetLag += replicaInfo.offsetLag();
                    }
                }
            }
        }

        partitionDetailsApiResponse.setPartition(partition);
        partitionDetailsApiResponse.setSize(size);
        partitionDetailsApiResponse.setOffsetLag(offsetLag);

        return partitionDetailsApiResponse;
    }

    private LogDirDescription getCorrectLogDirDescription(
            Map<String, LogDirDescription> logDirDescriptionBrokerValue) {
        LogDirDescription logDirDescription = logDirDescriptionBrokerValue.get("/var/lib/kafka/data");
        if (logDirDescription == null) {
            logDirDescription = logDirDescriptionBrokerValue.values().stream().findFirst().orElse(null);
        }
        return logDirDescription;
    }

    public TopicConfigurationApiResponse topicConfigurationApiResponse(
            Map<ConfigResource, Config> configResourceResponse) {
        TopicConfigurationApiResponse response = new TopicConfigurationApiResponse();
        response.setTopicConfiguration(this.topicConfiguration(configResourceResponse));
        return response;
    }

    private Map<String, Object> topicConfiguration(
            Map<ConfigResource, Config> configResourceResponse) {
        if (configResourceResponse == null) {
            return new HashMap<>();
        }
        Set<Map.Entry<ConfigResource, Config>> entries = configResourceResponse.entrySet();
        if (entries.isEmpty()) {
            return new HashMap<>();
        }
        Map.Entry<ConfigResource, Config> entry = entries.iterator().next();
        Config value = entry.getValue();
        return value.entries().stream()
                .collect(Collectors.toMap(ConfigEntry::name, ConfigEntry::value));
    }

    private List<OffsetInfoApiResponse> offsetInfoApiResponses(
            List<com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse>
                    offsetInfoApiResponses) {
        if (offsetInfoApiResponses == null) {
            return Collections.emptyList();
        }
        return offsetInfoApiResponses.stream()
                .map(this::offsetInfoApiResponse)
                .collect(Collectors.toList());
    }

    private OffsetInfoApiResponse offsetInfoApiResponse(
            com.redadani1997.blazingkraft.admin.offset.openapi.model.OffsetInfoApiResponse
                    offsetInfoApiResponse) {
        if (offsetInfoApiResponse == null) {
            return null;
        }

        OffsetInfoApiResponse apiResponse = new OffsetInfoApiResponse();
        apiResponse.setOffset(offsetInfoApiResponse.getOffset());
        apiResponse.setLeaderEpoch(offsetInfoApiResponse.getLeaderEpoch());
        apiResponse.setTimestamp(offsetInfoApiResponse.getTimestamp());
        apiResponse.setTopic(offsetInfoApiResponse.getTopic());
        apiResponse.setPartition(offsetInfoApiResponse.getPartition());

        return apiResponse;
    }
}
