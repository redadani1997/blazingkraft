import { SpotlightAction } from '@mantine/spotlight';
import { useMemo } from 'react';
import { SiApachekafka } from 'react-icons/si';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import { CommonFeature } from 'scenes/settings/redux';
import { SpotlightClusterActionsUtils } from './utils/SpotlightClusterActionsUtils';

interface UseSpotlightClusterActionsComponentProps {
    isAuthorizedClustersFeature: boolean;
    clusterFeatures: CommonFeature[];
}

function UseSpotlightClusterActionsComponent({
    clusterFeatures,
    isAuthorizedClustersFeature,
}: UseSpotlightClusterActionsComponentProps): SpotlightAction[] {
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
        if (!isAuthorizedClustersFeature) return [];
        const computedActions: SpotlightAction[] = [
            {
                group: 'Cluster',
                title: `Clusters`,
                description: 'Describe Clusters',
                icon: <SiApachekafka size="2rem" />,
                onTrigger: () => {
                    navigate(`/clusters`);
                },
            },
        ];
        clusterFeatures.forEach(feature => {
            const codeActions = SpotlightClusterActionsUtils.getActions({
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
        isAuthorizedClustersFeature,
        clusterFeatures,
        navigate,
        serverPermissions,
        userPermissions,
        isBlazingAdmin,
    ]);
    return actions;
}

export default UseSpotlightClusterActionsComponent;
