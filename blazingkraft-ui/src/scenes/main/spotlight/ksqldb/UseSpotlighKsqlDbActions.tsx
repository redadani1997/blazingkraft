import { SpotlightAction } from '@mantine/spotlight';
import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import UseSpotlightKsqlDbActionsComponent from './UseSpotlightKsqlDbActionsComponent';

const UseSpotlightKsqlDbActions = (): SpotlightAction[] => {
    // Map State To Props
    const { features } = useSelector((store: ReduxStore) => {
        return {
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKsqlDbsFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
            },
        ],
    });

    if (CommonValidationUtils.isFalsy(features)) {
        return [];
    }
    const { ksqlDbFeatures } = features;

    return UseSpotlightKsqlDbActionsComponent({
        ksqlDbFeatures,
        isAuthorizedKsqlDbsFeature,
    });
};

export default UseSpotlightKsqlDbActions;
