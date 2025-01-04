package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.dao.dao.KsqlDbDao;
import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbServerException;
import com.redadani1997.blazingkraft.ksqldb.dto.in.server.*;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerDescriptionApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerDetailsApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerMetaApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerMonitoringApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.server.KsqlDbServerResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbServerService;
import io.confluent.ksql.api.client.Client;
import io.confluent.ksql.api.client.ServerInfo;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KsqlDbServerServiceImpl implements KsqlDbServerService {
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final KsqlDbDao ksqlDbDao;
    private final ClientsFactory clientsFactory;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    @Transactional
    public KsqlDbServerMetaApiResponse createKsqlDbServer(KsqlDbServerCreateRequest request) {
        if (request.getJmxEnabled()) {
            this.testKsqlDbServerJmxConnectivity(
                    KsqlDbServerJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        KsqlDbModel ksqlDbModel = new KsqlDbModel();

        ksqlDbModel.setName(request.getName());
        ksqlDbModel.setCode(request.getCode());
        ksqlDbModel.setColor(request.getColor());
        ksqlDbModel.setHost(request.getHost());
        ksqlDbModel.setPort(request.getPort());
        ksqlDbModel.setBasicAuthEnabled(request.getBasicAuthEnabled());
        ksqlDbModel.setBasicAuthUsername(request.getBasicAuthUsername());
        ksqlDbModel.setBasicAuthPassword(request.getBasicAuthPassword());
        ksqlDbModel.setKeyStoreEnabled(request.getKeyStoreEnabled());
        ksqlDbModel.setKeyStore(request.getKeyStore());
        ksqlDbModel.setKeyStorePassword(request.getKeyStorePassword());
        ksqlDbModel.setTrustStoreEnabled(request.getTrustStoreEnabled());
        ksqlDbModel.setTrustStore(request.getTrustStore());
        ksqlDbModel.setTrustStorePassword(request.getTrustStorePassword());
        ksqlDbModel.setUseTls(request.getUseTls());
        ksqlDbModel.setVerifyHost(request.getVerifyHost());
        ksqlDbModel.setUseAlpn(request.getUseAlpn());
        ksqlDbModel.setExecuteQueryMaxResultRows(request.getExecuteQueryMaxResultRows());

        ksqlDbModel.setJmxEnabled(request.getJmxEnabled());
        ksqlDbModel.setJmxUrl(request.getJmxUrl());
        ksqlDbModel.setJmxEnvironment(request.getJmxEnvironment());

        KsqlDbModel savedKsqlDbModel = this.ksqlDbDao.create(ksqlDbModel);

        this.applicationEventPublisher.publishEvent(
                new KsqlDbCreatedApplicationEvent(savedKsqlDbModel.getCode()));

        return this.ksqlDbServerResponseMapper().ksqlDbServerMetaApiResponse(savedKsqlDbModel);
    }

    @Transactional
    @Override
    public KsqlDbServerMetaApiResponse editKsqlDbServer(KsqlDbServerEditRequest request) {
        KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(request.getCode());

        if (request.getJmxEnabled()) {
            this.testKsqlDbServerJmxConnectivity(
                    KsqlDbServerJmxConnectivityRequest.builder()
                            .jmxUrl(request.getJmxUrl())
                            .jmxEnvironment(request.getJmxEnvironment())
                            .build());
        }

        ksqlDbModel.setColor(request.getColor());
        ksqlDbModel.setHost(request.getHost());
        ksqlDbModel.setPort(request.getPort());
        ksqlDbModel.setBasicAuthEnabled(request.getBasicAuthEnabled());
        ksqlDbModel.setBasicAuthUsername(request.getBasicAuthUsername());
        ksqlDbModel.setBasicAuthPassword(request.getBasicAuthPassword());
        ksqlDbModel.setKeyStoreEnabled(request.getKeyStoreEnabled());
        ksqlDbModel.setKeyStore(request.getKeyStore());
        ksqlDbModel.setKeyStorePassword(request.getKeyStorePassword());
        ksqlDbModel.setTrustStoreEnabled(request.getTrustStoreEnabled());
        ksqlDbModel.setTrustStore(request.getTrustStore());
        ksqlDbModel.setTrustStorePassword(request.getTrustStorePassword());
        ksqlDbModel.setUseTls(request.getUseTls());
        ksqlDbModel.setVerifyHost(request.getVerifyHost());
        ksqlDbModel.setUseAlpn(request.getUseAlpn());
        ksqlDbModel.setExecuteQueryMaxResultRows(request.getExecuteQueryMaxResultRows());

        ksqlDbModel.setJmxEnabled(request.getJmxEnabled());
        ksqlDbModel.setJmxUrl(request.getJmxUrl());
        ksqlDbModel.setJmxEnvironment(request.getJmxEnvironment());

        KsqlDbModel savedKsqlDbModel = this.ksqlDbDao.update(ksqlDbModel);

        KsqlDbEditedApplicationEvent event =
                new KsqlDbEditedApplicationEvent(savedKsqlDbModel.getCode());
        this.applicationEventPublisher.publishEvent(event);

        return this.ksqlDbServerResponseMapper().ksqlDbServerMetaApiResponse(savedKsqlDbModel);
    }

    @Override
    public KsqlDbServerDescriptionApiResponse describeKsqlDbServer() {
        try {
            ServerInfo serverInfo = this.currentKsqlDbClient().client().serverInfo().get();
            return this.ksqlDbServerResponseMapper().ksqlDbServerDescriptionApiResponse(serverInfo);
        } catch (ExecutionException ex) {
            throw new KsqlDbServerException(ex.getCause());
        } catch (Exception ex) {
            throw new KsqlDbServerException(ex);
        }
    }

    @Override
    public List<KsqlDbServerDescriptionApiResponse> describeKsqlDbServers() {
        return null;
    }

    @Override
    public List<KsqlDbServerMetaApiResponse> getAllKsqlDbServersMeta() {
        List<KsqlDbModel> models = this.ksqlDbDao.findAll();
        return this.ksqlDbServerResponseMapper().ksqlDbServerMetaApiResponses(models);
    }

    @Override
    public KsqlDbServerMetaApiResponse getKsqlDbServerMeta() {
        String ksqlDbCode = this.currentKsqlDbClient().ksqlDbCode();
        KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(ksqlDbCode);
        return this.ksqlDbServerResponseMapper().ksqlDbServerMetaApiResponse(ksqlDbModel);
    }

    @Override
    public void testKsqlDbServerClientConnectivity(KsqlDbServerClientConnectivityRequest request) {
        try (Client ksqlDbClient =
                this.clientsFactory.createKsqlDbClient(
                        request.getHost(),
                        request.getPort(),
                        request.getBasicAuthEnabled(),
                        request.getBasicAuthUsername(),
                        request.getBasicAuthPassword(),
                        request.getKeyStoreEnabled(),
                        request.getKeyStore(),
                        request.getKeyStorePassword(),
                        request.getTrustStoreEnabled(),
                        request.getTrustStore(),
                        request.getTrustStorePassword(),
                        request.getUseTls(),
                        request.getVerifyHost(),
                        request.getUseAlpn(),
                        request.getExecuteQueryMaxResultRows())) {

            ksqlDbClient.serverInfo().get(7, TimeUnit.SECONDS);
        } catch (ExecutionException ex) {
            throw new KsqlDbServerException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbServerException("Query timed out (Exceeded 7 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbServerException(ex);
        }
    }

    @Override
    public void testKsqlDbServerJmxConnectivity(KsqlDbServerJmxConnectivityRequest request) {
        try (CommonJmxClient client =
                CommonJmxClient.create(request.getJmxUrl(), request.getJmxEnvironment())) {
            client.testConnection();
        } catch (Exception ex) {
            throw new KsqlDbServerException(ex);
        }
    }

    @Transactional
    @Override
    public void deleteKsqlDbServer(KsqlDbServerDeleteRequest request) {
        KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(request.getCode());

        this.ksqlDbDao.deleteById(ksqlDbModel.getId());

        KsqlDbDeletedApplicationEvent event = new KsqlDbDeletedApplicationEvent(request.getCode());
        this.applicationEventPublisher.publishEvent(event);
    }

    @Override
    public KsqlDbServerDetailsApiResponse getKsqlDbServerDetails(KsqlDbServerDetailsRequest request) {
        KsqlDbModel ksqlDbModel = this.ksqlDbDao.findByCode(request.getCode());

        return this.ksqlDbServerResponseMapper().ksqlDbServerDetailsApiResponse(ksqlDbModel);
    }

    @Override
    public KsqlDbServerMonitoringApiResponse monitorKsqlDbServerDetails() {
        String bytesConsumedTotal = null;
        String messagesConsumedMin = null;
        String messagesConsumedMax = null;
        String messagesConsumedAvg = null;
        String messagesConsumedPerSec = null;
        String messagesProducedPerSec = null;
        String errorRate = null;
        String totalMessages = null;
        String messagesPerSec = null;
        String consumerTotalMessages = null;
        String consumerMessagesPerSec = null;
        String consumerTotalBytes = null;
        String pullQueryRequestsTotal = null;
        String pullQueryRequestsRate = null;
        String pullQueryRequestsErrorTotal = null;
        String pullQueryRequestsErrorRate = null;
        String nodeStorageFreeBytes = null;
        String nodeStorageTotalBytes = null;
        String nodeStorageUsedBytes = null;
        String numStatefulTasks = null;
        String storageUtilization = null;

        CommonJmxClient jmx = this.currentKsqlDbClient().jmx();
        if (jmx != null) {
            bytesConsumedTotal =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "bytes-consumed-total");
            messagesConsumedMin =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "messages-consumed-min");
            messagesConsumedMax =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "messages-consumed-max");
            messagesConsumedAvg =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "messages-consumed-avg:");
            messagesConsumedPerSec =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "messages-consumed-per-sec");
            messagesProducedPerSec =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "messages-produced-per-sec");
            errorRate =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-engine-query-stats,ksql_service_id=default_",
                            "error-rate");

            totalMessages =
                    jmx.getStringValue("io.confluent.ksql.metrics:type=producer-metrics", "total-messages");
            messagesPerSec =
                    jmx.getStringValue("io.confluent.ksql.metrics:type=producer-metrics", "messages-per-sec");

            consumerTotalMessages =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=consumer-metrics", "consumer-total-messages");
            consumerMessagesPerSec =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=consumer-metrics", "consumer-messages-per-sec");
            consumerTotalBytes =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=consumer-metrics", "consumer-total-bytes");

            pullQueryRequestsTotal =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-pull-query,ksql_service_id=default_",
                            "pull-query-requests-total");
            pullQueryRequestsRate =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-pull-query,ksql_service_id=default_",
                            "pull-query-requests-rate");
            pullQueryRequestsErrorTotal =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-pull-query,ksql_service_id=default_",
                            "pull-query-requests-error-total");
            pullQueryRequestsErrorRate =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=_confluent-ksql-pull-query,ksql_service_id=default_",
                            "pull-query-requests-error-rate");

            nodeStorageFreeBytes =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=ksqldb_utilization", "node_storage_free_bytes");
            nodeStorageTotalBytes =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=ksqldb_utilization", "node_storage_total_bytes");
            nodeStorageUsedBytes =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=ksqldb_utilization", "node_storage_used_bytes");
            numStatefulTasks =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=ksqldb_utilization", "num_stateful_tasks");
            storageUtilization =
                    jmx.getStringValue(
                            "io.confluent.ksql.metrics:type=ksqldb_utilization", "storage_utilization");
        }
        return this.ksqlDbServerResponseMapper()
                .ksqlDbServerMonitoringApiResponse(
                        bytesConsumedTotal,
                        messagesConsumedMin,
                        messagesConsumedMax,
                        messagesConsumedAvg,
                        messagesConsumedPerSec,
                        messagesProducedPerSec,
                        errorRate,
                        totalMessages,
                        messagesPerSec,
                        consumerTotalMessages,
                        consumerMessagesPerSec,
                        consumerTotalBytes,
                        pullQueryRequestsTotal,
                        pullQueryRequestsRate,
                        pullQueryRequestsErrorTotal,
                        pullQueryRequestsErrorRate,
                        nodeStorageFreeBytes,
                        nodeStorageTotalBytes,
                        nodeStorageUsedBytes,
                        numStatefulTasks,
                        storageUtilization);
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbServerResponseMapper ksqlDbServerResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbServerResponseMapper();
    }
}
