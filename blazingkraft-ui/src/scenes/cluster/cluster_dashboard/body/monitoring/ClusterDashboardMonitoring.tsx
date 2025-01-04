import { Alert, Text } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ClusterDashboardMonitoringComponent from './ClusterDashboardMonitoringComponent';

interface ClusterDashboardMonitoringProps {
    jmxEnabled: boolean;
}

const ClusterDashboardMonitoring = ({
    jmxEnabled,
}: ClusterDashboardMonitoringProps) => {
    // Map State To Props
    const { isMonitorClusterPending, clusterMonitoring } = useSelector(
        (store: ReduxStore) => {
            return {
                clusterMonitoring: store.clusterReducer.clusterMonitoring,
                isMonitorClusterPending:
                    store.clusterReducer.isMonitorClusterPending,
            };
        },
        shallowEqual,
    );

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
                    Cluster client configuration.
                </Text>
            </Alert>
        );
    }

    return (
        <>
            <ClusterDashboardMonitoringComponent
                clusterMonitoring={clusterMonitoring}
                isMonitorClusterPending={isMonitorClusterPending}
            />
        </>
    );
};

export default ClusterDashboardMonitoring;
