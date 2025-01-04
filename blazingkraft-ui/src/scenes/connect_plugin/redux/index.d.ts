import {
    ConnectPlugin,
    ConnectPluginValidationResponse,
} from 'common/types/connect_plugin';
import { KafkaConfiguration } from 'kafka/index';

export type ConnectPluginReducerState = {
    allConnectPlugins: ConnectPlugin[];
    connectorConnectPlugins: ConnectPlugin[];
    connectPluginConfigKeys: KafkaConfiguration[];
    connectPluginValidationResponse: ConnectPluginValidationResponse | null;
    isGetConnectPluginConfigKeysPending: boolean;
    isListAllConnectPluginsPending: boolean;
    isListConnectorConnectPluginsPending: boolean;
    isValidateConfigurationsPending: boolean;
};
