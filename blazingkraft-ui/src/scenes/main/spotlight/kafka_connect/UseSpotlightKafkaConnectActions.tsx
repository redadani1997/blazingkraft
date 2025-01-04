import { SpotlightAction } from '@mantine/spotlight';
import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import UseSpotlightKafkaConnectActionsComponent from './UseSpotlightKafkaConnectActionsComponent';

const UseSpotlightKafkaConnectActions = (): SpotlightAction[] => {
    // Map State To Props
    const { features } = useSelector((store: ReduxStore) => {
        return {
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKafkaConnectsFeature } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementKafkaConnectPermissions
                            .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                            .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                },
            ],
        },
    );

    if (CommonValidationUtils.isFalsy(features)) {
        return [];
    }
    const { kafkaConnectFeatures } = features;

    return UseSpotlightKafkaConnectActionsComponent({
        kafkaConnectFeatures,
        isAuthorizedKafkaConnectsFeature,
    });
};

export default UseSpotlightKafkaConnectActions;
