import { PermissionLabel } from '..';

const KSQLDB_DASHBOARD_PERMISSIONS = {
    KSQLDB_DASHBOARD_FEATURE_ENABLED: 'KSQLDB_DASHBOARD_FEATURE_ENABLED',
    VIEW_KSQLDB_DASHBOARD: 'VIEW_KSQLDB_DASHBOARD',
} as const;

const KSQLDB_DASHBOARD_PERMISSIONS_LIST = [
    KSQLDB_DASHBOARD_PERMISSIONS.KSQLDB_DASHBOARD_FEATURE_ENABLED,
    KSQLDB_DASHBOARD_PERMISSIONS.VIEW_KSQLDB_DASHBOARD,
] as const;

const KSQLDB_DASHBOARD_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable KsqlDb Dashboard Feature',
        permission:
            KSQLDB_DASHBOARD_PERMISSIONS.KSQLDB_DASHBOARD_FEATURE_ENABLED,
    },
    {
        label: 'View Dashboard',
        permission: KSQLDB_DASHBOARD_PERMISSIONS.VIEW_KSQLDB_DASHBOARD,
    },
];

const KsqlDbDashboardPermissions = {
    KSQLDB_DASHBOARD_PERMISSIONS,
    KSQLDB_DASHBOARD_PERMISSIONS_LIST,
    KSQLDB_DASHBOARD_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { KsqlDbDashboardPermissions };
