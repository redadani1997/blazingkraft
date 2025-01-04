import { AlertPermissions } from 'common/permissions/management/AlertPermissions';
import { AuditPermissions } from 'common/permissions/management/AuditPermissions';
import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { ServerPermissions } from 'common/permissions/management/ServerPermissions';
import { UserPermissions } from 'common/permissions/management/UserPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import UseSpotlightManagementActionsComponent from './UseSpotlightManagementActionsComponent';

const UseSpotlightManagementActions = () => {
    // Map State To Props

    // Map Dispatch To Props

    // Allowance
    const { isAuthorized: isAuthorizedDataMaskingFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    DataMaskingPermissions.DATA_MASKING_PERMISSIONS
                        .DATA_MASKING_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedGroupFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    GroupPermissions.GROUP_PERMISSIONS.GROUP_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedOIDCProviderFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS
                        .OIDC_PROVIDER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedServerPermissionsFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ServerPermissions.SERVER_PERMISSIONS
                        .SERVER_PERMISSIONS_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedUserFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    UserPermissions.USER_PERMISSIONS.USER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedAuditFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    AuditPermissions.AUDIT_PERMISSIONS.AUDIT_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedAlertFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    AlertPermissions.ALERT_PERMISSIONS.ALERT_FEATURE_ENABLED,
            },
        ],
    });

    return UseSpotlightManagementActionsComponent({
        isAuthorizedDataMaskingFeature,
        isAuthorizedGroupFeature,
        isAuthorizedOIDCProviderFeature,
        isAuthorizedServerPermissionsFeature,
        isAuthorizedUserFeature,
        isAuthorizedAuditFeature,
        isAuthorizedAlertFeature,
    });
};

export default UseSpotlightManagementActions;
