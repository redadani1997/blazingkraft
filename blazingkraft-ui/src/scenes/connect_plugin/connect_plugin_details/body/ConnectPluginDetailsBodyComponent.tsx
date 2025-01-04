import { Alert, Anchor, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { KafkaConfiguration } from 'kafka/index';
import { useMemo } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface AllConnectorsBodyComponentProps {
    connectPluginConfigKeys: KafkaConfiguration[];
    isGetConnectPluginConfigKeysPending: boolean;
}

function computeConfigurationValues(configurations: KafkaConfiguration[]) {
    const configurationValues = new Map<string, string>();
    configurations.forEach(config => {
        configurationValues.set(config.name, config.default);
    });
    return configurationValues;
}

const AllConnectorsBodyComponent = ({
    connectPluginConfigKeys,
    isGetConnectPluginConfigKeysPending,
}: AllConnectorsBodyComponentProps) => {
    const configurations = useMemo(
        () =>
            KafkaConfigurationUtils.disableConfigurations(
                connectPluginConfigKeys,
            ),
        [connectPluginConfigKeys],
    );

    const configurationValuesJsonString = useMemo(
        () =>
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(
                    computeConfigurationValues(configurations),
                ),
            ),
        [configurations],
    );

    return (
        <div className="flex flex-col h-full w-full">
            <div className="h-auto mb-2">
                <Alert
                    icon={<TbAlertCircle size="1.4rem" />}
                    title="Info"
                    color="blue"
                >
                    <Text>
                        * This configuration only contains the connector's
                        specific config, it does not include the common config.
                    </Text>
                    <Text>
                        * Learn more about the common config for{' '}
                        <Anchor
                            size="xs"
                            href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#kconnect-long-source-configuration-properties-for-cp`}
                            target="_blank"
                            className="mr-2"
                        >
                            Source Connectors
                        </Anchor>{' '}
                        and{' '}
                        <Anchor
                            size="xs"
                            href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#kconnect-long-sink-configuration-properties-for-cp`}
                            target="_blank"
                            className="mr-2"
                        >
                            Sink Connectors
                        </Anchor>
                    </Text>
                </Alert>
            </div>
            <CommonTabs
                container={{
                    variant: 'default',
                    defaultValue: 'Beautified Configuration',
                    className: 'h-full',
                }}
                items={[
                    {
                        label: 'Beautified Configuration',
                        value: 'Beautified Configuration',
                        children: (
                            <ConfigurationsTabs
                                configurationValues={new Map()}
                                configurations={configurations}
                                setConfigurationValues={() => {
                                    // noop
                                }}
                                isLoading={isGetConnectPluginConfigKeysPending}
                            />
                        ),
                    },
                    {
                        label: 'Raw Configuration',
                        value: 'Raw Configuration',
                        children: (
                            <RawConfiguration
                                rawConfiguration={configurationValuesJsonString}
                                readOnly
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AllConnectorsBodyComponent;
