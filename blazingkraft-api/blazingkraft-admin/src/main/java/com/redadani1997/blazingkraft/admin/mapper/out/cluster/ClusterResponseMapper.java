package com.redadani1997.blazingkraft.admin.mapper.out.cluster;

import com.redadani1997.blazingkraft.admin.cluster.openapi.model.*;
import com.redadani1997.blazingkraft.admin.mapper.out.node.NodeResponseMapper;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.kafka.clients.admin.Config;
import org.apache.kafka.clients.admin.ConfigEntry;
import org.apache.kafka.clients.admin.LogDirDescription;
import org.apache.kafka.clients.admin.ReplicaInfo;
import org.apache.kafka.common.Node;
import org.apache.kafka.common.config.ConfigResource;
import org.springframework.stereotype.Component;

@Component
public class ClusterResponseMapper {

    private final NodeResponseMapper nodeResponseMapper;

    public ClusterResponseMapper(NodeResponseMapper nodeResponseMapper) {
        this.nodeResponseMapper = nodeResponseMapper;
    }

    public ClusterMetaApiResponse clusterMetaApiResponse(ClusterModel clusterModel) {
        if (clusterModel == null) {
            return null;
        }
        ClusterMetaApiResponse response = new ClusterMetaApiResponse();
        response.setCode(clusterModel.getCode());
        response.setName(clusterModel.getName());
        response.setColor(clusterModel.getColor());
        response.setSchemaRegistryCode(clusterModel.schemaRegistryCode());
        response.setSchemaRegistryName(clusterModel.schemaRegistryName());
        response.setJmxEnabled(clusterModel.getJmxEnabled());

        return response;
    }

    public List<ClusterMetaApiResponse> clusterMetaApiResponses(List<ClusterModel> clusterModels) {
        if (clusterModels == null) {
            return Collections.emptyList();
        }
        return clusterModels.stream().map(this::clusterMetaApiResponse).collect(Collectors.toList());
    }

    public ClusterDescriptionApiResponse clusterDescriptionApiResponses(
            int topics, String kafkaVersion, String totalBytesWritten, int brokers) {
        ClusterDescriptionApiResponse clusterDescriptionApiResponse =
                new ClusterDescriptionApiResponse();

        clusterDescriptionApiResponse.setTopics(topics);
        clusterDescriptionApiResponse.setKafkaVersion(kafkaVersion);
        clusterDescriptionApiResponse.setTotalBytesWritten(totalBytesWritten);
        clusterDescriptionApiResponse.setBrokers(brokers);

        return clusterDescriptionApiResponse;
    }

    public ClusterDetailsApiResponse clusterDetailsApiResponse(ClusterModel clusterModel) {
        if (clusterModel == null) {
            return null;
        }
        ClusterDetailsApiResponse response = new ClusterDetailsApiResponse();
        response.setCode(clusterModel.getCode());
        response.setName(clusterModel.getName());
        response.setColor(clusterModel.getColor());
        response.setSchemaRegistryCode(clusterModel.schemaRegistryCode());
        response.setCommonConfiguration(clusterModel.commonConfiguration());
        response.setJmxEnabled(clusterModel.getJmxEnabled());
        response.setJmxUrl(clusterModel.getJmxUrl());
        response.setJmxEnvironment(clusterModel.jmxEnvironment());

        return response;
    }

