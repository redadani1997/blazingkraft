import { AlertPermissions } from './management/AlertPermissions';
import { AuditPermissions } from './management/AuditPermissions';
import { DataMaskingPermissions } from './management/DataMaskingPermissions';
import { FilesPermissions } from './management/FilesPermissions';
import { GroupPermissions } from './management/GroupPermissions';
import { ManagementClusterPermissions } from './management/ManagementClusterPermissions';
import { ManagementKafkaConnectPermissions } from './management/ManagementKafkaConnectPermissions';
import { ManagementKsqlDbPermissions } from './management/ManagementKsqlDbPermissions';
import { ManagementSchemaRegistryPermissions } from './management/ManagementSchemaRegistryPermissions';
import { OIDCProviderPermissions } from './management/OIDCProviderPermissions';
import { ServerPermissions } from './management/ServerPermissions';
import { UserPermissions } from './management/UserPermissions';

const ALL_PERMISSIONS = [
    ...DataMaskingPermissions.DATA_MASKING_PERMISSIONS_LIST,
    ...GroupPermissions.GROUP_PERMISSIONS_LIST,
    ...ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS_LIST,
    ...ManagementKafkaConnectPermissions.MANAGEMENT_KAFKA_CONNECT_PERMISSIONS_LIST,
    ...ManagementSchemaRegistryPermissions.MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS_LIST,
    ...ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS_LIST,
    ...OIDCProviderPermissions.OIDC_PROVIDER_PERMISSIONS_LIST,
    ...ServerPermissions.SERVER_PERMISSIONS_LIST,
    ...UserPermissions.USER_PERMISSIONS_LIST,
    ...AuditPermissions.AUDIT_PERMISSIONS_LIST,
    ...AlertPermissions.ALERT_PERMISSIONS_LIST,
    ...FilesPermissions.FILES_PERMISSIONS_LIST,
] as const;

const ManagementPermissions = {
    ALL_PERMISSIONS,
};

export default ManagementPermissions;
