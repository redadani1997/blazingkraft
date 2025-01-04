import { PermissionLabel } from '..';

const KSQLDB_TABLE_PERMISSIONS = {
    KSQLDB_TABLE_FEATURE_ENABLED: 'KSQLDB_TABLE_FEATURE_ENABLED',
    DESCRIBE_KSQLDB_TABLES: 'DESCRIBE_KSQLDB_TABLES',
} as const;

const KSQLDB_TABLE_PERMISSIONS_LIST = [
    KSQLDB_TABLE_PERMISSIONS.KSQLDB_TABLE_FEATURE_ENABLED,
    KSQLDB_TABLE_PERMISSIONS.DESCRIBE_KSQLDB_TABLES,
] as const;

const KSQLDB_TABLE_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable KsqlDb Table Feature',
        permission: KSQLDB_TABLE_PERMISSIONS.KSQLDB_TABLE_FEATURE_ENABLED,
    },
    {
        label: 'Describe KsqlDb Tables',
        permission: KSQLDB_TABLE_PERMISSIONS.DESCRIBE_KSQLDB_TABLES,
    },
];

const KsqlDbTablePermissions = {
    KSQLDB_TABLE_PERMISSIONS,
    KSQLDB_TABLE_PERMISSIONS_LIST,
    KSQLDB_TABLE_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { KsqlDbTablePermissions };
