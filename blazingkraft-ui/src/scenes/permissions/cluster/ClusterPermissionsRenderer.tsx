import { Alert, Text } from '@mantine/core';
import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ClusterPermissionsRendererComponent from './ClusterPermissionsRendererComponent';

interface ClusterPermissionsRendererInterface {
    clusterPermissions: Map<string, string[]>;
    setClusterPermissions: (clusterPermissions: Map<string, string[]>) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

const ClusterPermissionsRenderer = (
    props: ClusterPermissionsRendererInterface,
) => {
    // Map State To Props
    const { clusterFeatures } = useSelector((store: ReduxStore) => {
        const { features } = store.settingsReducer;

        return {
            clusterFeatures: features ? features.clusterFeatures : null,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    if (!clusterFeatures) {
        return null;
    }

    if (clusterFeatures.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Notice"
                color="lime"
                className="mt-2"
            >
                <Text>
                    No Configured Cluster. Please create a Kafka Cluster to be
                    able to handle its permissions
                </Text>
            </Alert>
        );
    }

    return (
        <ClusterPermissionsRendererComponent
            {...props}
            clusterFeatures={clusterFeatures}
        />
    );
};

export default React.memo(ClusterPermissionsRenderer);
