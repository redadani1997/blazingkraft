import CommonTabs from 'scenes/common/tabs/CommonTabs';
import KsqlDbDashboardDetails from './details/KsqlDbDashboardDetails';
import KsqlDbDashboardMonitoring from './monitoring/KsqlDbDashboardMonitoring';

interface KsqlDbDashboardBodyComponentProps {
    jmxEnabled: boolean;
}

const KsqlDbDashboardBodyComponent = ({
    jmxEnabled,
}: KsqlDbDashboardBodyComponentProps) => {
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
                    children: <KsqlDbDashboardDetails />,
                },
                {
                    label: 'Monitoring',
                    value: 'Monitoring',
                    children: (
                        <KsqlDbDashboardMonitoring jmxEnabled={jmxEnabled} />
                    ),
                },
            ]}
        />
    );
};

export default KsqlDbDashboardBodyComponent;
