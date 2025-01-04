package com.redadani1997.blazingkraft.ksqldb.mapper.out.server;

import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerDescriptionApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerDetailsApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerMetaApiResponse;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerMonitoringApiResponse;
import io.confluent.ksql.api.client.ServerInfo;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbServerResponseMapper {
    public List<KsqlDbServerMetaApiResponse> ksqlDbServerMetaApiResponses(List<KsqlDbModel> models) {
        if (models == null) {
            return Collections.emptyList();
        }
        return models.stream().map(this::ksqlDbServerMetaApiResponse).toList();
    }

    public KsqlDbServerMetaApiResponse ksqlDbServerMetaApiResponse(KsqlDbModel model) {
        if (model == null) {
            return null;
        }
        KsqlDbServerMetaApiResponse response = new KsqlDbServerMetaApiResponse();

        response.setName(model.getName());
        response.setCode(model.getCode());
        response.setColor(model.getColor());
        response.setHost(model.getHost());
        response.setPort(model.getPort());
        response.setJmxEnabled(model.getJmxEnabled());

        return response;
    }

    public KsqlDbServerDetailsApiResponse ksqlDbServerDetailsApiResponse(KsqlDbModel model) {
        if (model == null) {
            return null;
        }
        KsqlDbServerDetailsApiResponse response = new KsqlDbServerDetailsApiResponse();

        response.setName(model.getName());
        response.setCode(model.getCode());
        response.setColor(model.getColor());
        response.setHost(model.getHost());
        response.setPort(model.getPort());
        response.setBasicAuthEnabled(model.getBasicAuthEnabled());
        response.setBasicAuthUsername(model.getBasicAuthUsername());
        response.setBasicAuthPassword(model.getBasicAuthPassword());
        response.setKeyStoreEnabled(model.getKeyStoreEnabled());
        response.setKeyStore(model.getKeyStore());
        response.setKeyStorePassword(model.getKeyStorePassword());
        response.setTrustStoreEnabled(model.getTrustStoreEnabled());
        response.setTrustStore(model.getTrustStore());
        response.setTrustStorePassword(model.getTrustStorePassword());
        response.setUseTls(model.getUseTls());
        response.setVerifyHost(model.getVerifyHost());
        response.setUseAlpn(model.getUseAlpn());
        response.setExecuteQueryMaxResultRows(model.getExecuteQueryMaxResultRows());
        response.setJmxEnabled(model.getJmxEnabled());
        response.setJmxUrl(model.getJmxUrl());
        response.setJmxEnvironment(model.jmxEnvironment());

        return response;
    }

    public KsqlDbServerDescriptionApiResponse ksqlDbServerDescriptionApiResponse(
            ServerInfo serverInfo) {
        if (serverInfo == null) {
            return null;
        }
        KsqlDbServerDescriptionApiResponse response = new KsqlDbServerDescriptionApiResponse();

        response.setServerVersion(serverInfo.getServerVersion());
        response.setKsqlServiceId(serverInfo.getKsqlServiceId());
        response.setKafkaClusterId(serverInfo.getKafkaClusterId());

        return response;
    }

    public KsqlDbServerMonitoringApiResponse ksqlDbServerMonitoringApiResponse(
            String bytesConsumedTotal,
            String messagesConsumedMin,
            String messagesConsumedMax,
            String messagesConsumedAvg,
            String messagesConsumedPerSec,
            String messagesProducedPerSec,
            String errorRate,
            String totalMessages,
            String messagesPerSec,
            String consumerTotalMessages,
            String consumerMessagesPerSec,
            String consumerTotalBytes,
            String pullQueryRequestsTotal,
            String pullQueryRequestsRate,
            String pullQueryRequestsErrorTotal,
            String pullQueryRequestsErrorRate,
            String nodeStorageFreeBytes,
            String nodeStorageTotalBytes,
            String nodeStorageUsedBytes,
            String numStatefulTasks,
            String storageUtilization) {
        KsqlDbServerMonitoringApiResponse response = new KsqlDbServerMonitoringApiResponse();

        response.setBytesConsumedTotal(bytesConsumedTotal);
        response.setMessagesConsumedMin(messagesConsumedMin);
        response.setMessagesConsumedMax(messagesConsumedMax);
        response.setMessagesConsumedAvg(messagesConsumedAvg);
        response.setMessagesConsumedPerSec(messagesConsumedPerSec);
        response.setMessagesProducedPerSec(messagesProducedPerSec);
        response.setErrorRate(errorRate);
        response.setTotalMessages(totalMessages);
        response.setMessagesPerSec(messagesPerSec);
        response.setConsumerTotalMessages(consumerTotalMessages);
        response.setConsumerMessagesPerSec(consumerMessagesPerSec);
        response.setConsumerTotalBytes(consumerTotalBytes);
        response.setPullQueryRequestsTotal(pullQueryRequestsTotal);
        response.setPullQueryRequestsRate(pullQueryRequestsRate);
        response.setPullQueryRequestsErrorTotal(pullQueryRequestsErrorTotal);
        response.setPullQueryRequestsErrorRate(pullQueryRequestsErrorRate);
        response.setNodeStorageFreeBytes(nodeStorageFreeBytes);
        response.setNodeStorageTotalBytes(nodeStorageTotalBytes);
        response.setNodeStorageUsedBytes(nodeStorageUsedBytes);
        response.setNumStatefulTasks(numStatefulTasks);
        response.setStorageUtilization(storageUtilization);

        return response;
    }
}
