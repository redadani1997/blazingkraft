import { PermissionLabel } from '..';

const QUOTA_PERMISSIONS = {
    QUOTA_FEATURE_ENABLED: 'QUOTA_FEATURE_ENABLED',
    DESCRIBE_QUOTAS: 'DESCRIBE_QUOTAS',
    ALTER_QUOTA: 'ALTER_QUOTA',
} as const;

const QUOTA_PERMISSIONS_LIST = [
    QUOTA_PERMISSIONS.QUOTA_FEATURE_ENABLED,
    QUOTA_PERMISSIONS.DESCRIBE_QUOTAS,
    QUOTA_PERMISSIONS.ALTER_QUOTA,
] as const;

const QUOTA_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Quota Feature',
        permission: QUOTA_PERMISSIONS.QUOTA_FEATURE_ENABLED,
    },
    {
        label: 'Describe Quotas',
        permission: QUOTA_PERMISSIONS.DESCRIBE_QUOTAS,
    },
    {
        label: 'Alter Quota',
        permission: QUOTA_PERMISSIONS.ALTER_QUOTA,
    },
];

const QuotaPermissions = {
    QUOTA_PERMISSIONS,
    QUOTA_PERMISSIONS_LIST,
    QUOTA_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { QuotaPermissions };
