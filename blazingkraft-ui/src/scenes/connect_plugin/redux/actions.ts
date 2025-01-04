import { ConnectPluginType } from 'common/types/connect_plugin';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { KafkaConfiguration } from 'kafka/index';
import { GET, PUT } from 'rest/RestCalls';
import connectPluginTypes from './types';

function listAllConnectPlugins(kafkaConnectCode) {
    return {
        type: connectPluginTypes.LIST_ALL_CONNECT_PLUGINS,
        payload: GET('/kafka-connects/connector-plugins', {
            headers: { kafkaConnectCode },
            params: { connectorsOnly: false },
        }),
        meta: { context: 'Connect Plugins' },
    };
}

function listConnectorConnectPlugins(kafkaConnectCode) {
    return {
        type: connectPluginTypes.LIST_CONNECTOR_CONNECT_PLUGINS,
        payload: GET('/kafka-connects/connector-plugins', {
            headers: { kafkaConnectCode },
            params: { connectorsOnly: true },
        }),
        meta: { context: 'Connector Plugins' },
    };
}

function getConnectPluginConfigKeys(
    pluginName,
    pluginType: ConnectPluginType,
    kafkaConnectCode,
) {
    return {
        type: connectPluginTypes.GET_CONNECT_PLUGIN_CONFIG_KEYS,
        payload: GET(`/kafka-connects/connector-plugins/${pluginName}/config`, {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Connect Plugins', pluginType },
    };
}

function clearConnectPluginConfigKeys() {
    return {
        type: connectPluginTypes.CLEAR_CONNECT_PLUGIN_CONFIG_KEYS,
        meta: { context: 'Connect Plugins' },
    };
}

function validateConfiguration(
    pluginName,
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
        type: connectPluginTypes.VALIDATE_CONFIGURATIONS,
        payload: PUT(
            `/kafka-connects/connector-plugins/${pluginName}/config/validate`,
            CommonUtils.mapToObject(cleanedConfigurationValues),
            {
                headers: { kafkaConnectCode },
            },
        ),
        meta: {
            context: 'Connect Plugin Validation',
        },
    };
}

const connectPluginActions = {
    listAllConnectPlugins,
    getConnectPluginConfigKeys,
    listConnectorConnectPlugins,
    validateConfiguration,
    clearConnectPluginConfigKeys,
};

export default connectPluginActions;
