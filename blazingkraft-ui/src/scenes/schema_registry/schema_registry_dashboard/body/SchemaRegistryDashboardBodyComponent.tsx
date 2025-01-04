import CommonTabs from 'scenes/common/tabs/CommonTabs';
import SchemaRegistryDashboardDetails from './details/SchemaRegistryDashboardDetails';
import SchemaRegistryDashboardMonitoring from './monitoring/SchemaRegistryDashboardMonitoring';

const SchemaRegistryDashboardBodyComponent = () => {
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
                    children: <SchemaRegistryDashboardDetails />,
                },
                {
                    label: 'Monitoring',
                    value: 'Monitoring',
                    children: <SchemaRegistryDashboardMonitoring />,
                },
            ]}
        />
    );
};

export default SchemaRegistryDashboardBodyComponent;
