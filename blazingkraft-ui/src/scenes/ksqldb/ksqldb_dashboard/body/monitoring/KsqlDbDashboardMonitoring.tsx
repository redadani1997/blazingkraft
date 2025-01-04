import { Alert, Text } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import KsqlDbDashboardMonitoringComponent from './KsqlDbDashboardMonitoringComponent';

interface KsqlDbDashboardMonitoringProps {
    jmxEnabled: boolean;
}

const KsqlDbDashboardMonitoring = ({
    jmxEnabled,
}: KsqlDbDashboardMonitoringProps) => {
    // Map State To Props
    const { isMonitorKsqlDbPending, ksqlDbMonitoring } = useSelector(
        (store: ReduxStore) => {
            return {
                ksqlDbMonitoring: store.ksqlDbReducer.ksqlDbMonitoring,
                isMonitorKsqlDbPending:
                    store.ksqlDbReducer.isMonitorKsqlDbPending,
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
                    Monitoring is disabled, please enable it in the KsqlDb
                    client configuration.
                </Text>
            </Alert>
        );
    }

    return (
        <>
            <KsqlDbDashboardMonitoringComponent
                ksqlDbMonitoring={ksqlDbMonitoring}
                isMonitorKsqlDbPending={isMonitorKsqlDbPending}
            />
        </>
    );
};

export default KsqlDbDashboardMonitoring;
