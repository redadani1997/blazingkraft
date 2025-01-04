import { SpotlightAction } from '@mantine/spotlight';
import { useMemo } from 'react';
import { BsFolder2Open } from 'react-icons/bs';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import { CommonFeature } from 'scenes/settings/redux';
import { SpotlightSchemaRegistryActionsUtils } from './utils/SpotlightSchemaRegistryActionsUtils';

interface UseSpotlightSchemaRegistryActionsComponentProps {
    isAuthorizedSchemaRegistrysFeature: boolean;
    schemaRegistryFeatures: CommonFeature[];
}

function UseSpotlightSchemaRegistryActionsComponent({
    schemaRegistryFeatures,
    isAuthorizedSchemaRegistrysFeature,
}: UseSpotlightSchemaRegistryActionsComponentProps): SpotlightAction[] {
    const navigate = useNavigate();
    const { serverPermissions, userPermissions, isBlazingAdmin } = useSelector(
        (state: ReduxStore) => ({
            serverPermissions: state.settingsReducer.serverPermissions,
            userPermissions: state.settingsReducer.userPermissions,
            isBlazingAdmin: state.settingsReducer.isBlazingAdmin,
        }),
        shallowEqual,
    );

    const actions: SpotlightAction[] = useMemo(() => {
        if (!isAuthorizedSchemaRegistrysFeature) return [];
        const computedActions: SpotlightAction[] = [
            {
                group: 'Schema Registry',
                title: `Schema Registries`,
                description: 'Describe Schema Registries',
                icon: <BsFolder2Open size="2rem" />,
                onTrigger: () => {
                    navigate(`/schema_registries`);
                },
            },
        ];
        schemaRegistryFeatures.forEach(feature => {
            const codeActions = SpotlightSchemaRegistryActionsUtils.getActions({
                serverPermissions,
                userPermissions,
                isBlazingAdmin,
                name: feature.name,
                code: feature.code,
                navigate,
            });
            computedActions.push(...codeActions);
        });
        return computedActions;
    }, [
        isAuthorizedSchemaRegistrysFeature,
        schemaRegistryFeatures,
        navigate,
        serverPermissions,
        userPermissions,
        isBlazingAdmin,
    ]);
    return actions;
}

export default UseSpotlightSchemaRegistryActionsComponent;
