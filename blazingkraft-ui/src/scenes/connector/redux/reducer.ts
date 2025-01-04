import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { ConnectorReducerState } from '.';
import connectorTypes from './types';

const initialState: ConnectorReducerState = {
    connectorActiveTopics: [],
    connectors: [],
    connectorConfig: new Map(),
    connectorInfo: null,
    connectorStateInfo: null,
    connectorsWithExpandedInfo: [],
    connectorsWithExpandedInfoAndStatusByCluster: new Map(),
    connectorsWithExpandedStatus: [],
    connectorTasksMonitoring: new Map(),
    isListAllConnectorsPending: false,
    isCreateConnectorPending: false,
    isDestroyConnectorPending: false,
    isGetConnectorConfigPending: false,
    isGetConnectorStateInfoPending: false,
    isPauseConnectorPending: false,
    isResumeConnectorPending: false,
    isEditConnectorConfigPending: false,
    isGetConnectorActiveTopicsPending: false,
    isGetConnectorInfoPending: false,
    isListAllConnectorsWithExpandedInfoPending: false,
    isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster: new Map(),
    isListAllConnectorsWithExpandedStatusPending: false,
    isRestartConnectorPending: false,
    isResetConnectorActiveTopicsPending: false,
    isRestartConnectorTaskPending: false,
    isMonitorConnectorTasksPending: false,
};

