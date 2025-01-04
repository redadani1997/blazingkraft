import { ConnectPluginType } from 'common/types/connect_plugin';
import { KafkaConnectUtils } from 'common/utils/KafkaConnectUtils';
import { KafkaConnectSinkConnectorConfiguration } from 'kafka/configuration/KafkaConnectSinkConnectorConfiguration';
import { KafkaConnectSourceConnectorConfiguration } from 'kafka/configuration/KafkaConnectSourceConnectorConfiguration';
import { KafkaConfiguration } from 'kafka/index';
import { ReduxAction } from 'redux_config/.';
import { ConnectPluginReducerState } from '.';
import connectPluginTypes from './types';

const initialState: ConnectPluginReducerState = {
    allConnectPlugins: [],
    connectorConnectPlugins: [],
    connectPluginConfigKeys: [],
    connectPluginValidationResponse: null,
    isListAllConnectPluginsPending: false,
    isGetConnectPluginConfigKeysPending: false,
    isValidateConfigurationsPending: false,
    isListConnectorConnectPluginsPending: false,
};

function mergeConfigKeys(
    baseConfigKeys: KafkaConfiguration[],
    additionalConfigKeys: KafkaConfiguration[],
): KafkaConfiguration[] {
    const mergedConfigKeys = [...baseConfigKeys];
    additionalConfigKeys.forEach(additionalConfigKey => {
        const index = mergedConfigKeys.findIndex(
            configKey => configKey.name === additionalConfigKey.name,
        );
        if (index === -1) {
            mergedConfigKeys.push(additionalConfigKey);
        }
    });
    return mergedConfigKeys;
}

function computeConfigKeys(
    pluginType: ConnectPluginType,
    configKeys,
): KafkaConfiguration[] {
    const kafkaConfiguration: KafkaConfiguration[] =
        KafkaConnectUtils.pluginConfigsToKafkaConnectConfigs(configKeys);
    if (pluginType === 'source') {
        return mergeConfigKeys(
            kafkaConfiguration,
            KafkaConnectSourceConnectorConfiguration.configurations,
        );
    }
    if (pluginType === 'sink') {
        return mergeConfigKeys(
            kafkaConfiguration,
            KafkaConnectSinkConnectorConfiguration.configurations,
        );
    }
    return kafkaConfiguration;
}

function connectPluginReducer(
    state = initialState,
    action: ReduxAction,
): ConnectPluginReducerState {
    switch (action.type) {
        // CLEAR_CONNECT_PLUGIN_CONFIG_KEYS
        case connectPluginTypes.CLEAR_CONNECT_PLUGIN_CONFIG_KEYS:
            return {
                ...state,
                connectPluginConfigKeys: [],
                connectPluginValidationResponse: null,
            };

        // LIST_ALL_CONNECT_PLUGINS
        case connectPluginTypes.LIST_ALL_CONNECT_PLUGINS_PENDING:
            return {
                ...state,
                isListAllConnectPluginsPending: true,
            };
        case connectPluginTypes.LIST_ALL_CONNECT_PLUGINS_FULFILLED:
            return {
                ...state,
                allConnectPlugins: action.payload.map((plugin, index) => ({
                    ...plugin,
                    id: index + 1,
                })),
                isListAllConnectPluginsPending: false,
            };
        case connectPluginTypes.LIST_ALL_CONNECT_PLUGINS_REJECTED:
            return {
                ...state,
                allConnectPlugins: [],
                isListAllConnectPluginsPending: false,
            };

        // LIST_CONNECTOR_CONNECT_PLUGINS
        case connectPluginTypes.LIST_CONNECTOR_CONNECT_PLUGINS_PENDING:
            return {
                ...state,
                isListConnectorConnectPluginsPending: true,
            };
        case connectPluginTypes.LIST_CONNECTOR_CONNECT_PLUGINS_FULFILLED:
            return {
                ...state,
                connectorConnectPlugins: action.payload.map(
                    (plugin, index) => ({
                        ...plugin,
                        id: index + 1,
                    }),
                ),
                isListConnectorConnectPluginsPending: false,
            };
        case connectPluginTypes.LIST_CONNECTOR_CONNECT_PLUGINS_REJECTED:
            return {
                ...state,
                connectorConnectPlugins: [],
                isListConnectorConnectPluginsPending: false,
            };

        // GET_CONNECT_PLUGIN_CONFIG_KEYS
        case connectPluginTypes.GET_CONNECT_PLUGIN_CONFIG_KEYS_PENDING:
            return {
                ...state,
                isGetConnectPluginConfigKeysPending: true,
            };
        case connectPluginTypes.GET_CONNECT_PLUGIN_CONFIG_KEYS_FULFILLED: {
            const { pluginType }: { pluginType: ConnectPluginType } =
                action.meta;
            const computedConfigKeys = computeConfigKeys(
                pluginType,
                action.payload,
            );
            return {
                ...state,
                connectPluginConfigKeys: computedConfigKeys,
                isGetConnectPluginConfigKeysPending: false,
            };
        }
        case connectPluginTypes.GET_CONNECT_PLUGIN_CONFIG_KEYS_REJECTED: {
            const { pluginType }: { pluginType: ConnectPluginType } =
                action.meta;
            const computedConfigKeys = computeConfigKeys(pluginType, []);
            return {
                ...state,
                connectPluginConfigKeys: computedConfigKeys,
                isGetConnectPluginConfigKeysPending: false,
            };
        }

        // VALIDATE_CONFIGURATIONS
        case connectPluginTypes.VALIDATE_CONFIGURATIONS_PENDING:
            return {
                ...state,
                isValidateConfigurationsPending: true,
            };
        case connectPluginTypes.VALIDATE_CONFIGURATIONS_FULFILLED:
            return {
                ...state,
                connectPluginValidationResponse: action.payload,
                isValidateConfigurationsPending: false,
            };
        case connectPluginTypes.VALIDATE_CONFIGURATIONS_REJECTED:
            return {
                ...state,
                connectPluginValidationResponse: null,
                isValidateConfigurationsPending: false,
            };

        default:
            return state;
    }
}

export default connectPluginReducer;
