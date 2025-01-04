import CommonTabs from 'scenes/common/tabs/CommonTabs';
import ClusterDashboardBrokers from './brokers/ClusterDashboardBrokers';
import ClusterDashboardDetails from './details/ClusterDashboardDetails';
import ClusterDashboardMonitoring from './monitoring/ClusterDashboardMonitoring';

interface ClusterDashboardBodyComponentProps {
    jmxEnabled: boolean;
}

const ClusterDashboardBodyComponent = ({
    jmxEnabled,
}: ClusterDashboardBodyComponentProps) => {
    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: 'Client Configuration',
                className: 'h-full',
            }}
            items={[
                {
                    label: 'Client Configuration',
                    value: 'Client Configuration',
                    children: <ClusterDashboardDetails />,
                },
                {
                    label: 'Brokers',
                    value: 'Brokers',
                    children: <ClusterDashboardBrokers />,
                },
                {
                    label: 'Monitoring',
                    value: 'Monitoring',
                    children: (
                        <ClusterDashboardMonitoring jmxEnabled={jmxEnabled} />
                    ),
                },
            ]}
        />
    );
};

export default ClusterDashboardBodyComponent;
