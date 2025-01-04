import { PermissionLabel } from '..';

const GROUP_PERMISSIONS = {
    GROUP_FEATURE_ENABLED: 'GROUP_FEATURE_ENABLED',
    DESCRIBE_GROUPS: 'DESCRIBE_GROUPS',
    CREATE_GROUP: 'CREATE_GROUP',
    EXPORT_GROUPS: 'EXPORT_GROUPS',
    IMPORT_GROUPS: 'IMPORT_GROUPS',
    EDIT_GROUP: 'EDIT_GROUP',
    DELETE_GROUP: 'DELETE_GROUP',
    DELETE_GROUP_WITH_USERS: 'DELETE_GROUP_WITH_USERS',
} as const;

const GROUP_PERMISSIONS_LIST = [
    GROUP_PERMISSIONS.GROUP_FEATURE_ENABLED,
    GROUP_PERMISSIONS.DESCRIBE_GROUPS,
    GROUP_PERMISSIONS.CREATE_GROUP,
    GROUP_PERMISSIONS.EXPORT_GROUPS,
    GROUP_PERMISSIONS.IMPORT_GROUPS,
    GROUP_PERMISSIONS.EDIT_GROUP,
    GROUP_PERMISSIONS.DELETE_GROUP,
    GROUP_PERMISSIONS.DELETE_GROUP_WITH_USERS,
] as const;

const GROUP_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Groups Feature',
        permission: GROUP_PERMISSIONS.GROUP_FEATURE_ENABLED,
    },
    {
        label: 'Describe Groups',
        permission: GROUP_PERMISSIONS.DESCRIBE_GROUPS,
    },
    {
        label: 'Create Group',
        permission: GROUP_PERMISSIONS.CREATE_GROUP,
    },
    {
        label: 'Export Groups',
        permission: GROUP_PERMISSIONS.EXPORT_GROUPS,
    },
    {
        label: 'Import Groups',
        permission: GROUP_PERMISSIONS.IMPORT_GROUPS,
    },
    {
        label: 'Edit Group',
        permission: GROUP_PERMISSIONS.EDIT_GROUP,
    },
    {
        label: 'Delete Group',
        permission: GROUP_PERMISSIONS.DELETE_GROUP,
    },
    {
        label: 'Delete Group with Users',
        permission: GROUP_PERMISSIONS.DELETE_GROUP_WITH_USERS,
    },
];

const GroupPermissions = {
    GROUP_PERMISSIONS,
    GROUP_PERMISSIONS_LIST,
    GROUP_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { GroupPermissions };
