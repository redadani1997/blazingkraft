import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { KafkaConnectDashboardPermissions } from 'common/permissions/kafka_connect/KafkaConnectDashboardPermissions';
import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { Route } from 'react-router';
import WithAuthorization from 'scenes/common/authorization/hoc/WithAuthorization';
import AllConnectPlugins from 'scenes/connect_plugin/all_connect_plugins/AllConnectPlugins';
import ConnectPluginDetails from 'scenes/connect_plugin/connect_plugin_details/ConnectPluginDetails';
import AllConnectors from 'scenes/connector/all_connectors/AllConnectors';
import ConnectorDetails from 'scenes/connector/connector_details/ConnectorDetails';
import CreateConnector from 'scenes/connector/create_connector/CreateConnector';
import EditConnector from 'scenes/connector/edit_connector/EditConnector';
import AllKafkaConnects from 'scenes/kafka_connect/all_kafka_connects/AllKafkaConnects';
import CreateKafkaConnect from 'scenes/kafka_connect/create_kafka_connect/CreateKafkaConnect';
import EditKafkaConnect from 'scenes/kafka_connect/edit_kafka_connect/EditKafkaConnect';
import KafkaConnectDashboard from 'scenes/kafka_connect/kafka_connect_dashboard/KafkaConnectDashboard';
import CommonRoutesHoc from '../CommonRoutesHoc';

// const AllConnectPlugins = lazy(() =>
//     import('scenes/connect_plugin/all_connect_plugins/AllConnectPlugins').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const ConnectPluginDetails = lazy(() =>
//     import(
//         'scenes/connect_plugin/connect_plugin_details/ConnectPluginDetails'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllConnectors = lazy(() =>
//     import('scenes/connector/all_connectors/AllConnectors').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const ConnectorDetails = lazy(() =>
//     import('scenes/connector/connector_details/ConnectorDetails').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateConnector = lazy(() =>
//     import('scenes/connector/create_connector/CreateConnector').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditConnector = lazy(() =>
//     import('scenes/connector/edit_connector/EditConnector').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllKafkaConnects = lazy(() =>
//     import('scenes/kafka_connect/all_kafka_connects/AllKafkaConnects').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const CreateKafkaConnect = lazy(() =>
//     import(
//         'scenes/kafka_connect/create_kafka_connect/CreateKafkaConnect'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditKafkaConnect = lazy(() =>
//     import('scenes/kafka_connect/edit_kafka_connect/EditKafkaConnect').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const KafkaConnectDashboard = lazy(() =>
//     import(
//         'scenes/kafka_connect/kafka_connect_dashboard/KafkaConnectDashboard'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );

const CommonKafkaConnectRoutes = [
    <Route
        key="KAFKA_CONNECTS"
        path="/kafka_connects"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_DESCRIBE_KAFKA_CONNECTS,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKafkaConnects />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_CREATE"
        path="/kafka_connects/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_CREATE_KAFKA_CONNECT,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateKafkaConnect />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_EDIT"
        path="/kafka_connects/:kafkaConnectCode/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_EDIT_KAFKA_CONNECT,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <EditKafkaConnect />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_DASHBOARD"
        path="/kafka_connects/:kafkaConnectCode/dashboard"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                KafkaConnectDashboardPermissions
                                    .KAFKA_CONNECT_DASHBOARD_PERMISSIONS
                                    .KAFKA_CONNECT_DASHBOARD_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                KafkaConnectDashboardPermissions
                                    .KAFKA_CONNECT_DASHBOARD_PERMISSIONS
                                    .VIEW_KAFKA_CONNECT_DASHBOARD,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <KafkaConnectDashboard />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_CONNECTORS"
        path="/kafka_connects/:kafkaConnectCode/connectors"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'CONNECTOR',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .CONNECTOR_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .DESCRIBE_CONNECTORS,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <AllConnectors />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_CONNECTORS_CREATE"
        path="/kafka_connects/:kafkaConnectCode/connectors/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'CONNECTOR',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .CONNECTOR_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .CREATE_CONNECTOR,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateConnector />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_CONNECTORS_DETAILS"
        path="/kafka_connects/:kafkaConnectCode/connectors/:connector/details"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'CONNECTOR',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .CONNECTOR_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .DESCRIBE_CONNECTORS,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <ConnectorDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_CONNECTORS_EDIT"
        path="/kafka_connects/:kafkaConnectCode/connectors/:connector/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'CONNECTOR',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .CONNECTOR_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                ConnectorPermissions.CONNECTOR_PERMISSIONS
                                    .EDIT_CONNECTOR,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <EditConnector />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_PLUGINS"
        path="/kafka_connects/:kafkaConnectCode/plugins"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'PLUGIN',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                PluginPermissions.PLUGIN_PERMISSIONS
                                    .PLUGIN_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                PluginPermissions.PLUGIN_PERMISSIONS
                                    .DESCRIBE_PLUGINS,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <AllConnectPlugins />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="KAFKA_CONNECTS_PLUGINS_DETAILS"
        path="/kafka_connects/:kafkaConnectCode/plugins/:pluginName"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'KAFKA_CONNECTS',
                    type: 'PLUGIN',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementKafkaConnectPermissions
                                    .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                                    .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                PluginPermissions.PLUGIN_PERMISSIONS
                                    .PLUGIN_FEATURE_ENABLED,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                        {
                            permission:
                                PluginPermissions.PLUGIN_PERMISSIONS
                                    .DESCRIBE_PLUGINS,
                            authorizationType: 'KAFKA_CONNECT',
                        },
                    ]}
                    renderForbidden
                >
                    <ConnectPluginDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
];

export default CommonKafkaConnectRoutes;
