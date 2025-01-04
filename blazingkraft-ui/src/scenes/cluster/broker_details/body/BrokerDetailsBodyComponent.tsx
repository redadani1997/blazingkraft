import { Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { KafkaConfiguration } from 'kafka/index';
import { useMemo } from 'react';
import { IClusterBrokerConfiguration } from 'scenes/cluster/redux';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface BrokerDetailsBodyComponentProps {
    clusterBrokerConfiguration: IClusterBrokerConfiguration;
    isGetClusterBrokerConfiguration: boolean;
}

function computeInitialConfigurationValues(configurations) {
    const configurationValues = new Map<string, string>();
    configurations.forEach(config => {
        configurationValues.set(config.name, config.default);
    });

    return configurationValues;
}

function computeInitialConfigurations(
    clusterBrokerConfiguration: IClusterBrokerConfiguration,
): KafkaConfiguration[] {
    return clusterBrokerConfiguration.configuration.map(entry => {
        const config: KafkaConfiguration = {
            displayedName: entry.name,
            name: entry.name,
            documentation: <Text>{entry.documentation}</Text>,
            type: entry.type,
            required: false,
            default: entry.value,
            displayedDefault: null,
            validValues: null,
            documentationProps: null,
            importance: 'HIGH',
            validate: null,
            errorMessage: null,
            isSelectable: false,
            disabledForever: false,
            disabled: false,
            disabledMessage: null,
            options: null,
            proTip: null,
            numericUnit: null,
            group: null,
            order: null,
            orderInGroup: null,
            width: null,
            dependents: null,
            isFileConfig: null,
            readOnly: entry.readOnly,
            sensitive: entry.sensitive,
            source: entry.source,
        };
        return config;
    });
}

const BrokerDetailsBodyComponent = ({
    clusterBrokerConfiguration,
    isGetClusterBrokerConfiguration,
}: BrokerDetailsBodyComponentProps) => {
    const configurations = useMemo(
        () =>
            KafkaConfigurationUtils.disableConfigurations(
                computeInitialConfigurations(clusterBrokerConfiguration),
            ),
        [clusterBrokerConfiguration],
    );

    const configurationValues = useMemo(
        () => computeInitialConfigurationValues(configurations),
        [clusterBrokerConfiguration, configurations],
    );

    const rawConfiguration = useMemo(
        () =>
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(configurationValues),
            ),
        [configurationValues],
    );

    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: 'Beautified Configuration',
                className: 'h-full',
            }}
            items={[
                {
                    label: 'Beautified Configuration',
                    value: 'Beautified Configuration',
                    children: (
                        <ConfigurationsTabs
                            configurationValues={configurationValues}
                            configurations={configurations}
                            setConfigurationValues={() => {
                                // no-op
                            }}
                            isLoading={isGetClusterBrokerConfiguration}
                        />
                    ),
                },
                {
                    label: 'Raw Configuration',
                    value: 'Raw Configuration',
                    children: (
                        <RawConfiguration
                            rawConfiguration={rawConfiguration}
                            readOnly
                        />
                    ),
                },
            ]}
        />
    );
};

export default BrokerDetailsBodyComponent;
