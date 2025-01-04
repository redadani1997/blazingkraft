import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { KsqlDbDashboardPermissions } from 'common/permissions/ksqldb/KsqlDbDashboardPermissions';
import { KsqlDbEditorPermissions } from 'common/permissions/ksqldb/KsqlDbEditorPermissions';
import { KsqlDbQueryPermissions } from 'common/permissions/ksqldb/KsqlDbQueryPermissions';
import { KsqlDbStreamPermissions } from 'common/permissions/ksqldb/KsqlDbStreamPermissions';
import { KsqlDbTablePermissions } from 'common/permissions/ksqldb/KsqlDbTablePermissions';
import { KsqlDbTopicPermissions } from 'common/permissions/ksqldb/KsqlDbTopicPermissions';
import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import { Route } from 'react-router';
import WithAuthorization from 'scenes/common/authorization/hoc/WithAuthorization';
import AllKsqlDbs from 'scenes/ksqldb/all_ksqldbs/AllKsqlDbs';
import CreateKsqlDb from 'scenes/ksqldb/create_ksqldb/CreateKsqlDb';
import EditKsqlDb from 'scenes/ksqldb/edit_ksqldb/EditKsqlDb';
import KsqlDbDashboard from 'scenes/ksqldb/ksqldb_dashboard/KsqlDbDashboard';
import AllKsqlDbConnectors from 'scenes/ksqldb_ecosystem/all_ksqldb_connectors/AllKsqlDbConnectors';
import AllKsqlDbQueries from 'scenes/ksqldb_ecosystem/all_ksqldb_queries/AllKsqlDbQueries';
import AllKsqlDbStreams from 'scenes/ksqldb_ecosystem/all_ksqldb_streams/AllKsqlDbStreams';
import AllKsqlDbTables from 'scenes/ksqldb_ecosystem/all_ksqldb_tables/AllKsqlDbTables';
import AllKsqlDbTopics from 'scenes/ksqldb_ecosystem/all_ksqldb_topics/AllKsqlDbTopics';
import KsqlDbEditor from 'scenes/ksqldb_ecosystem/ksqldb_editor/KsqlDbEditor';
import CommonRoutesHoc from '../CommonRoutesHoc';

// const AllKsqlDbs = lazy(() =>
//     import('scenes/ksqldb/all_ksqldbs/AllKsqlDbs').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateKsqlDb = lazy(() =>
//     import('scenes/ksqldb/create_ksqldb/CreateKsqlDb').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditKsqlDb = lazy(() =>
//     import('scenes/ksqldb/edit_ksqldb/EditKsqlDb').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const KsqlDbDashboard = lazy(() =>
//     import('scenes/ksqldb/ksqldb_dashboard/KsqlDbDashboard').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllKsqlDbConnectors = lazy(() =>
//     import(
//         'scenes/ksqldb_ecosystem/all_ksqldb_connectors/AllKsqlDbConnectors'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllKsqlDbQueries = lazy(() =>
//     import('scenes/ksqldb_ecosystem/all_ksqldb_queries/AllKsqlDbQueries').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const AllKsqlDbStreams = lazy(() =>
//     import('scenes/ksqldb_ecosystem/all_ksqldb_streams/AllKsqlDbStreams').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const AllKsqlDbTables = lazy(() =>
//     import('scenes/ksqldb_ecosystem/all_ksqldb_tables/AllKsqlDbTables').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const AllKsqlDbTopics = lazy(() =>
//     import('scenes/ksqldb_ecosystem/all_ksqldb_topics/AllKsqlDbTopics').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const KsqlDbEditor = lazy(() =>
//     import('scenes/ksqldb_ecosystem/ksqldb_editor/KsqlDbEditor').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );

const CommonKsqlDbRoutes = [
    <Route
        key="KSQLDBS"
        path="/ksqldbs"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_DESCRIBE_KSQLDBS,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKsqlDbs />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_CREATE"
        path="/ksqldbs/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_CREATE_KSQLDB,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateKsqlDb />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_EDIT"
        path="/ksqldbs/:ksqlDbCode/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_EDIT_KSQLDB,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <EditKsqlDb />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_DASHBOARD"
        path="/ksqldbs/:ksqlDbCode/dashboard"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_DESCRIBE_KSQLDBS,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbDashboardPermissions
                                    .KSQLDB_DASHBOARD_PERMISSIONS
                                    .KSQLDB_DASHBOARD_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbDashboardPermissions
                                    .KSQLDB_DASHBOARD_PERMISSIONS
                                    .VIEW_KSQLDB_DASHBOARD,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <KsqlDbDashboard />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_CONNECTORS"
        path="/ksqldbs/:ksqlDbCode/connectors"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'CONNECTOR',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbConnectorPermissions
                                    .KSQLDB_CONNECTOR_PERMISSIONS
                                    .KSQLDB_CONNECTOR_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbConnectorPermissions
                                    .KSQLDB_CONNECTOR_PERMISSIONS
                                    .DESCRIBE_KSQLDB_CONNECTORS,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKsqlDbConnectors />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_TABLES"
        path="/ksqldbs/:ksqlDbCode/tables"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'TABLE',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbTablePermissions.KSQLDB_TABLE_PERMISSIONS
                                    .KSQLDB_TABLE_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbTablePermissions.KSQLDB_TABLE_PERMISSIONS
                                    .DESCRIBE_KSQLDB_TABLES,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKsqlDbTables />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_STREAMS"
        path="/ksqldbs/:ksqlDbCode/streams"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'STREAM',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbStreamPermissions
                                    .KSQLDB_STREAM_PERMISSIONS
                                    .KSQLDB_STREAM_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbStreamPermissions
                                    .KSQLDB_STREAM_PERMISSIONS
                                    .DESCRIBE_KSQLDB_STREAMS,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKsqlDbStreams />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_TOPICS"
        path="/ksqldbs/:ksqlDbCode/topics"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'TOPIC',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbTopicPermissions.KSQLDB_TOPIC_PERMISSIONS
                                    .KSQLDB_TOPIC_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbTopicPermissions.KSQLDB_TOPIC_PERMISSIONS
                                    .DESCRIBE_KSQLDB_TOPICS,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKsqlDbTopics />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_QUERIES"
        path="/ksqldbs/:ksqlDbCode/queries"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'QUERY',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbQueryPermissions.KSQLDB_QUERY_PERMISSIONS
                                    .KSQLDB_QUERY_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbQueryPermissions.KSQLDB_QUERY_PERMISSIONS
                                    .DESCRIBE_KSQLDB_QUERIES,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKsqlDbQueries />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KSQLDBS_EDITOR"
        path="/ksqldbs/:ksqlDbCode/editor"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KSQLDBS',
                    type: 'EDITOR',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKsqlDbPermissions
                                    .MANAGEMENT_KSQLDB_PERMISSIONS
                                    .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KsqlDbEditorPermissions
                                    .KSQLDB_EDITOR_PERMISSIONS
                                    .KSQLDB_EDITOR_FEATURE_ENABLED,
                            authorizationType: 'KSQLDB',
                        },
                        {
                            permission:
                                KsqlDbEditorPermissions
                                    .KSQLDB_EDITOR_PERMISSIONS
                                    .KSQLDB_EDITOR_EXECUTE_QUERY,
                            authorizationType: 'KSQLDB',
                        },
                    ]}
                    renderForbidden
                >
                    <KsqlDbEditor />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
];

export default CommonKsqlDbRoutes;
