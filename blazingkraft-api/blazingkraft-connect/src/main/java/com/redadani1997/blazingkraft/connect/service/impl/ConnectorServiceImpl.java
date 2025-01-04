package com.redadani1997.blazingkraft.connect.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.connect.CommonKafkaConnectClient;
import com.redadani1997.blazingkraft.common.jmx.CommonJmxClient;
import com.redadani1997.blazingkraft.connect.connector.openapi.model.*;
import com.redadani1997.blazingkraft.connect.dto.in.connect.*;
import com.redadani1997.blazingkraft.connect.enums.ConnectorType;
import com.redadani1997.blazingkraft.connect.mapper.out.KafkaConnectResponseMapper;
import com.redadani1997.blazingkraft.connect.mapper.out.connector.ConnectorResponseMapper;
import com.redadani1997.blazingkraft.connect.service.ConnectorService;
import com.redadani1997.blazingkraft.error.connect.ConnectorException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConnectorServiceImpl implements ConnectorService {
    private final KafkaConnectResponseMapper kafkaConnectResponseMapper;
    private final ClientsFactory clientsFactory;

    @Override
    public void createConnector(ConnectorCreateRequest request) {
        try {
            String url = "/connectors";

            HttpEntity httpEntity = new HttpEntity(request);

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.POST, httpEntity, String.class);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void destroyConnector(ConnectorDestroyRequest request) {
        try {
            String url = "/connectors/{connector}";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.DELETE, null, Void.class, params);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public ConnectorInfoApiResponse getConnector(ConnectorGetRequest request) {
        try {
            String url = "/connectors/{connector}";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.GET, null, String.class, params)
                            .getBody();

            return this.connectorResponseMapper().connectorInfoApiResponse(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void getConnectorActiveTopics(ConnectorGetActiveTopicsRequest request) {
        try {
            String url = "/connectors/{connector}/topics";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.GET, null, String.class, params)
                            .getBody();
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
        //        return this.connectorResponseMapper().connectorActiveTopicsApiResponse(json);
    }

    @Override
    public Map<String, String> getConnectorConfig(ConnectorGetConfigRequest request) {
        try {
            String url = "/connectors/{connector}/config";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.GET, null, String.class, params)
                            .getBody();

            return this.connectorResponseMapper().connectorConfigApiResponse(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public ConnectorStateInfoApiResponse getConnectorStatus(ConnectorGetStatusRequest request) {
        try {
            String url = "/connectors/{connector}/status";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .exchange(url, HttpMethod.GET, null, String.class, params)
                            .getBody();

            return this.connectorResponseMapper().connectorStateInfoApiResponse(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public List<String> listConnectors() {
        try {
            String url = "/connectors";

            String json =
                    this.currentKafkaConnectClient().restTemplate().getForEntity(url, String.class).getBody();

            return this.connectorResponseMapper().allConnectorResponses(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void pauseConnector(ConnectorPauseRequest request) {
        try {
            String url = "/connectors/{connector}/pause";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.PUT, null, Void.class, params);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void putConnectorConfig(ConnectorPutConfigRequest request) {
        try {
            String url = "/connectors/{connector}/config";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            HttpEntity<Map> httpEntity = new HttpEntity<>(request.getRequestBody());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.PUT, httpEntity, Void.class, params);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void resetConnectorActiveTopics(ConnectorResetActiveTopicsRequest request) {
        try {
            String url = "/connectors/{connector}/topics/reset";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            HttpEntity<Map> httpEntity = new HttpEntity<>(new HashMap());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.PUT, httpEntity, Void.class, params);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void restartConnector(ConnectorRestartRequest request) {
        try {
            String url =
                    "/connectors/{connector}/restart?onlyFailed={onlyFailed}&includeTasks={includeTasks}";

            Map<String, Object> params = new HashMap<>();
            params.put("connector", request.getConnector());
            params.put("onlyFailed", request.getOnlyFailed() != null && request.getOnlyFailed());
            params.put("includeTasks", request.getIncludeTasks() != null && request.getIncludeTasks());

            HttpEntity<HashMap> httpEntity = new HttpEntity<>(new HashMap());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.POST, httpEntity, Void.class, params);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public void resumeConnector(ConnectorResumeRequest request) {
        try {
            String url = "/connectors/{connector}/resume";

            Map<String, String> params = new HashMap<>();
            params.put("connector", request.getConnector());

            this.currentKafkaConnectClient()
                    .restTemplate()
                    .exchange(url, HttpMethod.PUT, null, Void.class, params);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public List<ConnectorInfoWithExpandedInfoApiResponse> listConnectorsWithExpandedInfo() {
        try {
            String path = "/connectors?expand=info";

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .getForEntity(path, String.class)
                            .getBody();

            return this.connectorResponseMapper().connectorInfoWithExpandedInfoApiResponses(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public List<ConnectorInfoWithExpandedStatusApiResponse> listConnectorsWithExpandedStatus() {
        try {
            String path = "/connectors?expand=status";

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .getForEntity(path, String.class)
                            .getBody();

            return this.connectorResponseMapper().connectorInfoWithExpandedStatusApiResponses(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    @Override
    public Map<String, ConnectorTaskMonitoringApiResponse> monitorConnectorTasks(
            ConnectorTasksMonitoringRequest request) {
        Map<String, ConnectorTaskMonitoringApiResponse> responses = new HashMap<>();
        for (Integer task : request.getTasks()) {
            ConnectorTaskMonitoringApiResponse response =
                    this.monitorConnectorTask(request.getConnector(), task, request.getConnectorType());
            responses.put(task.toString(), response);
        }

        return responses;
    }

    private ConnectorTaskMonitoringApiResponse monitorConnectorTask(
            String connector, int task, ConnectorType connectorType) {

        String commonConnector =
                String.format(
                        "kafka.connect:type=connector-task-metrics,connector=%s,task=%s", connector, task);
        String sourceConnector =
                String.format(
                        "kafka.connect:type=source-task-metrics,connector=%s,task=%s", connector, task);
        String sinkConnector =
                String.format("kafka.connect:type=sink-task-metrics,connector=%s,task=%s", connector, task);
        String errorTask =
                String.format(
                        "kafka.connect:type=task-error-metrics,connector=%s,task=%s", connector, task);

        String totalRecordErrors = null;
        String totalRecordFailures = null;
        String totalRecordsSkipped = null;

        String sourceRecordPollTotal = null;
        String sourceRecordPollRate = null;
        String sourceRecordWriteTotal = null;
        String sourceRecordWriteRate = null;
        String pollBatchAvgTimeMs = null;

        String sinkRecordReadRate = null;
        String sinkRecordReadTotal = null;
        String sinkRecordSendRate = null;
        String sinkRecordSendTotal = null;
        String partitionCount = null;
        String putBatchAvgTimeMs = null;

        String runningRatio = null;
        String pauseRatio = null;
        String batchSizeAvg = null;

        CommonJmxClient jmx = this.currentKafkaConnectClient().jmx();

        if (jmx != null) {
            totalRecordErrors = jmx.getStringValue(errorTask, "total-record-errors");
            totalRecordFailures = jmx.getStringValue(errorTask, "total-record-failures");
            totalRecordsSkipped = jmx.getStringValue(errorTask, "total-records-skipped");

            if (ConnectorType.source.equals(connectorType)) {
                sourceRecordPollTotal = jmx.getStringValue(sourceConnector, "source-record-poll-total");
                sourceRecordPollRate = jmx.getStringValue(sourceConnector, "source-record-poll-rate");
                sourceRecordWriteTotal = jmx.getStringValue(sourceConnector, "source-record-write-total");
                sourceRecordWriteRate = jmx.getStringValue(sourceConnector, "source-record-write-rate");
                pollBatchAvgTimeMs = jmx.getStringValue(sourceConnector, "poll-batch-avg-time-ms");
            }

            if (ConnectorType.sink.equals(connectorType)) {
                sinkRecordReadRate = jmx.getStringValue(sinkConnector, "sink-record-read-rate");
                sinkRecordReadTotal = jmx.getStringValue(sinkConnector, "sink-record-read-total");
                sinkRecordSendRate = jmx.getStringValue(sinkConnector, "sink-record-send-rate");
                sinkRecordSendTotal = jmx.getStringValue(sinkConnector, "sink-record-send-total");
                partitionCount = jmx.getStringValue(sinkConnector, "partition-count");
                putBatchAvgTimeMs = jmx.getStringValue(sinkConnector, "put-batch-avg-time-ms");
            }
            runningRatio = jmx.getStringValue(commonConnector, "running-ratio");
            pauseRatio = jmx.getStringValue(commonConnector, "pause-ratio");
            batchSizeAvg = jmx.getStringValue(commonConnector, "batch-size-avg");
        }

        return this.connectorResponseMapper()
                .connectorTaskMonitoringApiResponse(
                        totalRecordErrors,
                        totalRecordFailures,
                        totalRecordsSkipped,
                        sourceRecordPollTotal,
                        sourceRecordPollRate,
                        sourceRecordWriteTotal,
                        sourceRecordWriteRate,
                        pollBatchAvgTimeMs,
                        sinkRecordReadRate,
                        sinkRecordReadTotal,
                        sinkRecordSendRate,
                        sinkRecordSendTotal,
                        partitionCount,
                        putBatchAvgTimeMs,
                        runningRatio,
                        pauseRatio,
                        batchSizeAvg);
    }

    @Override
    public List<ConnectorInfoWithExpandedInfoAndStatusApiResponse>
            listConnectorsWithExpandedInfoAndStatus() {
        try {
            String path = "/connectors?expand=status&expand=info";

            String json =
                    this.currentKafkaConnectClient()
                            .restTemplate()
                            .getForEntity(path, String.class)
                            .getBody();

            return this.connectorResponseMapper()
                    .connectorInfoWithExpandedInfoAndStatusApiResponses(json);
        } catch (Exception ex) {
            throw new ConnectorException(ex);
        }
    }

    private CommonKafkaConnectClient currentKafkaConnectClient() {
        return this.clientsFactory.currentKafkaConnectClient();
    }

    private ConnectorResponseMapper connectorResponseMapper() {
        return this.kafkaConnectResponseMapper.connectorResponseMapper();
    }
}
