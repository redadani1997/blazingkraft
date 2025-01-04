import { SpotlightAction } from '@mantine/spotlight';
import { useMemo } from 'react';
import { BsDatabase } from 'react-icons/bs';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import { CommonFeature } from 'scenes/settings/redux';
import { SpotlightKsqlDbActionsUtils } from './utils/SpotlightKsqlDbActionsUtils';

interface UseSpotlightKsqlDbActionsComponentProps {
    isAuthorizedKsqlDbsFeature: boolean;
    ksqlDbFeatures: CommonFeature[];
}

function UseSpotlightKsqlDbActionsComponent({
    ksqlDbFeatures,
    isAuthorizedKsqlDbsFeature,
}: UseSpotlightKsqlDbActionsComponentProps): SpotlightAction[] {
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
        if (!isAuthorizedKsqlDbsFeature) return [];
        const computedActions: SpotlightAction[] = [
            {
                group: 'KsqlDb',
                title: `KsqlDbs`,
                description: 'Describe KsqlDbs',
                icon: <BsDatabase size="2rem" />,
                onTrigger: () => {
                    navigate(`/ksqldbs`);
                },
            },
        ];
        ksqlDbFeatures.forEach(feature => {
            const codeActions = SpotlightKsqlDbActionsUtils.getActions({
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
        isAuthorizedKsqlDbsFeature,
        ksqlDbFeatures,
        navigate,
        serverPermissions,
        userPermissions,
        isBlazingAdmin,
    ]);
    return actions;
}

export default UseSpotlightKsqlDbActionsComponent;
