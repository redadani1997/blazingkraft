import CommonTabs from 'scenes/common/tabs/CommonTabs';
import KafkaConnectDashboardDetails from './details/KafkaConnectDashboardDetails';
import KafkaConnectDashboardMonitoring from './monitoring/KafkaConnectDashboardMonitoring';

interface KafkaConnectDashboardBodyComponentProps {
    jmxEnabled: boolean;
}

const KafkaConnectDashboardBodyComponent = ({
    jmxEnabled,
}: KafkaConnectDashboardBodyComponentProps) => {
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
                    children: <KafkaConnectDashboardDetails />,
                },
                {
                    label: 'Monitoring',
                    value: 'Monitoring',
                    children: (
                        <KafkaConnectDashboardMonitoring
                            jmxEnabled={jmxEnabled}
                        />
                    ),
                },
            ]}
        />
    );
};

export default KafkaConnectDashboardBodyComponent;
