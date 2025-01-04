import { ConnectorStateInfo } from 'common/types/connector';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { KafkaConfiguration } from 'kafka/index';
import { useMemo } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import ConnectorDetailsMetadata from './metadata/ConnectorDetailsMetadata';
import ConnectorTasksMonitoring from './monitoring/ConnectorTasksMonitoring';
import ConnectorDetailsTasks from './tasks/ConnectorDetailsTasks';

interface AllConnectorsBodyComponentProps {
    connectPluginConfigKeys: KafkaConfiguration[];
    isGetConnectPluginConfigKeysPending: boolean;
    connectorConfig: Map<string, any>;
    connectorStateInfo: ConnectorStateInfo;
    isGetConnectorConfigPending: boolean;
    isGetConnectorStateInfoPending: boolean;
    setTaskToRestart: (taskToRestart: number | null) => void;
    setIsRestartTaskModalOpen: (isRestartTaskModalOpen: boolean) => void;
    jmxEnabled: boolean;
}

const AllConnectorsBodyComponent = ({
    connectPluginConfigKeys,
    connectorConfig,
    connectorStateInfo,
    isGetConnectorStateInfoPending,
    setIsRestartTaskModalOpen,
    setTaskToRestart,
    isGetConnectPluginConfigKeysPending,
    isGetConnectorConfigPending,
    jmxEnabled,
}: AllConnectorsBodyComponentProps) => {
    const configurations = useMemo(
        () =>
            KafkaConfigurationUtils.disableConfigurations(
                connectPluginConfigKeys,
            ),
        [connectPluginConfigKeys],
    );

    return (
        <div className="h-full w-full flex flex-col">
            <ConnectorDetailsMetadata
                connectorStateInfo={connectorStateInfo}
                isGetConnectorStateInfoPending={isGetConnectorStateInfoPending}
            />
            <CommonTabs
                container={{
                    variant: 'default',
                    defaultValue: 'Tasks',
                    className: 'h-full',
                }}
                items={[
                    {
                        label: 'Tasks',
                        value: 'Tasks',
                        children: (
                            <ConnectorDetailsTasks
                                connectorStateInfo={connectorStateInfo}
                                isGetConnectorStateInfoPending={
                                    isGetConnectorStateInfoPending
                                }
                                setIsRestartTaskModalOpen={
                                    setIsRestartTaskModalOpen
                                }
                                setTaskToRestart={setTaskToRestart}
                            />
                        ),
                    },
                    {
                        label: 'Beautified Configuration',
                        value: 'Beautified Configuration',
                        children: (
                            <ConfigurationsTabs
                                configurationValues={connectorConfig}
                                configurations={configurations}
                                setConfigurationValues={() => {
                                    // noop
                                }}
                                isLoading={
                                    isGetConnectPluginConfigKeysPending ||
                                    isGetConnectorConfigPending
                                }
                            />
                        ),
                    },
                    {
                        label: 'Raw Configuration',
                        value: 'Raw Configuration',
                        children: (
                            <RawConfiguration
                                rawConfiguration={CommonUtils.beautifyJson(
                                    CommonUtils.mapToObject(connectorConfig),
                                )}
                                readOnly
                            />
                        ),
                    },
                    {
                        label: 'Monitoring',
                        value: 'Monitoring',
                        children: (
                            <ConnectorTasksMonitoring
                                jmxEnabled={jmxEnabled}
                                connectorType={connectorStateInfo?.type}
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AllConnectorsBodyComponent;
