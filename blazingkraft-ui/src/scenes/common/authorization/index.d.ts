import ClusterPermissions from 'common/permissions/ClusterPermissions';
import KafkaConnectPermissions from 'common/permissions/KafkaConnectPermissions';
import KsqlDbPermissions from 'common/permissions/KsqlDbPermissions';
import ManagementPermissions from 'common/permissions/ManagementPermissions';
import PlaygroundPermissions from 'common/permissions/PlaygroundPermissions';
import SchemaRegistryPermissions from 'common/permissions/SchemaRegistryPermissions';

type Permission =
    | (typeof ClusterPermissions.ALL_PERMISSIONS)[number]
    | (typeof KafkaConnectPermissions.ALL_PERMISSIONS)[number]
    | (typeof SchemaRegistryPermissions.ALL_PERMISSIONS)[number]
    | (typeof ManagementPermissions.ALL_PERMISSIONS)[number]
    | (typeof KsqlDbPermissions.ALL_PERMISSIONS)[number]
    | (typeof PlaygroundPermissions.ALL_PERMISSIONS)[number];

type AuthorizationType =
    | 'CLUSTER'
    | 'KAFKA_CONNECT'
    | 'SCHEMA_REGISTRY'
    | 'KSQLDB'
    | 'MANAGEMENT'
    | 'PLAYGROUND';

interface ClusterRequiredPermission {
    permission: (typeof ClusterPermissions.ALL_PERMISSIONS)[number];
    authorizationType: 'CLUSTER';
}

interface KafkaConnectRequiredPermission {
    permission: (typeof KafkaConnectPermissions.ALL_PERMISSIONS)[number];
    authorizationType: 'KAFKA_CONNECT';
}

interface SchemaRegistryRequiredPermission {
    permission: (typeof SchemaRegistryPermissions.ALL_PERMISSIONS)[number];
    authorizationType: 'SCHEMA_REGISTRY';
}

interface KsqlDbRequiredPermission {
    permission: (typeof KsqlDbPermissions.ALL_PERMISSIONS)[number];
    authorizationType: 'KSQLDB';
}

interface ManagementRequiredPermission {
    permission: (typeof ManagementPermissions.ALL_PERMISSIONS)[number];
    authorizationType: 'MANAGEMENT';
}

interface PlaygroundRequiredPermission {
    permission: (typeof PlaygroundPermissions.ALL_PERMISSIONS)[number];
    authorizationType: 'PLAYGROUND';
}

export type RequiredPermission =
    | ClusterRequiredPermission
    | KafkaConnectRequiredPermission
    | SchemaRegistryRequiredPermission
    | ManagementRequiredPermission
    | KsqlDbRequiredPermission
    | PlaygroundRequiredPermission;
