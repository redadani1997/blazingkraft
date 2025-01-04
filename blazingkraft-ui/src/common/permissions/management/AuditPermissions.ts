import { PermissionLabel } from '..';

const AUDIT_PERMISSIONS = {
    AUDIT_FEATURE_ENABLED: 'AUDIT_FEATURE_ENABLED',
    SEARCH_AUDIT_LOG: 'SEARCH_AUDIT_LOG',
} as const;

const AUDIT_PERMISSIONS_LIST = [
    AUDIT_PERMISSIONS.AUDIT_FEATURE_ENABLED,
    AUDIT_PERMISSIONS.SEARCH_AUDIT_LOG,
] as const;

const AUDIT_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Audit Feature',
        permission: AUDIT_PERMISSIONS.AUDIT_FEATURE_ENABLED,
    },
    {
        label: 'Search Audit Log',
        permission: AUDIT_PERMISSIONS.SEARCH_AUDIT_LOG,
    },
];

const AuditPermissions = {
    AUDIT_PERMISSIONS,
    AUDIT_PERMISSIONS_LIST,
    AUDIT_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { AuditPermissions };
