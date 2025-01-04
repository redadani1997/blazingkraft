import { Alert, Text } from '@mantine/core';
import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import KsqlDbPermissionsRendererComponent from './KsqlDbPermissionsRendererComponent';

interface KsqlDbPermissionsRendererInterface {
    ksqlDbPermissions: Map<string, string[]>;
    setKsqlDbPermissions: (ksqlDbPermissions: Map<string, string[]>) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

const KsqlDbPermissionsRenderer = (
    props: KsqlDbPermissionsRendererInterface,
) => {
    // Map State To Props
    const { ksqlDbFeatures } = useSelector((store: ReduxStore) => {
        const { features } = store.settingsReducer;

        return {
            ksqlDbFeatures: features ? features.ksqlDbFeatures : null,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    if (!ksqlDbFeatures) {
        return null;
    }

    if (ksqlDbFeatures.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Notice"
                color="lime"
                className="mt-2"
            >
                <Text>
                    No Configured KsqlDb. Please create a KsqlDb Server to be
                    able to handle its permissions
                </Text>
            </Alert>
        );
    }
    return (
        <KsqlDbPermissionsRendererComponent
            {...props}
            ksqlDbFeatures={ksqlDbFeatures}
        />
    );
};

export default React.memo(KsqlDbPermissionsRenderer);
