import { Alert, Text } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import KafkaConnectDashboardMonitoringComponent from './KafkaConnectDashboardMonitoringComponent';

interface KafkaConnectDashboardMonitoringProps {
    jmxEnabled: boolean;
}

const KafkaConnectDashboardMonitoring = ({
    jmxEnabled,
}: KafkaConnectDashboardMonitoringProps) => {
    // Map State To Props
    const { isMonitorKafkaConnectPending, kafkaConnectMonitoring } =
        useSelector((store: ReduxStore) => {
            return {
                kafkaConnectMonitoring:
                    store.kafkaConnectReducer.kafkaConnectMonitoring,
                isMonitorKafkaConnectPending:
                    store.kafkaConnectReducer.isMonitorKafkaConnectPending,
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
            <KafkaConnectDashboardMonitoringComponent
                kafkaConnectMonitoring={kafkaConnectMonitoring}
                isMonitorKafkaConnectPending={isMonitorKafkaConnectPending}
            />
        </>
    );
};

export default KafkaConnectDashboardMonitoring;
