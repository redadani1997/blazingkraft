import { PermissionLabel } from '..';

const KSQLDB_QUERY_PERMISSIONS = {
    KSQLDB_QUERY_FEATURE_ENABLED: 'KSQLDB_QUERY_FEATURE_ENABLED',
    DESCRIBE_KSQLDB_QUERIES: 'DESCRIBE_KSQLDB_QUERIES',
} as const;

const KSQLDB_QUERY_PERMISSIONS_LIST = [
    KSQLDB_QUERY_PERMISSIONS.KSQLDB_QUERY_FEATURE_ENABLED,
    KSQLDB_QUERY_PERMISSIONS.DESCRIBE_KSQLDB_QUERIES,
] as const;

const KSQLDB_QUERY_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable KsqlDb Query Feature',
        permission: KSQLDB_QUERY_PERMISSIONS.KSQLDB_QUERY_FEATURE_ENABLED,
    },
    {
        label: 'Describe KsqlDb Queries',
        permission: KSQLDB_QUERY_PERMISSIONS.DESCRIBE_KSQLDB_QUERIES,
    },
];

const KsqlDbQueryPermissions = {
    KSQLDB_QUERY_PERMISSIONS,
    KSQLDB_QUERY_PERMISSIONS_LIST,
    KSQLDB_QUERY_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { KsqlDbQueryPermissions };