    public ClusterMonitoringApiResponse clusterMonitoringApiResponse(
            String bytesInPerSecCount,
            String bytesInPerSecMeanRate,
            String bytesOutPerSecCount,
            String bytesOutPerSecMeanRate,
            String totalFetchRequestsPerSecCount,
            String totalFetchRequestsPerSecMeanRate,
            String totalProduceRequestsPerSecCount,
            String totalProduceRequestsPerSecMeanRate,
            String underReplicatedPartitions,
            String leaderElectionRateAndTimeMsCount,
            String leaderElectionRateAndTimeMsMeanRate,
            String activeControllerCount,
            String offlinePartitionsCount,
            String totalTimeMsProduceCount,
            String totalTimeMsProduceMean,
            String totalTimeMsFetchCount,
            String totalTimeMsFetchMean,
            String totalTimeMsFetchConsumerCount,
            String totalTimeMsFetchConsumerMean,
            String totalTimeMsFetchFollowerCount,
            String totalTimeMsFetchFollowerMean,
            String linuxDiskWriteBytes,
            String linuxDiskReadBytes) {
        ClusterMonitoringApiResponse clusterMonitoringApiResponse = new ClusterMonitoringApiResponse();

        clusterMonitoringApiResponse.setBytesInPerSecCount(bytesInPerSecCount);
        clusterMonitoringApiResponse.setBytesInPerSecMeanRate(bytesInPerSecMeanRate);
        clusterMonitoringApiResponse.setBytesOutPerSecCount(bytesOutPerSecCount);
        clusterMonitoringApiResponse.setBytesOutPerSecMeanRate(bytesOutPerSecMeanRate);
        clusterMonitoringApiResponse.setTotalFetchRequestsPerSecCount(totalFetchRequestsPerSecCount);
        clusterMonitoringApiResponse.setTotalFetchRequestsPerSecMeanRate(
                totalFetchRequestsPerSecMeanRate);
        clusterMonitoringApiResponse.setTotalProduceRequestsPerSecCount(
                totalProduceRequestsPerSecCount);
        clusterMonitoringApiResponse.setTotalProduceRequestsPerSecMeanRate(
                totalProduceRequestsPerSecMeanRate);
        clusterMonitoringApiResponse.setUnderReplicatedPartitions(underReplicatedPartitions);
        clusterMonitoringApiResponse.setLeaderElectionRateAndTimeMsCount(
                leaderElectionRateAndTimeMsCount);
        clusterMonitoringApiResponse.setLeaderElectionRateAndTimeMsMeanRate(
                leaderElectionRateAndTimeMsMeanRate);
        clusterMonitoringApiResponse.setActiveControllerCount(activeControllerCount);
        clusterMonitoringApiResponse.setOfflinePartitionsCount(offlinePartitionsCount);
        clusterMonitoringApiResponse.setTotalTimeMsProduceCount(totalTimeMsProduceCount);
        clusterMonitoringApiResponse.setTotalTimeMsProduceMean(totalTimeMsProduceMean);
        clusterMonitoringApiResponse.setTotalTimeMsFetchCount(totalTimeMsFetchCount);
        clusterMonitoringApiResponse.setTotalTimeMsFetchMean(totalTimeMsFetchMean);
        clusterMonitoringApiResponse.setTotalTimeMsFetchConsumerCount(totalTimeMsFetchConsumerCount);
        clusterMonitoringApiResponse.setTotalTimeMsFetchConsumerMean(totalTimeMsFetchConsumerMean);
        clusterMonitoringApiResponse.setTotalTimeMsFetchFollowerCount(totalTimeMsFetchFollowerCount);
        clusterMonitoringApiResponse.setTotalTimeMsFetchFollowerMean(totalTimeMsFetchFollowerMean);
        clusterMonitoringApiResponse.setLinuxDiskWriteBytes(linuxDiskWriteBytes);
        clusterMonitoringApiResponse.setLinuxDiskReadBytes(linuxDiskReadBytes);

        return clusterMonitoringApiResponse;
    }

    public List<ClusterBrokerDetailsApiResponse> clusterBrokerDetailsApiResponses(
            Collection<Node> nodes, Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions) {
        if (nodes == null) {
            return Collections.emptyList();
        }
        return nodes.stream()
                .map(node -> this.clusterBrokerDetailsApiResponse(node, lodDirDescriptions))
                .collect(Collectors.toList());
    }

    private ClusterBrokerDetailsApiResponse clusterBrokerDetailsApiResponse(
            Node node, Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions) {
        if (node == null) {
            return null;
        }
        Long totalReplicasSize = 0L;
        Long totalOffsetLag = 0L;
        Long totalBytes = null;
        Long usableBytes = null;
        ClusterBrokerDetailsApiResponse response = new ClusterBrokerDetailsApiResponse();

        if (lodDirDescriptions != null && lodDirDescriptions.get(node.id()) != null) {
            Map<String, LogDirDescription> logDirDescriptions = lodDirDescriptions.get(node.id());
            LogDirDescription logDirDescription = logDirDescriptions.get("/var/lib/kafka/data");
            if (logDirDescription != null) {
                if (logDirDescription.totalBytes().isPresent()) {
                    totalBytes = logDirDescription.totalBytes().getAsLong();
                }
                if (logDirDescription.usableBytes().isPresent()) {
                    usableBytes = logDirDescription.usableBytes().getAsLong();
                }
                for (ReplicaInfo replicaInfo : logDirDescription.replicaInfos().values()) {
                    totalReplicasSize += replicaInfo.size();
                    totalOffsetLag += replicaInfo.offsetLag();
                }
            }
        }
        response.setTotalBytes(totalBytes);
        response.setUsableBytes(usableBytes);
        response.setTotalReplicasSize(totalReplicasSize);
        response.setTotalOffsetLag(totalOffsetLag);
        response.setNode(this.nodeResponseMapper.clusterNodeApiResponse(node));

        return response;
    }

    public ClusterBrokerConfigurationApiResponse clusterBrokerConfigurationApiResponse(
            Map<ConfigResource, Config> configs) {
        ClusterBrokerConfigurationApiResponse response = new ClusterBrokerConfigurationApiResponse();
        if (configs == null || configs.size() == 0) {
            response.setConfiguration(new ArrayList<>());
            return response;
        }

        Config config = configs.values().iterator().next();

        List<CommonKafkaConfigurationApiResponse> entries =
                config.entries().stream().map(this::commonKafkaConfigurationApiResponse).toList();

        response.setConfiguration(entries);

        return response;
    }

    private CommonKafkaConfigurationApiResponse commonKafkaConfigurationApiResponse(
            ConfigEntry configEntry) {
        CommonKafkaConfigurationApiResponse response = new CommonKafkaConfigurationApiResponse();
        response.setName(configEntry.name());
        response.setValue(configEntry.value());
        response.setReadOnly(configEntry.isReadOnly());
        response.setSensitive(configEntry.isSensitive());
        response.setSource(EnumUtils.toName(configEntry.source()));
        response.setType(EnumUtils.toName(configEntry.type()));
        response.setDocumentation(configEntry.documentation());
        return response;
    }
}
