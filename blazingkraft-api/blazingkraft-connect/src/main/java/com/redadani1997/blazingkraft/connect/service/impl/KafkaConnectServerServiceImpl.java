package com.redadani1997.blazingkraft.connect.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.connect.CommonKafkaConnectClient;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import com.redadani1997.blazingkraft.connect.dto.in.server.*;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerDescriptionApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerDetailsApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerMetaApiResponse;
import com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model.KafkaConnectServerMonitoringApiResponse;
import com.redadani1997.blazingkraft.connect.mapper.out.KafkaConnectResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.server.KafkaConnectServerResponseMapper;
import com.redadani1997.blazingkraft.connect.service.KafkaConnectServerService;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.KafkaConnectDao;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import com.redadani1997.blazingkraft.error.connect.KafkaConnectServerException;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaConnectServerServiceImpl implements KafkaConnectServerService {
    private final KafkaConnectResponseMapper kafkaConnectResponseMapper;
    private final KafkaConnectDao kafkaConnectDao;
    private final ClusterDao clusterDao;
    private final ClientsFactory clientsFactory;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    @Transactional
    public KafkaConnectServerMetaApiResponse createKafkaConnectServer(
            KafkaConnectServerCreateRequest request) {
        if (request.getJmxEnabled()) {
            this.testKafkaConnectServerJmxConnectivity(
                    KafkaConnectServerJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        ClusterModel clusterModel = null;

        if (request.getClusterCode() != null) {
            clusterModel = this.clusterDao.findByCode(request.getClusterCode());
        }

        KafkaConnectModel kafkaConnectModel = new KafkaConnectModel();
        kafkaConnectModel.setName(request.getName());
        kafkaConnectModel.setCode(request.getCode());
        kafkaConnectModel.setColor(request.getColor());
        kafkaConnectModel.setUrl(request.getUrl());
        kafkaConnectModel.setBasicAuthEnabled(request.getBasicAuthEnabled());
        kafkaConnectModel.setBasicAuthUsername(request.getBasicAuthUsername());
        kafkaConnectModel.setBasicAuthPassword(request.getBasicAuthPassword());
        kafkaConnectModel.setClusterModel(clusterModel);

        kafkaConnectModel.setJmxEnabled(request.getJmxEnabled());
        kafkaConnectModel.setJmxUrl(request.getJmxUrl());
        kafkaConnectModel.setJmxEnvironment(request.getJmxEnvironment());

        KafkaConnectModel savedKafkaConnectModel = this.kafkaConnectDao.create(kafkaConnectModel);

        this.applicationEventPublisher.publishEvent(
                new KafkaConnectCreatedApplicationEvent(savedKafkaConnectModel.getCode()));

        return this.kafkaConnectServerResponseMapper()
                .kafkaConnectServerMetaApiResponse(savedKafkaConnectModel);
    }

    @Transactional
    @Override
    public KafkaConnectServerMetaApiResponse editKafkaConnectServer(
            KafkaConnectServerEditRequest request) {
        KafkaConnectModel kafkaConnectModel = this.kafkaConnectDao.findByCode(request.getCode());

        if (request.getJmxEnabled()) {
            this.testKafkaConnectServerJmxConnectivity(
                    KafkaConnectServerJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        ClusterModel clusterModel = null;

        if (request.getClusterCode() != null) {
            clusterModel = this.clusterDao.findByCode(request.getClusterCode());
        }

        kafkaConnectModel.setColor(request.getColor());
        kafkaConnectModel.setUrl(request.getUrl());
        kafkaConnectModel.setBasicAuthEnabled(request.getBasicAuthEnabled());
        kafkaConnectModel.setBasicAuthUsername(request.getBasicAuthUsername());
        kafkaConnectModel.setBasicAuthPassword(request.getBasicAuthPassword());
        kafkaConnectModel.setClusterModel(clusterModel);

        kafkaConnectModel.setJmxEnabled(request.getJmxEnabled());
        kafkaConnectModel.setJmxUrl(request.getJmxUrl());
        kafkaConnectModel.setJmxEnvironment(request.getJmxEnvironment());

        KafkaConnectModel savedKafkaConnectModel = this.kafkaConnectDao.update(kafkaConnectModel);

        KafkaConnectEditedApplicationEvent event =
                new KafkaConnectEditedApplicationEvent(savedKafkaConnectModel.getCode());
        this.applicationEventPublisher.publishEvent(event);

        return this.kafkaConnectServerResponseMapper()
                .kafkaConnectServerMetaApiResponse(savedKafkaConnectModel);
    }

    @Override
    public KafkaConnectServerDescriptionApiResponse describeKafkaConnectServer() {
        String url = "/";
        Map<String, String> params = new HashMap<>();

        String json =
                this.currentKafkaConnectClient()
                        .restTemplate()
                        .exchange(url, HttpMethod.GET, null, String.class, params)
                        .getBody();
        return this.kafkaConnectServerResponseMapper().kafkaConnectServerDescriptionApiResponse(json);
    }

    @Override
    public List<KafkaConnectServerDescriptionApiResponse> describeKafkaConnectServers() {
        return null;
    }

    @Override
    public List<KafkaConnectServerMetaApiResponse> getAllKafkaConnectServersMeta() {
        List<KafkaConnectModel> models = this.kafkaConnectDao.findAll();
        return this.kafkaConnectServerResponseMapper().kafkaConnectServerMetaApiResponses(models);
    }

    @Override
    public KafkaConnectServerMetaApiResponse getKafkaConnectServerMeta() {
        String kafkaConnectCode = this.currentKafkaConnectClient().kafkaConnectCode();
        KafkaConnectModel kafkaConnectModel = this.kafkaConnectDao.findByCode(kafkaConnectCode);
        return this.kafkaConnectServerResponseMapper()
                .kafkaConnectServerMetaApiResponse(kafkaConnectModel);
    }

    @Override
    public void testKafkaConnectServerClientConnectivity(
            KafkaConnectServerClientConnectivityRequest request) {
        try {
            CommonRestClient kafkaConnectClient =
                    this.clientsFactory.createKafkaConnectClient(
                            request.getUrl(),
                            request.getBasicAuthEnabled(),
                            request.getBasicAuthUsername(),
                            request.getBasicAuthPassword());
            kafkaConnectClient.restTemplate().getForEntity("/", String.class);
        } catch (Exception ex) {
            throw new KafkaConnectServerException(ex);
        }
    }

    @Override
    public void testKafkaConnectServerJmxConnectivity(
            KafkaConnectServerJmxConnectivityRequest request) {
        try (CommonJmxClient client =
                CommonJmxClient.create(request.getJmxUrl(), request.getJmxEnvironment())) {
            client.testConnection();
        } catch (Exception ex) {
            throw new KafkaConnectServerException(ex);
        }
    }

    @Transactional
    @Override
    public void deleteKafkaConnectServer(KafkaConnectServerDeleteRequest request) {
        KafkaConnectModel kafkaConnectModel = this.kafkaConnectDao.findByCode(request.getCode());

        this.kafkaConnectDao.deleteById(kafkaConnectModel.getId());

        KafkaConnectDeletedApplicationEvent event =
                new KafkaConnectDeletedApplicationEvent(request.getCode());
        this.applicationEventPublisher.publishEvent(event);
    }

    @Override
    public KafkaConnectServerMonitoringApiResponse monitorKafkaConnectServerDetails() {

        String connectorCount = null;
        String connectorStartupAttemptsTotal = null;
        String connectorStartupFailurePercentage = null;
        String connectorStartupFailureTotal = null;
        String connectorStartupSuccessPercentage = null;
        String connectorStartupSuccessTotal = null;
        String taskCount = null;
        String taskStartupAttemptsTotal = null;
        String taskStartupFailurePercentage = null;
        String taskStartupFailureTotal = null;
        String taskStartupSuccessPercentage = null;
        String taskStartupSuccessTotal = null;

        CommonJmxClient jmx = this.currentKafkaConnectClient().jmx();
        if (jmx != null) {
            String objectName = "kafka.connect:type=connect-worker-metrics";
            connectorCount = jmx.getStringValue(objectName, "connector-count");
            connectorStartupAttemptsTotal =
                    jmx.getStringValue(objectName, "connector-startup-attempts-total");
            connectorStartupFailurePercentage =
                    jmx.getStringValue(objectName, "connector-startup-failure-percentage");
            connectorStartupFailureTotal =
                    jmx.getStringValue(objectName, "connector-startup-failure-total");
            connectorStartupSuccessPercentage =
                    jmx.getStringValue(objectName, "connector-startup-success-percentage");
            connectorStartupSuccessTotal =
                    jmx.getStringValue(objectName, "connector-startup-success-total");
            taskCount = jmx.getStringValue(objectName, "task-count");
            taskStartupAttemptsTotal = jmx.getStringValue(objectName, "task-startup-attempts-total");
            taskStartupFailurePercentage =
                    jmx.getStringValue(objectName, "task-startup-failure-percentage");
            taskStartupFailureTotal = jmx.getStringValue(objectName, "task-startup-failure-total");
            taskStartupSuccessPercentage =
                    jmx.getStringValue(objectName, "task-startup-success-percentage");
            taskStartupSuccessTotal = jmx.getStringValue(objectName, "task-startup-success-total");
        }

        return this.kafkaConnectServerResponseMapper()
                .kafkaConnectServerMonitoringApiResponse(
                        connectorCount,
                        connectorStartupAttemptsTotal,
                        connectorStartupFailurePercentage,
                        connectorStartupFailureTotal,
                        connectorStartupSuccessPercentage,
                        connectorStartupSuccessTotal,
                        taskCount,
                        taskStartupAttemptsTotal,
                        taskStartupFailurePercentage,
                        taskStartupFailureTotal,
                        taskStartupSuccessPercentage,
                        taskStartupSuccessTotal);
    }

    @Override
    public KafkaConnectServerDetailsApiResponse getKafkaConnectServerDetails(
            KafkaConnectServerDetailsRequest request) {
        KafkaConnectModel kafkaConnectModel = this.kafkaConnectDao.findByCode(request.getCode());

        return this.kafkaConnectServerResponseMapper()
                .kafkaConnectServerDetailsApiResponse(kafkaConnectModel);
    }

    private CommonKafkaConnectClient currentKafkaConnectClient() {
        return this.clientsFactory.currentKafkaConnectClient();
    }

    private KafkaConnectServerResponseMapper kafkaConnectServerResponseMapper() {
        return this.kafkaConnectResponseMapper.kafkaConnectServerResponseMapper();
    }
}
