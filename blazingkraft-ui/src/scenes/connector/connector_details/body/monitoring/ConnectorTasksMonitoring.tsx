import { Alert, Text } from '@mantine/core';
import { ConnectPluginType } from 'common/types/connect_plugin';
import { TbAlertCircle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ConnectorTasksMonitoringComponent from './ConnectorTasksMonitoringComponent';

interface ConnectorTasksMonitoringProps {
    jmxEnabled: boolean;
    connectorType: ConnectPluginType;
}

const ConnectorTasksMonitoring = ({
    jmxEnabled,
    connectorType,
}: ConnectorTasksMonitoringProps) => {
    // Map State To Props
    const { isMonitorConnectorTasksPending, connectorTasksMonitoring } =
        useSelector((store: ReduxStore) => {
            return {
                connectorTasksMonitoring:
                    store.connectorReducer.connectorTasksMonitoring,
                isMonitorConnectorTasksPending:
                    store.connectorReducer.isMonitorConnectorTasksPending,
            };
        }, shallowEqual);

    // Map Dispatch To Props

    if (!jmxEnabled) {
        return (
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
                className="mb-4"
            >
                <Text>
                    Monitoring is disabled, please enable it in the Kafka
                    Connect client configuration.
                </Text>
            </Alert>
        );
    }

    return (
        <>
            <ConnectorTasksMonitoringComponent
                connectorTasksMonitoring={connectorTasksMonitoring}
                isMonitorConnectorTasksPending={isMonitorConnectorTasksPending}
                connectorType={connectorType}
            />
        </>
    );
};

export default ConnectorTasksMonitoring;
