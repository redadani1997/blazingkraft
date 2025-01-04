import { Text } from '@mantine/core';
import { ConnectPluginConfigKey } from 'common/types/connect_plugin';
import { ConfigurationDataTypesType, KafkaConfiguration } from 'kafka/index';
import { CommonValidationUtils } from './CommonValidationUtils';

function parseOrGet(value: string, type: ConfigurationDataTypesType) {
    if (
        type === 'INT' ||
        type === 'LONG' ||
        type === 'DOUBLE' ||
        type === 'SHORT'
    ) {
        return Number(value);
    }
    return value;
}

function pluginConfigsToKafkaConnectConfigs(
    pluginConfigs: ConnectPluginConfigKey[],
): KafkaConfiguration[] {
    if (CommonValidationUtils.isFalsyArray(pluginConfigs)) {
        return [];
    }

    return pluginConfigs.map(pluginConfig => {
        const {
            name,
            default_value,
            dependents,
            display_name,
            documentation,
            group,
            importance,
            order,
            order_in_group,
            required,
            type,
            width,
        } = pluginConfig;

        return {
            displayedName: display_name,
            name: name,
            documentation: <Text size="md">{documentation}</Text>,
            type: type,
            required: required,
            default: parseOrGet(default_value, type),
            displayedDefault: default_value,
            validValues: null,
            documentationProps: null,
            importance: importance,
            validate: () => true,
            errorMessage: null,
            isSelectable: false,
            disabledForever: false,
            disabled: false,
            disabledMessage: null,
            options: null,
            proTip: null,
            numericUnit: null,
            group: group,
            order: order,
            orderInGroup: order_in_group,
            width: width,
            dependents: dependents,
            isFileConfig: false,
            readOnly: false,
            sensitive: false,
            source: null,
        };
    });
}

const KafkaConnectUtils = {
    pluginConfigsToKafkaConnectConfigs,
};

export { KafkaConnectUtils };
