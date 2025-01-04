import { PermissionLabel } from '..';

const FILES_PERMISSIONS = {
    CREATE_FILE: 'CREATE_FILE',
    DELETE_FILE: 'DELETE_FILE',
} as const;

const FILES_PERMISSIONS_LIST = [
    FILES_PERMISSIONS.CREATE_FILE,
    FILES_PERMISSIONS.DELETE_FILE,
] as const;

const FILES_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Create File',
        permission: FILES_PERMISSIONS.CREATE_FILE,
    },
    {
        label: 'Delete File',
        permission: FILES_PERMISSIONS.DELETE_FILE,
    },
];

const FilesPermissions = {
    FILES_PERMISSIONS,
    FILES_PERMISSIONS_LIST,
    FILES_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { FilesPermissions };
