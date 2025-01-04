import { ConnectorPermissions } from './kafka_connect/ConnectorPermissions';
import { KafkaConnectDashboardPermissions } from './kafka_connect/KafkaConnectDashboardPermissions';
import { PluginPermissions } from './kafka_connect/PluginPermissions';

const ALL_PERMISSIONS = [
    ...KafkaConnectDashboardPermissions.KAFKA_CONNECT_DASHBOARD_PERMISSIONS_LIST,
    ...PluginPermissions.PLUGIN_PERMISSIONS_LIST,
    ...ConnectorPermissions.CONNECTOR_PERMISSIONS_LIST,
] as const;

const KafkaConnectPermissions = {
    ALL_PERMISSIONS,
};

export default KafkaConnectPermissions;
