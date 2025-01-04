import { SpotlightAction } from '@mantine/spotlight';
import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import UseSpotlightClusterActionsComponent from './UseSpotlightClusterActionsComponent';

const UseSpotlightClusterActions = (): SpotlightAction[] => {
    // Map State To Props
    const { features } = useSelector((store: ReduxStore) => {
        return {
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedClustersFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
            },
        ],
    });

    if (CommonValidationUtils.isFalsy(features)) {
        return [];
    }
    const { clusterFeatures } = features;

    return UseSpotlightClusterActionsComponent({
        clusterFeatures,
        isAuthorizedClustersFeature,
    });
};

export default UseSpotlightClusterActions;
