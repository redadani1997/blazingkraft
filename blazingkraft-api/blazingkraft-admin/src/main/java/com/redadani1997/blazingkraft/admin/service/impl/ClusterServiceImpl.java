package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.cluster.openapi.model.*;
import com.redadani1997.blazingkraft.admin.dto.in.cluster.*;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.cluster.ClusterResponseMapper;
import com.redadani1997.blazingkraft.admin.service.ClusterService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.application_event.ClusterCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ClusterDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ClusterEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.common.util.CommonEqualityUtils;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.*;
import com.redadani1997.blazingkraft.error.admin.ClusterException;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.KafkaException;
import org.apache.kafka.common.Node;
import org.apache.kafka.common.config.ConfigResource;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClusterServiceImpl implements ClusterService {

    private final AdminResponseMapper adminResponseMapper;
    private final ClientsFactory clientsFactory;
    private final ClusterDao clusterDao;
    private final SchemaRegistryDao schemaRegistryDao;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    @Transactional
    public ClusterMetaApiResponse createCluster(ClusterCreateRequest request) {
        if (request.getJmxEnabled()) {
            this.testClusterJmxConnectivity(
                    ClusterJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }
        // Create Cluster in DB
        ClusterModel clusterModel = new ClusterModel();
        clusterModel.setCode(request.getCode());
        clusterModel.setName(request.getName());
        clusterModel.setColor(request.getColor());
        clusterModel.setCommonConfiguration(request.getCommonConfiguration());
        clusterModel.setJmxEnabled(request.getJmxEnabled());
        clusterModel.setJmxUrl(request.getJmxUrl());
        clusterModel.setJmxEnvironment(request.getJmxEnvironment());

        String schemaRegistryCode = request.getSchemaRegistryCode();
        if (schemaRegistryCode != null) {
            SchemaRegistryModel schemaRegistryModel =
                    this.schemaRegistryDao.findByCode(schemaRegistryCode);
            clusterModel.setSchemaRegistryModel(schemaRegistryModel);
        }

        ClusterModel savedClusterModel = this.clusterDao.create(clusterModel);

        this.applicationEventPublisher.publishEvent(
                new ClusterCreatedApplicationEvent(savedClusterModel.getCode()));

        return this.clusterResponseMapper().clusterMetaApiResponse(savedClusterModel);
    }

    @Override
    @Transactional
    public ClusterMetaApiResponse editCluster(ClusterEditRequest request) {
        ClusterModel clusterModel = this.clusterDao.findByCode(request.getCode());

        if (request.getJmxEnabled()) {
            this.testClusterJmxConnectivity(
                    ClusterJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        this.validateSchemaRegistry(request, clusterModel);

        String schemaRegistryCode = request.getSchemaRegistryCode();
        if (schemaRegistryCode != null) {
            SchemaRegistryModel schemaRegistryModel =
                    this.schemaRegistryDao.findByCode(schemaRegistryCode);
            clusterModel.setSchemaRegistryModel(schemaRegistryModel);
        } else {
            clusterModel.setSchemaRegistryModel(null);
        }

        clusterModel.setColor(request.getColor());
        clusterModel.setCommonConfiguration(request.getCommonConfiguration());

        clusterModel.setJmxEnabled(request.getJmxEnabled());
        clusterModel.setJmxUrl(request.getJmxUrl());
        clusterModel.setJmxEnvironment(request.getJmxEnvironment());

        ClusterModel savedClusterModel = this.clusterDao.update(clusterModel);

        this.applicationEventPublisher.publishEvent(
                new ClusterEditedApplicationEvent(savedClusterModel.getCode()));

        return this.clusterResponseMapper().clusterMetaApiResponse(savedClusterModel);
    }

    @Override
    public List<ClusterMetaApiResponse> findAllClusters() {
        List<ClusterModel> clusterModels = this.clusterDao.findAll();
        return this.clusterResponseMapper().clusterMetaApiResponses(clusterModels);
    }

    @Override
    public void testClusterClientConnectivity(
            ClusterClientConnectivityRequest clusterClientConnectivityRequest) {
        try (Admin admin =
                this.clientsFactory.createAdminClient(
                        clusterClientConnectivityRequest.getCommonConfiguration())) {
            ListTopicsOptions options = new ListTopicsOptions().timeoutMs(15000);
            KafkaFutureUtils.resolve(admin.listTopics(options).listings(), KafkaFutureMode.ADMIN);
        } catch (Exception ex) {
            Throwable rootCause = ex;
            if (ex instanceof KafkaException) {
                rootCause = ex.getCause() != null ? ex.getCause() : ex;
            }
            throw new ClusterException(rootCause);
        }
    }

    @Override
    public void testClusterJmxConnectivity(
            ClusterJmxConnectivityRequest clusterJmxConnectivityRequest) {
        try (CommonJmxClient client =
                CommonJmxClient.create(
                        clusterJmxConnectivityRequest.getJmxUrl(),
                        clusterJmxConnectivityRequest.getJmxEnvironment())) {
            client.testConnection();
        } catch (Exception ex) {
            throw new ClusterException(ex);
        }
    }

    @Override
    @Transactional
    public void deleteCluster(ClusterDeleteRequest request) {
        ClusterModel clusterModel = this.clusterDao.findByCode(request.getCode());

        List<KafkaConnectModel> kafkaConnectModels = clusterModel.getKafkaConnectModels();

        if (kafkaConnectModels != null && kafkaConnectModels.size() > 0) {
            throw new ClusterException(
                    "Cluster has Kafka Connects associated with it. Please delete them first.");
        }

        this.clusterDao.deleteById(clusterModel.getId());

        this.applicationEventPublisher.publishEvent(
                new ClusterDeletedApplicationEvent(request.getCode()));
    }

    @Override
    public ClusterDetailsApiResponse getClusterDetails(ClusterDetailsRequest request) {
        ClusterModel clusterModel = this.clusterDao.findByCode(request.getCode());
        return this.clusterResponseMapper().clusterDetailsApiResponse(clusterModel);
    }

    @Override
    public List<ClusterBrokerDetailsApiResponse> getClusterBrokersDetails() {
        DescribeClusterResult describeClusterResult =
                this.currentAdminClient().client().describeCluster();

        Collection<Node> nodes =
                KafkaFutureUtils.resolve(describeClusterResult.nodes(), KafkaFutureMode.ADMIN);

        List<Integer> nodeIds = nodes.stream().map(Node::id).toList();

        DescribeLogDirsResult describeLogDirsResult =
                this.currentAdminClient().client().describeLogDirs(nodeIds);
        Map<Integer, Map<String, LogDirDescription>> lodDirDescriptions =
                KafkaFutureUtils.resolve(describeLogDirsResult.allDescriptions(), KafkaFutureMode.ADMIN);

        return this.clusterResponseMapper().clusterBrokerDetailsApiResponses(nodes, lodDirDescriptions);
    }

    @Override
    public ClusterBrokerConfigurationApiResponse getClusterBrokerConfiguration(
            ClusterBrokerConfigurationRequest request) {
        DescribeConfigsOptions options = new DescribeConfigsOptions();
        options.includeSynonyms(false);
        options.includeDocumentation(true);

        ConfigResource configResource =
                new ConfigResource(ConfigResource.Type.BROKER, request.getId().toString());
        Collection<ConfigResource> resources = List.of(configResource);

        DescribeConfigsResult describeConfigsResult =
                this.currentAdminClient().client().describeConfigs(resources, options);

        Map<ConfigResource, Config> configs =
                KafkaFutureUtils.resolve(describeConfigsResult.all(), KafkaFutureMode.ADMIN);

        return this.clusterResponseMapper().clusterBrokerConfigurationApiResponse(configs);
    }

    @Override
    public ClusterMonitoringApiResponse monitorCluster() {
        CommonJmxClient jmx = this.currentAdminClient().jmx();

        String bytesInPerSecCount = null;
        String bytesInPerSecMeanRate = null;
        String bytesOutPerSecCount = null;
        String bytesOutPerSecMeanRate = null;
        String totalFetchRequestsPerSecCount = null;
        String totalFetchRequestsPerSecMeanRate = null;
        String totalProduceRequestsPerSecCount = null;
        String totalProduceRequestsPerSecMeanRate = null;
        String underReplicatedPartitions = null;
        String leaderElectionRateAndTimeMsCount = null;
        String leaderElectionRateAndTimeMsMeanRate = null;
        String activeControllerCount = null;
        String offlinePartitionsCount = null;
        String totalTimeMsProduceCount = null;
        String totalTimeMsProduceMean = null;
        String totalTimeMsFetchCount = null;
        String totalTimeMsFetchMean = null;
        String totalTimeMsFetchConsumerCount = null;
        String totalTimeMsFetchConsumerMean = null;
        String totalTimeMsFetchFollowerCount = null;
        String totalTimeMsFetchFollowerMean = null;
        String linuxDiskWriteBytes = null;
        String linuxDiskReadBytes = null;

        // # kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec   Count MeanRate
        // # kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec  Count MeanRate
        // # kafka.server:type=BrokerTopicMetrics,name=TotalFetchRequestsPerSec Count MeanRate
        // # kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec Count MeanRate
        // # kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions Value
        // # kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs MeanRate Count
        // # kafka.controller:type=KafkaController,name=ActiveControllerCount Value
        // # kafka.controller:type=KafkaController,name=OfflinePartitionsCount Value
        // #
        // kafka.network:type=RequestMetrics,name=TotalTimeMs,request={Fetch|Produce|FetchConsumer|FetchFollower} Mean Count
        // # kafka.server:type=KafkaServer,name=linux-disk-write-bytes Value
        // # kafka.server:type=KafkaServer,name=linux-disk-read-bytes Value

        if (jmx != null) {
            bytesInPerSecCount =
                    jmx.getStringValue("kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec", "Count");
            bytesInPerSecMeanRate =
                    jmx.getStringValue("kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec", "MeanRate");
            bytesOutPerSecCount =
                    jmx.getStringValue("kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec", "Count");
            bytesOutPerSecMeanRate =
                    jmx.getStringValue(
                            "kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec", "MeanRate");
            totalFetchRequestsPerSecCount =
                    jmx.getStringValue(
                            "kafka.server:type=BrokerTopicMetrics,name=TotalFetchRequestsPerSec", "Count");
            totalFetchRequestsPerSecMeanRate =
                    jmx.getStringValue(
                            "kafka.server:type=BrokerTopicMetrics,name=TotalFetchRequestsPerSec", "MeanRate");
            totalProduceRequestsPerSecCount =
                    jmx.getStringValue(
                            "kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec", "Count");
            totalProduceRequestsPerSecMeanRate =
                    jmx.getStringValue(
                            "kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec", "MeanRate");
            underReplicatedPartitions =
                    jmx.getStringValue(
                            "kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions", "Value");
            leaderElectionRateAndTimeMsCount =
                    jmx.getStringValue(
                            "kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs", "Count");
            leaderElectionRateAndTimeMsMeanRate =
                    jmx.getStringValue(
                            "kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs", "MeanRate");
            activeControllerCount =
                    jmx.getStringValue(
                            "kafka.controller:type=KafkaController,name=ActiveControllerCount", "Value");
            offlinePartitionsCount =
                    jmx.getStringValue(
                            "kafka.controller:type=KafkaController,name=OfflinePartitionsCount", "Value");
            totalTimeMsProduceCount =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Produce", "Count");
            totalTimeMsProduceMean =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Produce", "Mean");
            totalTimeMsFetchCount =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Fetch", "Count");
            totalTimeMsFetchMean =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Fetch", "Mean");
            totalTimeMsFetchConsumerCount =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchConsumer", "Count");
            totalTimeMsFetchConsumerMean =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchConsumer", "Mean");
            totalTimeMsFetchFollowerCount =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchFollower", "Count");
            totalTimeMsFetchFollowerMean =
                    jmx.getStringValue(
                            "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchFollower", "Mean");
            linuxDiskWriteBytes =
                    jmx.getStringValue("kafka.server:type=KafkaServer,name=linux-disk-write-bytes", "Value");
            linuxDiskReadBytes =
                    jmx.getStringValue("kafka.server:type=KafkaServer,name=linux-disk-read-bytes", "Value");
        }

        return this.clusterResponseMapper()
                .clusterMonitoringApiResponse(
                        bytesInPerSecCount,
                        bytesInPerSecMeanRate,
                        bytesOutPerSecCount,
                        bytesOutPerSecMeanRate,
                        totalFetchRequestsPerSecCount,
                        totalFetchRequestsPerSecMeanRate,
                        totalProduceRequestsPerSecCount,
                        totalProduceRequestsPerSecMeanRate,
                        underReplicatedPartitions,
                        leaderElectionRateAndTimeMsCount,
                        leaderElectionRateAndTimeMsMeanRate,
                        activeControllerCount,
                        offlinePartitionsCount,
                        totalTimeMsProduceCount,
                        totalTimeMsProduceMean,
                        totalTimeMsFetchCount,
                        totalTimeMsFetchMean,
                        totalTimeMsFetchConsumerCount,
                        totalTimeMsFetchConsumerMean,
                        totalTimeMsFetchFollowerCount,
                        totalTimeMsFetchFollowerMean,
                        linuxDiskWriteBytes,
                        linuxDiskReadBytes);
    }

    @Override
    public ClusterDescriptionApiResponse describeCluster() {
        try {
            ListTopicsOptions listTopicsOptions = new ListTopicsOptions();
            listTopicsOptions.listInternal(true);
            ListTopicsResult listTopicsResult =
                    this.currentAdminClient().client().listTopics(listTopicsOptions);
            Set<String> topicNames =
                    KafkaFutureUtils.resolve(listTopicsResult.names(), KafkaFutureMode.ADMIN);

            DescribeClusterResult describeClusterResult =
                    this.currentAdminClient().client().describeCluster();
            Collection<Node> nodes =
                    KafkaFutureUtils.resolve(describeClusterResult.nodes(), KafkaFutureMode.ADMIN);
            int brokers = nodes.size();

            CommonJmxClient jmx = this.currentAdminClient().jmx();
            String kafkaVersion = null;
            String totalBytesWritten = null;

            if (jmx != null) {
                kafkaVersion = jmx.getStringValue("kafka.server:type=app-info", "version");
                totalBytesWritten =
                        jmx.getStringValue(
                                "kafka.server:type=KafkaServer,name=linux-disk-write-bytes", "Value");
            }
            return this.clusterResponseMapper()
                    .clusterDescriptionApiResponses(
                            topicNames.size(), kafkaVersion, totalBytesWritten, brokers);
        } catch (Exception ex) {
            if (ex instanceof KafkaException) {
                Throwable rootCause = ex.getCause() != null ? ex.getCause() : ex;
                throw new ClusterException(rootCause);
            }
            throw new ClusterException(ex);
        }
    }

    @Override
    public ClusterMetaApiResponse findClusterMeta(String clusterCode) {
        ClusterModel clusterModel = this.clusterDao.findByCode(clusterCode);
        return this.clusterResponseMapper().clusterMetaApiResponse(clusterModel);
    }

    private void validateSchemaRegistry(ClusterEditRequest request, ClusterModel clusterModel) {
        String oldSchemaRegistryCode = clusterModel.schemaRegistryCode();
        String newSchemaRegistryCode = request.getSchemaRegistryCode();

        if (CommonEqualityUtils.equals(oldSchemaRegistryCode, newSchemaRegistryCode)) {
            return;
        }

        ProducerModel producerModel = clusterModel.getProducerModel();
        ConsumerModel consumerModel = clusterModel.getConsumerModel();

        String keySerializer = producerModel.getKeySerializer();
        String valueSerializer = producerModel.getValueSerializer();

        String keyDeserializer = consumerModel.getKeyDeserializer();
        String valueDeserializer = consumerModel.getValueDeserializer();

        boolean isSchemaRegistrySerde =
                isSchemaRegistrySerde(keySerializer)
                        || isSchemaRegistrySerde(valueSerializer)
                        || isSchemaRegistrySerde(keyDeserializer)
                        || isSchemaRegistrySerde(valueDeserializer);

        if (isSchemaRegistrySerde) {
            throw new ClusterException(
                    "Cluster cannot be linked to a different Schema Registry if its actively being used by Producer/Consumer.");
        }
    }

    private static boolean isSchemaRegistrySerde(String serdeStr) {
        if (serdeStr == null) {
            return false;
        }
        CommonSerde serde = EnumUtils.fromName(CommonSerde.class, serdeStr);

        return serde.equals(CommonSerde.AVRO_SCHEMA_REGISTRY)
                || serde.equals(CommonSerde.JSON_SCHEMA_REGISTRY)
                || serde.equals(CommonSerde.PROTOBUF_SCHEMA_REGISTRY);
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private ClusterResponseMapper clusterResponseMapper() {
        return this.adminResponseMapper.clusterResponseMapper();
    }
}
