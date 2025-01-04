import { PermissionLabel } from '..';

const ACL_PERMISSIONS = {
    ACL_FEATURE_ENABLED: 'ACL_FEATURE_ENABLED',
    DESCRIBE_ACLS: 'DESCRIBE_ACLS',
    DELETE_ACL: 'DELETE_ACL',
    CREATE_ACL: 'CREATE_ACL',
} as const;

const ACL_PERMISSIONS_LIST = [
    ACL_PERMISSIONS.ACL_FEATURE_ENABLED,
    ACL_PERMISSIONS.DESCRIBE_ACLS,
    ACL_PERMISSIONS.DELETE_ACL,
    ACL_PERMISSIONS.CREATE_ACL,
] as const;

const ACL_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable ACL Feature',
        permission: ACL_PERMISSIONS.ACL_FEATURE_ENABLED,
    },
    {
        label: 'Describe ACLs',
        permission: ACL_PERMISSIONS.DESCRIBE_ACLS,
    },
    {
        label: 'Delete ACL',
        permission: ACL_PERMISSIONS.DELETE_ACL,
    },
    {
        label: 'Create ACL',
        permission: ACL_PERMISSIONS.CREATE_ACL,
    },
];

const AclPermissions = {
    ACL_PERMISSIONS,
    ACL_PERMISSIONS_LIST,
    ACL_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { AclPermissions };
