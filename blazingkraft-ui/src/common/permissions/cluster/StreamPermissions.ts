import { PermissionLabel } from '..';

const STREAM_PERMISSIONS = {
    STREAM_FEATURE_ENABLED: 'STREAM_FEATURE_ENABLED',
    DESCRIBE_STREAMS: 'DESCRIBE_STREAMS',
} as const;

const STREAM_PERMISSIONS_LIST = [
    STREAM_PERMISSIONS.STREAM_FEATURE_ENABLED,
    STREAM_PERMISSIONS.DESCRIBE_STREAMS,
] as const;

const STREAM_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Streams Feature',
        permission: STREAM_PERMISSIONS.STREAM_FEATURE_ENABLED,
    },
    {
        label: 'Describe Streams Topologies',
        permission: STREAM_PERMISSIONS.DESCRIBE_STREAMS,
    },
];

const StreamPermissions = {
    STREAM_PERMISSIONS,
    STREAM_PERMISSIONS_LIST,
    STREAM_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { StreamPermissions };
