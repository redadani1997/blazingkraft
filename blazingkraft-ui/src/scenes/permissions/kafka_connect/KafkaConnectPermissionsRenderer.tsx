import { Alert, Text } from '@mantine/core';
import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import KafkaConnectPermissionsRendererComponent from './KafkaConnectPermissionsRendererComponent';

interface KafkaConnectPermissionsRendererInterface {
    kafkaConnectPermissions: Map<string, string[]>;
    setKafkaConnectPermissions: (
        kafkaConnectPermissions: Map<string, string[]>,
    ) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

const KafkaConnectPermissionsRenderer = (
    props: KafkaConnectPermissionsRendererInterface,
) => {
    // Map State To Props
    const { kafkaConnectFeatures } = useSelector((store: ReduxStore) => {
        const { features } = store.settingsReducer;

        return {
            kafkaConnectFeatures: features
                ? features.kafkaConnectFeatures
                : null,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    if (!kafkaConnectFeatures) {
        return null;
    }

    if (kafkaConnectFeatures.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Notice"
                color="lime"
                className="mt-2"
            >
                <Text>
                    No Configured Kafka Connect. Please create a Kafka Connect
                    Cluster to be able to handle its permissions
                </Text>
            </Alert>
        );
    }
    return (
        <KafkaConnectPermissionsRendererComponent
            {...props}
            kafkaConnectFeatures={kafkaConnectFeatures}
        />
    );
};

export default React.memo(KafkaConnectPermissionsRenderer);
