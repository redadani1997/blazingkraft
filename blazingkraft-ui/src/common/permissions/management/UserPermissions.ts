import { PermissionLabel } from '..';

const USER_PERMISSIONS = {
    USER_FEATURE_ENABLED: 'USER_FEATURE_ENABLED',
    DESCRIBE_USERS: 'DESCRIBE_USERS',
    CREATE_USER: 'CREATE_USER',
    EXPORT_USERS: 'EXPORT_USERS',
    IMPORT_USERS: 'IMPORT_USERS',
    EDIT_USER: 'EDIT_USER',
    EDIT_USER_PASSWORD: 'EDIT_USER_PASSWORD',
    EDIT_USER_PASSWORD_WITHOUT_CURRENT: 'EDIT_USER_PASSWORD_WITHOUT_CURRENT',
    DELETE_USER: 'DELETE_USER',
} as const;

const USER_PERMISSIONS_LIST = [
    USER_PERMISSIONS.USER_FEATURE_ENABLED,
    USER_PERMISSIONS.DESCRIBE_USERS,
    USER_PERMISSIONS.CREATE_USER,
    USER_PERMISSIONS.EXPORT_USERS,
    USER_PERMISSIONS.IMPORT_USERS,
    USER_PERMISSIONS.EDIT_USER,
    USER_PERMISSIONS.EDIT_USER_PASSWORD,
    USER_PERMISSIONS.EDIT_USER_PASSWORD_WITHOUT_CURRENT,
    USER_PERMISSIONS.DELETE_USER,
] as const;

const USER_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Users Feature',
        permission: USER_PERMISSIONS.USER_FEATURE_ENABLED,
    },
    {
        label: 'Describe Users',
        permission: USER_PERMISSIONS.DESCRIBE_USERS,
    },
    {
        label: 'Create User',
        permission: USER_PERMISSIONS.CREATE_USER,
    },
    {
        label: 'Export Users',
        permission: USER_PERMISSIONS.EXPORT_USERS,
    },
    {
        label: 'Import Users',
        permission: USER_PERMISSIONS.IMPORT_USERS,
    },
    {
        label: 'Edit User',
        permission: USER_PERMISSIONS.EDIT_USER,
    },
    {
        label: 'Edit User Password',
        permission: USER_PERMISSIONS.EDIT_USER_PASSWORD,
    },
    {
        label: 'Edit User Password Without Verification',
        permission: USER_PERMISSIONS.EDIT_USER_PASSWORD_WITHOUT_CURRENT,
    },
    {
        label: 'Delete User',
        permission: USER_PERMISSIONS.DELETE_USER,
    },
];

const UserPermissions = {
    USER_PERMISSIONS,
    USER_PERMISSIONS_LIST,
    USER_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { UserPermissions };
