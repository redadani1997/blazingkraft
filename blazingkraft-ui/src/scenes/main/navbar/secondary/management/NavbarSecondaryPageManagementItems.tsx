import { AlertPermissions } from 'common/permissions/management/AlertPermissions';
import { AuditPermissions } from 'common/permissions/management/AuditPermissions';
import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { ServerPermissions } from 'common/permissions/management/ServerPermissions';
import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage } from '../..';
import NavbarSecondaryPageManagementItemsComponent from './NavbarSecondaryPageManagementItemsComponent';

interface NavbarSecondaryPageManagementItemsProps {
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPageManagementItems = ({
    setActivePage,
}: NavbarSecondaryPageManagementItemsProps) => {
    // Map State To Props
    const { activeLink } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
        };
    }, shallowEqual);
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
    const { isAuthorized: isAuthorizedServerPermissionsFeature } =
        useAuthorization({
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

    return (
        <NavbarSecondaryPageManagementItemsComponent
            setActivePage={setActivePage}
            activeLink={activeLink}
            isAuthorizedDataMaskingFeature={isAuthorizedDataMaskingFeature}
            isAuthorizedGroupFeature={isAuthorizedGroupFeature}
            isAuthorizedOIDCProviderFeature={isAuthorizedOIDCProviderFeature}
            isAuthorizedServerPermissionsFeature={
                isAuthorizedServerPermissionsFeature
            }
            isAuthorizedUserFeature={isAuthorizedUserFeature}
            isAuthorizedAuditFeature={isAuthorizedAuditFeature}
            isAuthorizedAlertFeature={isAuthorizedAlertFeature}
        />
    );
};

export default NavbarSecondaryPageManagementItems;
