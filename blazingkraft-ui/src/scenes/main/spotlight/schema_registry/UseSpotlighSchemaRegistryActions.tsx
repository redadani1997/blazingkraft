import { SpotlightAction } from '@mantine/spotlight';
import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import UseSpotlightSchemaRegistryActionsComponent from './UseSpotlightSchemaRegistryActionsComponent';

const UseSpotlightSchemaRegistryActions = (): SpotlightAction[] => {
    // Map State To Props
    const { features } = useSelector((store: ReduxStore) => {
        return {
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedSchemaRegistrysFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                },
            ],
        });

    if (CommonValidationUtils.isFalsy(features)) {
        return [];
    }
    const { schemaRegistryFeatures } = features;

    return UseSpotlightSchemaRegistryActionsComponent({
        schemaRegistryFeatures,
        isAuthorizedSchemaRegistrysFeature,
    });
};

export default UseSpotlightSchemaRegistryActions;