function connectorReducer(
    state = initialState,
    action: ReduxAction,
): ConnectorReducerState {
    switch (action.type) {
        // LIST_CONNECTORS
        case connectorTypes.LIST_CONNECTORS_PENDING:
            return {
                ...state,
                isListAllConnectorsPending: true,
            };
        case connectorTypes.LIST_CONNECTORS_FULFILLED:
            return {
                ...state,
                connectors: action.payload,
                isListAllConnectorsPending: false,
            };
        case connectorTypes.LIST_CONNECTORS_REJECTED:
            return {
                ...state,
                connectors: [],
                isListAllConnectorsPending: false,
            };

        // CREATE_CONNECTOR
        case connectorTypes.CREATE_CONNECTOR_PENDING:
            return {
                ...state,
                isCreateConnectorPending: true,
            };
        case connectorTypes.CREATE_CONNECTOR_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );

            return {
                ...state,
                isCreateConnectorPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.CREATE_CONNECTOR_REJECTED:
            return {
                ...state,
                isCreateConnectorPending: false,
            };

        // LIST_CONNECTORS_WITH_EXPANDED_INFO
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_PENDING:
            return {
                ...state,
                isListAllConnectorsWithExpandedInfoPending: true,
            };
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_FULFILLED:
            return {
                ...state,
                connectorsWithExpandedInfo: action.payload,
                isListAllConnectorsWithExpandedInfoPending: false,
            };
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_REJECTED:
            return {
                ...state,
                connectorsWithExpandedInfo: [],
                isListAllConnectorsWithExpandedInfoPending: false,
            };

        // LIST_CONNECTORS_WITH_EXPANDED_STATUS
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_STATUS_PENDING:
            return {
                ...state,
                isListAllConnectorsWithExpandedStatusPending: true,
            };
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_STATUS_FULFILLED:
            return {
                ...state,
                connectorsWithExpandedStatus: action.payload,
                isListAllConnectorsWithExpandedStatusPending: false,
            };
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_STATUS_REJECTED:
            return {
                ...state,
                connectorsWithExpandedStatus: [],
                isListAllConnectorsWithExpandedStatusPending: false,
            };

        // LIST_CONNECTORS_WITH_EXPANDED_INFO_AND_STATUS
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_AND_STATUS_PENDING: {
            const { kafkaConnectCode } = action.meta;
            const newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster =
                new Map(
                    state.isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster,
                );
            newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster.set(
                kafkaConnectCode,
                true,
            );
            return {
                ...state,
                isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster:
                    newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster,
            };
        }
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_AND_STATUS_FULFILLED: {
            const { kafkaConnectCode } = action.meta;
            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );
            const newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster =
                new Map(
                    state.isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster,
                );
            newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster.set(
                kafkaConnectCode,
                false,
            );
            newConnectorsWithExpandedInfoAndStatusByCluster.set(
                kafkaConnectCode,
                action.payload,
            );
            return {
                ...state,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
                isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster:
                    newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster,
            };
        }
        case connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_AND_STATUS_REJECTED: {
            const { clusterCode } = action.meta;
            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );
            const newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster =
                new Map(
                    state.isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster,
                );
            newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster.set(
                clusterCode,
                false,
            );
            newConnectorsWithExpandedInfoAndStatusByCluster.delete(clusterCode);
            return {
                ...state,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
                isListAllConnectorsWithExpandedInfoAndStatusPendingByCluster:
                    newIsListAllConnectorsWithExpandedInfoAndStatusPendingByCluster,
            };
        }

        // DESTROY_CONNECTOR
        case connectorTypes.DESTROY_CONNECTOR_PENDING:
            return {
                ...state,
                isDestroyConnectorPending: true,
            };
        case connectorTypes.DESTROY_CONNECTOR_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );

            return {
                ...state,
                isDestroyConnectorPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.DESTROY_CONNECTOR_REJECTED:
            return {
                ...state,
                isDestroyConnectorPending: false,
            };

        // GET_CONNECTOR_INFO
        case connectorTypes.GET_CONNECTOR_INFO:
            return {
                ...state,
                isGetConnectorInfoPending: true,
            };
        case connectorTypes.GET_CONNECTOR_INFO_FULFILLED:
            return {
                ...state,
                connectorInfo: action.payload,
                isGetConnectorInfoPending: false,
            };
        case connectorTypes.GET_CONNECTOR_INFO_REJECTED:
            return {
                ...state,
                connectorInfo: null,
                isGetConnectorInfoPending: false,
            };

        // GET_CONNECTOR_ACTIVE_TOPICS
        case connectorTypes.GET_CONNECTOR_ACTIVE_TOPICS_PENDING:
            return {
                ...state,
                isGetConnectorActiveTopicsPending: true,
            };
        case connectorTypes.GET_CONNECTOR_ACTIVE_TOPICS_FULFILLED:
            return {
                ...state,
                connectorActiveTopics: action.payload,
                isGetConnectorActiveTopicsPending: false,
            };
        case connectorTypes.GET_CONNECTOR_ACTIVE_TOPICS_REJECTED:
            return {
                ...state,
                connectorActiveTopics: [],
                isGetConnectorActiveTopicsPending: false,
            };

        // RESET_CONNECTOR_ACTIVE_TOPICS
        case connectorTypes.RESET_CONNECTOR_ACTIVE_TOPICS_PENDING:
            return {
                ...state,
                isResetConnectorActiveTopicsPending: true,
            };
        case connectorTypes.RESET_CONNECTOR_ACTIVE_TOPICS_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );

            return {
                ...state,
                isResetConnectorActiveTopicsPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.RESET_CONNECTOR_ACTIVE_TOPICS_REJECTED:
            return {
                ...state,
                isResetConnectorActiveTopicsPending: false,
            };

        // GET_CONNECTOR_CONFIG
        case connectorTypes.GET_CONNECTOR_CONFIG_PENDING:
            return {
                ...state,
                isGetConnectorConfigPending: true,
            };
        case connectorTypes.GET_CONNECTOR_CONFIG_FULFILLED:
            return {
                ...state,
                connectorConfig: CommonUtils.objectToMap(action.payload),
                isGetConnectorConfigPending: false,
            };
        case connectorTypes.GET_CONNECTOR_CONFIG_REJECTED:
            return {
                ...state,
                connectorConfig: null,
                isGetConnectorConfigPending: false,
            };

        // EDIT_CONNECTOR_CONFIG
        case connectorTypes.EDIT_CONNECTOR_CONFIG_PENDING:
            return {
                ...state,
                isEditConnectorConfigPending: true,
            };
        case connectorTypes.EDIT_CONNECTOR_CONFIG_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );
            return {
                ...state,
                isEditConnectorConfigPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.EDIT_CONNECTOR_CONFIG_REJECTED:
            return {
                ...state,
                isEditConnectorConfigPending: false,
            };

        // RESTART_CONNECTOR
        case connectorTypes.RESTART_CONNECTOR_PENDING:
            return {
                ...state,
                isRestartConnectorPending: true,
            };
        case connectorTypes.RESTART_CONNECTOR_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );
            return {
                ...state,
                isRestartConnectorPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.RESTART_CONNECTOR_REJECTED:
            return {
                ...state,
                isRestartConnectorPending: false,
            };

        // PAUSE_CONNECTOR
        case connectorTypes.PAUSE_CONNECTOR_PENDING:
            return {
                ...state,
                isPauseConnectorPending: true,
            };
        case connectorTypes.PAUSE_CONNECTOR_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );

            return {
                ...state,
                isPauseConnectorPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.PAUSE_CONNECTOR_REJECTED:
            return {
                ...state,
                isPauseConnectorPending: false,
            };

        // RESUME_CONNECTOR
        case connectorTypes.RESUME_CONNECTOR_PENDING:
            return {
                ...state,
                isResumeConnectorPending: true,
            };
        case connectorTypes.RESUME_CONNECTOR_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );

            return {
                ...state,
                isResumeConnectorPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.RESUME_CONNECTOR_REJECTED:
            return {
                ...state,
                isResumeConnectorPending: false,
            };

        // GET_CONNECTOR_STATE_INFO
        case connectorTypes.GET_CONNECTOR_STATE_INFO_PENDING:
            return {
                ...state,
                isGetConnectorStateInfoPending: true,
            };
        case connectorTypes.GET_CONNECTOR_STATE_INFO_FULFILLED:
            return {
                ...state,
                connectorStateInfo: action.payload,
                isGetConnectorStateInfoPending: false,
            };
        case connectorTypes.GET_CONNECTOR_STATE_INFO_REJECTED:
            return {
                ...state,
                connectorStateInfo: null,
                isGetConnectorStateInfoPending: false,
            };

        // RESTART_CONNECTOR_TASK
        case connectorTypes.RESTART_CONNECTOR_TASK_PENDING:
            return {
                ...state,
                isRestartConnectorTaskPending: true,
            };
        case connectorTypes.RESTART_CONNECTOR_TASK_FULFILLED: {
            const { kafkaConnectCode } = action.meta;

            const newConnectorsWithExpandedInfoAndStatusByCluster = new Map(
                state.connectorsWithExpandedInfoAndStatusByCluster,
            );

            newConnectorsWithExpandedInfoAndStatusByCluster.delete(
                kafkaConnectCode,
            );

            return {
                ...state,
                isRestartConnectorTaskPending: false,
                connectorsWithExpandedInfoAndStatusByCluster:
                    newConnectorsWithExpandedInfoAndStatusByCluster,
            };
        }
        case connectorTypes.RESTART_CONNECTOR_TASK_REJECTED:
            return {
                ...state,
                isRestartConnectorTaskPending: false,
            };

        // MONITOR_CONNECTOR_TASKS
        case connectorTypes.MONITOR_CONNECTOR_TASKS_PENDING:
            return {
                ...state,
                isMonitorConnectorTasksPending: true,
            };
        case connectorTypes.MONITOR_CONNECTOR_TASKS_FULFILLED:
            return {
                ...state,
                connectorTasksMonitoring: CommonUtils.objectToMap(
                    action.payload,
                ),
                isMonitorConnectorTasksPending: false,
            };
        case connectorTypes.MONITOR_CONNECTOR_TASKS_REJECTED:
            return {
                ...state,
                connectorTasksMonitoring: new Map(),
                isMonitorConnectorTasksPending: false,
            };

        default:
            return state;
    }
}

export default connectorReducer;
