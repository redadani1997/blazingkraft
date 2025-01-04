import { Alert, Text } from '@mantine/core';
import { TbAlertCircle } from 'react-icons/tb';

const AllAlertsBodyComponent = () => {
    return (
        <Alert
            icon={<TbAlertCircle size="1.4rem" />}
            title="Info"
            color="blue"
            className="mb-4"
        >
            <Text>
                Alerts are still a work in progress. Feel free to disable this
                feature through server permissions or group permissions.
            </Text>
        </Alert>
    );
};

export default AllAlertsBodyComponent;
