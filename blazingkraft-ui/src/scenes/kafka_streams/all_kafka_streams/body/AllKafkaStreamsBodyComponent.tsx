import { Alert, Text } from '@mantine/core';
import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { TbAlertCircle } from 'react-icons/tb';

const AllKafkaStreamsBodyComponent = () => {
    return (
        <Alert
            icon={<TbAlertCircle size="1.4rem" />}
            title="Info"
            color="blue"
            className="mb-4"
        >
            {CommonDesktopUtils.isWeb() ? (
                <Text>
                    Kafka Streams is still a work in progress. Feel free to
                    disable this feature through server permissions or group
                    permissions.
                </Text>
            ) : (
                <Text>
                    Kafka Streams is still a work in progress. In future
                    releases you'll be able to manage your Kafka Streams through
                    Blazing KRaft.
                </Text>
            )}
        </Alert>
    );
};

export default AllKafkaStreamsBodyComponent;
