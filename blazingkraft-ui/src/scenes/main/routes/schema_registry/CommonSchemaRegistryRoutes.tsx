import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import { SchemaRegistryDashboardPermissions } from 'common/permissions/schema_registry/SchemaRegistryDashboardPermissions';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { Navigate, Route } from 'react-router';
import WithAuthorization from 'scenes/common/authorization/hoc/WithAuthorization';
import CreateSchemaRegistry from 'scenes/schema_registry/create_schema_registry/CreateSchemaRegistry';
import CreateSubject from 'scenes/schema_registry/create_subject/CreateSubject';
import CreateSubjectVersion from 'scenes/schema_registry/create_subject_version/CreateSubjectVersion';
import EditSchemaRegistry from 'scenes/schema_registry/edit_schema_registry/EditSchemaRegistry';
import SchemaRegistries from 'scenes/schema_registry/schema_registries/SchemaRegistries';
import SchemaRegistryDashboard from 'scenes/schema_registry/schema_registry_dashboard/SchemaRegistryDashboard';
import SubjectDetails from 'scenes/schema_registry/subject_details/SubjectDetails';
import Subjects from 'scenes/schema_registry/subjects/Subjects';
import CommonRoutesHoc from '../CommonRoutesHoc';

// const CreateSchemaRegistry = lazy(() =>
//     import(
//         'scenes/schema_registry/create_schema_registry/CreateSchemaRegistry'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateSubject = lazy(() =>
//     import('scenes/schema_registry/create_subject/CreateSubject').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateSubjectVersion = lazy(() =>
//     import(
//         'scenes/schema_registry/create_subject_version/CreateSubjectVersion'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditSchemaRegistry = lazy(() =>
//     import(
//         'scenes/schema_registry/edit_schema_registry/EditSchemaRegistry'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const SchemaRegistries = lazy(() =>
//     import('scenes/schema_registry/schema_registries/SchemaRegistries').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const SchemaRegistryDashboard = lazy(() =>
//     import(
//         'scenes/schema_registry/schema_registry_dashboard/SchemaRegistryDashboard'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const SubjectDetails = lazy(() =>
//     import('scenes/schema_registry/subject_details/SubjectDetails').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const Subjects = lazy(() =>
//     import('scenes/schema_registry/subjects/Subjects').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );

const CommonSchemaRegistryRoutes = [
    <Route
        key="SCHEMA_REGISTRIES"
        path="/schema_registries"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_DESCRIBE_SCHEMA_REGISTRIES,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <SchemaRegistries />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_CREATE"
        path="/schema_registries/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_CREATE_SCHEMA_REGISTRY,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateSchemaRegistry />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_DASHBOARD"
        path="/schema_registries/:schemaRegistryCode/dashboard"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                SchemaRegistryDashboardPermissions
                                    .SCHEMA_REGISTRY_DASHBOARD_PERMISSIONS
                                    .SCHEMA_REGISTRY_DASHBOARD_FEATURE_ENABLED,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                        {
                            permission:
                                SchemaRegistryDashboardPermissions
                                    .SCHEMA_REGISTRY_DASHBOARD_PERMISSIONS
                                    .VIEW_SCHEMA_REGISTRY_DASHBOARD,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                    ]}
                    renderForbidden
                >
                    <SchemaRegistryDashboard />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_EDIT"
        path="/schema_registries/:schemaRegistryCode/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_EDIT_SCHEMA_REGISTRY,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <EditSchemaRegistry />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_SUBJECTS"
        path="/schema_registries/:schemaRegistryCode/subjects"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                    type: 'SUBJECT',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .SUBJECT_FEATURE_ENABLED,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .DESCRIBE_SUBJECTS,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                    ]}
                    renderForbidden
                >
                    <Subjects />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_SUBJECTS_CREATE"
        path="/schema_registries/:schemaRegistryCode/subjects/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                    type: 'SUBJECT',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .SUBJECT_FEATURE_ENABLED,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .CREATE_SUBJECT,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateSubject />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_SUBJECTS_VERSIONS_REDIRECT"
        path="/schema_registries/:schemaRegistryCode/subjects/:subject"
        element={<Navigate to={'versions'} replace />}
    />,
    <Route
        key="SCHEMA_REGISTRIES_SUBJECTS_VERSIONS"
        path="/schema_registries/:schemaRegistryCode/subjects/:subject/versions"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                    type: 'SUBJECT',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .SUBJECT_FEATURE_ENABLED,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .DESCRIBE_SUBJECTS,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                    ]}
                    renderForbidden
                >
                    <SubjectDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="SCHEMA_REGISTRIES_SUBJECTS_CREATE_VERSION"
        path="/schema_registries/:schemaRegistryCode/subjects/:subject/versions/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'SCHEMA_REGISTRIES',
                    type: 'SUBJECT',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementSchemaRegistryPermissions
                                    .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                                    .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .SUBJECT_FEATURE_ENABLED,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                        {
                            permission:
                                SubjectPermissions.SUBJECT_PERMISSIONS
                                    .CREATE_SUBJECT_VERSION,
                            authorizationType: 'SCHEMA_REGISTRY',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateSubjectVersion />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
];

export default CommonSchemaRegistryRoutes;
