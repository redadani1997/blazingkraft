import { SpotlightAction } from '@mantine/spotlight';
import { useMemo } from 'react';
import { TbPlugConnected } from 'react-icons/tb';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import { CommonFeature } from 'scenes/settings/redux';
import { SpotlightKafkaConnectActionsUtils } from './utils/SpotlightKafkaConnectActionsUtils';

interface UseSpotlightKafkaConnectActionsComponentProps {
    isAuthorizedKafkaConnectsFeature: boolean;
    kafkaConnectFeatures: CommonFeature[];
}

function UseSpotlightKafkaConnectActionsComponent({
    kafkaConnectFeatures,
    isAuthorizedKafkaConnectsFeature,
}: UseSpotlightKafkaConnectActionsComponentProps): SpotlightAction[] {
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
        if (!isAuthorizedKafkaConnectsFeature) return [];
        const computedActions: SpotlightAction[] = [
            {
                group: 'Kafka Connect',
                title: `Kafka Connects`,
                description: 'Describe Kafka Connects',
                icon: <TbPlugConnected size="2rem" />,
                onTrigger: () => {
                    navigate(`/kafka_connects`);
                },
            },
        ];
        kafkaConnectFeatures.forEach(feature => {
            const codeActions = SpotlightKafkaConnectActionsUtils.getActions({
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
        isAuthorizedKafkaConnectsFeature,
        kafkaConnectFeatures,
        navigate,
        serverPermissions,
        userPermissions,
        isBlazingAdmin,
    ]);
    return actions;
}

export default UseSpotlightKafkaConnectActionsComponent;
