import {
    ConnectorInfo,
    ConnectorStateInfo,
    ConnectorWithExpandedInfo,
    ConnectorWithExpandedInfoAndStatus,
    ConnectorWithExpandedStatus,
    IConnectorTaskMonitoring,
} from 'common/types/connector';

export type ConnectorReducerState = {
    connectors: string[];
    connectorsWithExpandedInfo: ConnectorWithExpandedInfo[];
    connectorsWithExpandedStatus: ConnectorWithExpandedStatus[];
    connectorsWithExpandedInfoAndStatusByCluster: Map<
        string,
        ConnectorWithExpandedInfoAndStatus[]
    >;
    connectorInfo: ConnectorInfo;
    connectorActiveTopics: string[];
    connectorConfig: Map<string, any>;
    connectorStateInfo: ConnectorStateInfo;
    connectorTasksMonitoring: Map<number, IConnectorTaskMonitoring>;
    isListAllConnectorsPending: boolean;
    isCreateConnectorPending: boolean;
    isListAllConnectorsWithExpandedInfoPending: boolean;
    isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster: Map<
        string,
        boolean
    >;
    isListAllConnectorsWithExpandedStatusPending: boolean;
    isDestroyConnectorPending: boolean;
    isGetConnectorInfoPending: boolean;
    isGetConnectorActiveTopicsPending: boolean;
    isGetConnectorConfigPending: boolean;
    isGetConnectorStateInfoPending: boolean;
    isPauseConnectorPending: boolean;
    isEditConnectorConfigPending: boolean;
    isResetConnectorActiveTopicsPending: boolean;
    isRestartConnectorPending: boolean;
    isResumeConnectorPending: boolean;
    isRestartConnectorTaskPending: boolean;
    isMonitorConnectorTasksPending: boolean;
};
