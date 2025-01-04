import { PermissionLabel } from '..';

const PLUGIN_PERMISSIONS = {
    PLUGIN_FEATURE_ENABLED: 'PLUGIN_FEATURE_ENABLED',
    DESCRIBE_PLUGINS: 'DESCRIBE_PLUGINS',
    VALIDATE_PLUGIN_CONFIG: 'VALIDATE_PLUGIN_CONFIG',
} as const;

const PLUGIN_PERMISSIONS_LIST = [
    PLUGIN_PERMISSIONS.PLUGIN_FEATURE_ENABLED,
    PLUGIN_PERMISSIONS.DESCRIBE_PLUGINS,
    PLUGIN_PERMISSIONS.VALIDATE_PLUGIN_CONFIG,
] as const;

const PLUGIN_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Plugin Feature',
        permission: PLUGIN_PERMISSIONS.PLUGIN_FEATURE_ENABLED,
    },
    {
        label: 'Describe Plugins',
        permission: PLUGIN_PERMISSIONS.DESCRIBE_PLUGINS,
    },
    {
        label: 'Validate Plugin Configuration',
        permission: PLUGIN_PERMISSIONS.VALIDATE_PLUGIN_CONFIG,
    },
];

const PluginPermissions = {
    PLUGIN_PERMISSIONS,
    PLUGIN_PERMISSIONS_LIST,
    PLUGIN_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { PluginPermissions };
