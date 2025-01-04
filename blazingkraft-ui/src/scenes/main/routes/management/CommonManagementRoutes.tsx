import { AlertPermissions } from 'common/permissions/management/AlertPermissions';
import { AuditPermissions } from 'common/permissions/management/AuditPermissions';
import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { OIDCProviderPermissions } from 'common/permissions/management/OIDCProviderPermissions';
import { ServerPermissions } from 'common/permissions/management/ServerPermissions';
import { UserPermissions } from 'common/permissions/management/UserPermissions';
import { Route } from 'react-router';
import AllAlerts from 'scenes/alert/all_alerts/AllAlerts';
import AuditLog from 'scenes/audit/audit_log/AuditLog';
import WithAuthorization from 'scenes/common/authorization/hoc/WithAuthorization';
import AllDataMaskings from 'scenes/data_masking/all_data_maskings/AllDataMaskings';
import AllGroups from 'scenes/group/all_groups/AllGroups';
import CreateGroup from 'scenes/group/create_group/CreateGroup';
import EditGroup from 'scenes/group/edit_group/EditGroup';
import GroupDetails from 'scenes/group/group_details/GroupDetails';
import AllOIDCProviders from 'scenes/oidc_provider/all_oidc_providers/AllOIDCProviders';
import CreateOIDCProvider from 'scenes/oidc_provider/create_oidc_provider/CreateOIDCProvider';
import EditOIDCProvider from 'scenes/oidc_provider/edit_oidc_provider/EditOIDCProvider';
import OIDCProviderDetails from 'scenes/oidc_provider/oidc_provider_details/OIDCProviderDetails';
import EditServerPermissions from 'scenes/server_permissions/edit_server_permissions/EditServerPermissions';
import ServerPermissionsDetails from 'scenes/server_permissions/server_permissions_details/ServerPermissionsDetails';
import AllUsers from 'scenes/user/all_users/AllUsers';
import CreateUser from 'scenes/user/create_user/CreateUser';
import EditUser from 'scenes/user/edit_user/EditUser';
import UserDetails from 'scenes/user/user_details/UserDetails';
import CommonRoutesHoc from '../CommonRoutesHoc';

// const AllAlerts = lazy(() =>
//     import('scenes/alert/all_alerts/AllAlerts').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AuditLog = lazy(() =>
//     import('scenes/audit/audit_log/AuditLog').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllDataMaskings = lazy(() =>
//     import('scenes/data_masking/all_data_maskings/AllDataMaskings').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const AllGroups = lazy(() =>
//     import('scenes/group/all_groups/AllGroups').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateGroup = lazy(() =>
//     import('scenes/group/create_group/CreateGroup').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditGroup = lazy(() =>
//     import('scenes/group/edit_group/EditGroup').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const GroupDetails = lazy(() =>
//     import('scenes/group/group_details/GroupDetails').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllOIDCProviders = lazy(() =>
//     import('scenes/oidc_provider/all_oidc_providers/AllOIDCProviders').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const CreateOIDCProvider = lazy(() =>
//     import(
//         'scenes/oidc_provider/create_oidc_provider/CreateOIDCProvider'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditOIDCProvider = lazy(() =>
//     import('scenes/oidc_provider/edit_oidc_provider/EditOIDCProvider').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const OIDCProviderDetails = lazy(() =>
//     import(
//         'scenes/oidc_provider/oidc_provider_details/OIDCProviderDetails'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditServerPermissions = lazy(() =>
//     import(
//         'scenes/server_permissions/edit_server_permissions/EditServerPermissions'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const ServerPermissionsDetails = lazy(() =>
//     import(
//         'scenes/server_permissions/server_permissions_details/ServerPermissionsDetails'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllUsers = lazy(() =>
//     import('scenes/user/all_users/AllUsers').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateUser = lazy(() =>
//     import('scenes/user/create_user/CreateUser').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditUser = lazy(() =>
//     import('scenes/user/edit_user/EditUser').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const UserDetails = lazy(() =>
//     import('scenes/user/user_details/UserDetails').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );

