import { Alert, Text } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';

const SchemaRegistryDashboardMonitoringComponent = () => {
    return (
        <>
            <Alert
                icon={<TbAlertCircle size="1.4rem" />}
                title="Info"
                color="blue"
                className="mb-4"
            >
                <Text>
                    Schema Registry Monitoring is still a work in progress.
                </Text>
            </Alert>
        </>
    );
};

export default SchemaRegistryDashboardMonitoringComponent;
