import {
    ConfigurationDataTypesType,
    ConfigurationImportanceType,
} from 'kafka/index';

export type ConnectPluginType =
    | 'source'
    | 'sink'
    | 'transformation'
    | 'header_converter'
    | 'converter';

export interface ConnectPlugin {
    id: number;
    version: string;
    type: ConnectPluginType;
    class: string;
}

export interface ConnectPluginConfigKey {
    default_value: string;
    dependents: string[];
    display_name: string;
    documentation: string;
    group: string;
    importance: ConfigurationImportanceType;
    name: string;
    order: number;
    order_in_group: number;
    required: boolean;
    type: ConfigurationDataTypesType;
    width: string;
}

export interface ConnectPluginConfigValue {
    errors: string[];
    name: string;
    recommended_values: string[];
    value: string;
}

export interface ConnectPluginConfigInfo {
    definition: ConnectPluginConfigKey;
    value: ConnectPluginConfigValue;
}

export interface ConnectPluginValidationResponse {
    error_count: number;
    group: string;
    name: string;
    configs: ConnectPluginConfigInfo[];
}
