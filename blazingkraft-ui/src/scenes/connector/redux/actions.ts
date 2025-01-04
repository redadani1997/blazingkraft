import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { KafkaConfiguration } from 'kafka/index';
import { ReduxStore } from 'redux_config/reducers';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import connectorTypes from './types';

function listConnectors(kafkaConnectCode) {
    return {
        type: connectorTypes.LIST_CONNECTORS,
        payload: GET('/kafka-connects/connectors', {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors' },
    };
}

function listConnectorsWithExpandedInfo(kafkaConnectCode) {
    return {
        type: connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO,
        payload: GET('/kafka-connects/connectors/expand-info', {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors' },
    };
}

function listConnectorsWithExpandedStatus(kafkaConnectCode) {
    return {
        type: connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_STATUS,
        payload: GET('/kafka-connects/connectors/expand-status', {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors' },
    };
}
function listConnectorsWithExpandedInfoAndStatus(reload, kafkaConnectCode) {
    return (dispatch, getStore) => {
        const store: ReduxStore = getStore();
        const hasConnectors =
            store.connectorReducer.connectorsWithExpandedInfoAndStatusByCluster.has(
                kafkaConnectCode,
            );
        if (!reload && hasConnectors) {
            return;
        }
        return dispatch({
            type: connectorTypes.LIST_CONNECTORS_WITH_EXPANDED_INFO_AND_STATUS,
            payload: GET('/kafka-connects/connectors/expand-info-status', {
                headers: { kafkaConnectCode },
            }),
            meta: {
                context: 'Connectors',
                kafkaConnectCode,
                concurrencyIdentifier: kafkaConnectCode,
            },
        });
    };
}

function createConnector(
    name,
    configurationValues: Map<string, any>,
    connectPluginConfigKeys: KafkaConfiguration[],
    kafkaConnectCode,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            connectPluginConfigKeys || [],
            configurationValues,
        );

    return {
        type: connectorTypes.CREATE_CONNECTOR,
        payload: POST(
            '/kafka-connects/connectors',
            {
                name,
                config: CommonUtils.mapToObject(cleanedConfigurationValues),
            },
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { context: 'Connectors', connector: name, kafkaConnectCode },
    };
}

function getConnectorStatus(name, kafkaConnectCode) {
    return {
        type: connectorTypes.GET_CONNECTOR_STATE_INFO,
        payload: GET(`/kafka-connects/connectors/${name}/status`, {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors' },
    };
}

function getConnectorConfig(name, kafkaConnectCode) {
    return {
        type: connectorTypes.GET_CONNECTOR_CONFIG,
        payload: GET(`/kafka-connects/connectors/${name}/config`, {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors' },
    };
}

function getConnectorInfo(name, kafkaConnectCode) {
    return {
        type: connectorTypes.GET_CONNECTOR_INFO,
        payload: GET(`/kafka-connects/connectors/${name}`, {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors' },
    };
}

function pauseConnector(connector, kafkaConnectCode) {
    return {
        type: connectorTypes.PAUSE_CONNECTOR,
        payload: PUT(
            `/kafka-connects/connectors/${connector}/pause`,
            {},
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { context: 'Connectors', connector, kafkaConnectCode },
    };
}

function restartConnectorTask(connector, task, kafkaConnectCode) {
    return {
        type: connectorTypes.RESTART_CONNECTOR_TASK,
        payload: POST(
            `/kafka-connects/connectors/${connector}/tasks/${task}/restart`,
            {},
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { context: 'Connector Tasks', connector, task, kafkaConnectCode },
    };
}

function resumeConnector(connector, kafkaConnectCode) {
    return {
        type: connectorTypes.RESUME_CONNECTOR,
        payload: PUT(
            `/kafka-connects/connectors/${connector}/resume`,
            {},
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { context: 'Connectors', connector, kafkaConnectCode },
    };
}

function resetConnectorActiveTopics(connector, kafkaConnectCode) {
    return {
        type: connectorTypes.RESET_CONNECTOR_ACTIVE_TOPICS,
        payload: PUT(
            `/kafka-connects/connectors/${connector}/topics/reset`,
            {},
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { context: 'Connectors', connector, kafkaConnectCode },
    };
}

function destroyConnector(connector, kafkaConnectCode) {
    return {
        type: connectorTypes.DESTROY_CONNECTOR,
        payload: DELETE(`/kafka-connects/connectors/${connector}`, {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connectors', connector, kafkaConnectCode },
    };
}

function restartConnector(
    connector,
    includeTasks,
    onlyFailed,
    kafkaConnectCode,
) {
    return {
        type: connectorTypes.RESTART_CONNECTOR,
        payload: POST(
            `/kafka-connects/connectors/${connector}/restart`,
            {},
            {
                headers: { kafkaConnectCode },
                params: { includeTasks, onlyFailed },
            },
        ),
        meta: { context: 'Connectors', connector, kafkaConnectCode },
    };
}

function editConnectorConfig(
    connector,
    configurationValues: Map<string, any>,
    connectPluginConfigKeys: KafkaConfiguration[],
    kafkaConnectCode,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            connectPluginConfigKeys,
            configurationValues,
        );

    return {
        type: connectorTypes.EDIT_CONNECTOR_CONFIG,
        payload: PUT(
            `/kafka-connects/connectors/${connector}/config`,
            CommonUtils.mapToObject(cleanedConfigurationValues),
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { context: 'Connectors', connector, kafkaConnectCode },
    };
}

function monitorConnectorTasks(
    connector,
    connectorType,
    tasks,
    kafkaConnectCode,
) {
    return {
        type: connectorTypes.MONITOR_CONNECTOR_TASKS,
        payload: POST(
            `/kafka-connects/connectors/${connector}/monitoring`,
            {
                tasks,
                connectorType,
            },
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: { kafkaConnectCode, context: 'Connector Tasks Monitoring' },
    };
}

const connectorActions = {
    listConnectors,
    createConnector,
    listConnectorsWithExpandedInfo,
    listConnectorsWithExpandedStatus,
    listConnectorsWithExpandedInfoAndStatus,
    getConnectorStatus,
    getConnectorConfig,
    pauseConnector,
    restartConnector,
    resumeConnector,
    resetConnectorActiveTopics,
    destroyConnector,
    restartConnectorTask,
    getConnectorInfo,
    editConnectorConfig,
    monitorConnectorTasks,
};

export default connectorActions;
