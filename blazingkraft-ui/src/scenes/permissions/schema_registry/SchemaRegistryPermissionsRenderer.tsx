import { Alert, Text } from '@mantine/core';
import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import SchemaRegistryPermissionsRendererComponent from './SchemaRegistryPermissionsRendererComponent';

interface SchemaRegistryPermissionsRendererInterface {
    schemaRegistryPermissions: Map<string, string[]>;
    setSchemaRegistryPermissions: (
        schemaRegistryPermissions: Map<string, string[]>,
    ) => void;
    disabled?: boolean;
    basePermissions?: Map<string, string[]>;
}

const SchemaRegistryPermissionsRenderer = (
    props: SchemaRegistryPermissionsRendererInterface,
) => {
    // Map State To Props
    const { schemaRegistryFeatures } = useSelector((store: ReduxStore) => {
        const { features } = store.settingsReducer;

        return {
            schemaRegistryFeatures: features
                ? features.schemaRegistryFeatures
                : null,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    if (!schemaRegistryFeatures) {
        return null;
    }

    if (schemaRegistryFeatures.length === 0) {
        return (
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Notice"
                color="lime"
                className="mt-2"
            >
                <Text>
                    No Configured Schema Registry. Please create a Schema
                    Registry Server to be able to handle its permissions
                </Text>
            </Alert>
        );
    }
    return (
        <SchemaRegistryPermissionsRendererComponent
            {...props}
            schemaRegistryFeatures={schemaRegistryFeatures}
        />
    );
};

export default React.memo(SchemaRegistryPermissionsRenderer);
