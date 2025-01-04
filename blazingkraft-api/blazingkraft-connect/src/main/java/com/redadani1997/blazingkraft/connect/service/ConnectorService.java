package com.redadani1997.blazingkraft.connect.service;

import com.redadani1997.blazingkraft.connect.connector.openapi.model.*;
import com.redadani1997.blazingkraft.connect.dto.in.connect.*;
import java.util.List;
import java.util.Map;

public interface ConnectorService {
    void createConnector(ConnectorCreateRequest request);

    void destroyConnector(ConnectorDestroyRequest request);

    ConnectorInfoApiResponse getConnector(ConnectorGetRequest request);

    void getConnectorActiveTopics(ConnectorGetActiveTopicsRequest request);

    Map<String, String> getConnectorConfig(ConnectorGetConfigRequest request);

    ConnectorStateInfoApiResponse getConnectorStatus(ConnectorGetStatusRequest request);

    List<String> listConnectors();

    void pauseConnector(ConnectorPauseRequest request);

    void putConnectorConfig(ConnectorPutConfigRequest request);

    void resetConnectorActiveTopics(ConnectorResetActiveTopicsRequest request);

    void restartConnector(ConnectorRestartRequest request);

    void resumeConnector(ConnectorResumeRequest request);

    List<ConnectorInfoWithExpandedInfoApiResponse> listConnectorsWithExpandedInfo();

    List<ConnectorInfoWithExpandedStatusApiResponse> listConnectorsWithExpandedStatus();

    List<ConnectorInfoWithExpandedInfoAndStatusApiResponse> listConnectorsWithExpandedInfoAndStatus();

    Map<String, ConnectorTaskMonitoringApiResponse> monitorConnectorTasks(
            ConnectorTasksMonitoringRequest request);
}
