import { PermissionLabel } from '..';

const ALERT_PERMISSIONS = {
    ALERT_FEATURE_ENABLED: 'ALERT_FEATURE_ENABLED',
} as const;

const ALERT_PERMISSIONS_LIST = [
    ALERT_PERMISSIONS.ALERT_FEATURE_ENABLED,
] as const;

const ALERT_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Alert Feature',
        permission: ALERT_PERMISSIONS.ALERT_FEATURE_ENABLED,
    },
];

const AlertPermissions = {
    ALERT_PERMISSIONS,
    ALERT_PERMISSIONS_LIST,
    ALERT_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { AlertPermissions };