const CommonManagementRoutes = [
    <Route
        key="MANAGEMENT_OIDC_PROVIDERS"
        path="/management/oidc_providers"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'OIDC_PROVIDERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .OIDC_PROVIDER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .DESCRIBE_OIDC_PROVIDERS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <AllOIDCProviders />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_OIDC_PROVIDERS_CREATE"
        path="/management/oidc_providers/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'OIDC_PROVIDERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .OIDC_PROVIDER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .CREATE_OIDC_PROVIDER,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <CreateOIDCProvider />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_OIDC_PROVIDERS_EDIT"
        path="/management/oidc_providers/:OIDCProviderCode/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'OIDC_PROVIDERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .OIDC_PROVIDER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .EDIT_OIDC_PROVIDER,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <EditOIDCProvider />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_OIDC_PROVIDERS_DETAILS"
        path="/management/oidc_providers/:OIDCProviderCode/details"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'OIDC_PROVIDERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .OIDC_PROVIDER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    OIDCProviderPermissions
                                        .OIDC_PROVIDER_PERMISSIONS
                                        .DESCRIBE_OIDC_PROVIDERS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <OIDCProviderDetails />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_GROUPS"
        path="/management/groups"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'GROUPS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .GROUP_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .DESCRIBE_GROUPS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <AllGroups />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_GROUPS_CREATE"
        path="/management/groups/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'GROUPS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .GROUP_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .CREATE_GROUP,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <CreateGroup />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_GROUPS_DETAILS"
        path="/management/groups/:groupCode/details"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'GROUPS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .GROUP_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .DESCRIBE_GROUPS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <GroupDetails />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_GROUPS_EDIT"
        path="/management/groups/:groupCode/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'GROUPS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .GROUP_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    GroupPermissions.GROUP_PERMISSIONS
                                        .EDIT_GROUP,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <EditGroup />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,

    <Route
        key="MANAGEMENT_USERS"
        path="/management/users"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'USERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .USER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .DESCRIBE_USERS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <AllUsers />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_USERS_CREATE"
        path="/management/users/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'USERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .USER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .CREATE_USER,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <CreateUser />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_USERS_DETAILS"
        path="/management/users/:userEmail/details"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'USERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .USER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .DESCRIBE_USERS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <UserDetails />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_USERS_EDIT"
        path="/management/users/:userEmail/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'USERS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS
                                        .USER_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    UserPermissions.USER_PERMISSIONS.EDIT_USER,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <EditUser />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,

    <Route
        key="MANAGEMENT_SERVER_PERMISSIONS"
        path="/management/server_permissions"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'SERVER_PERMISSIONS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    ServerPermissions.SERVER_PERMISSIONS
                                        .SERVER_PERMISSIONS_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    ServerPermissions.SERVER_PERMISSIONS
                                        .DESCRIBE_SERVER_PERMISSIONS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <ServerPermissionsDetails />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_SERVER_PERMISSIONS_EDIT"
        path="/management/server_permissions/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'SERVER_PERMISSIONS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    ServerPermissions.SERVER_PERMISSIONS
                                        .SERVER_PERMISSIONS_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    ServerPermissions.SERVER_PERMISSIONS
                                        .EDIT_SERVER_PERMISSIONS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <EditServerPermissions />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_AUDIT"
        path="/management/audit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'AUDIT',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    AuditPermissions.AUDIT_PERMISSIONS
                                        .AUDIT_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    AuditPermissions.AUDIT_PERMISSIONS
                                        .SEARCH_AUDIT_LOG,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <AuditLog />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_DATA_MASKING"
        path="/management/data_masking"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'DATA_MASKING',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    DataMaskingPermissions
                                        .DATA_MASKING_PERMISSIONS
                                        .DATA_MASKING_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                            {
                                permission:
                                    DataMaskingPermissions
                                        .DATA_MASKING_PERMISSIONS
                                        .DESCRIBE_DATA_MASKINGS,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <AllDataMaskings />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="MANAGEMENT_ALERTS"
        path="/management/alerts"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'MANAGEMENT',
                    type: 'ALERTS',
                }}
            >
                    <WithAuthorization
                        requiredPermissions={[
                            {
                                permission:
                                    AlertPermissions.ALERT_PERMISSIONS
                                        .ALERT_FEATURE_ENABLED,
                                authorizationType: 'MANAGEMENT',
                            },
                        ]}
                        renderForbidden
                    >
                        <AllAlerts />
                    </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
];

export default CommonManagementRoutes;
