import { PermissionLabel } from '..';

const TOPIC_PERMISSIONS = {
    TOPIC_FEATURE_ENABLED: 'TOPIC_FEATURE_ENABLED',
    DESCRIBE_TOPICS: 'DESCRIBE_TOPICS',
    CREATE_TOPIC: 'CREATE_TOPIC',
    DELETE_TOPIC: 'DELETE_TOPIC',
    DELETE_TOPIC_RECORDS: 'DELETE_TOPIC_RECORDS',
    ALTER_TOPIC_CONFIGURATION: 'ALTER_TOPIC_CONFIGURATION',
    INCREASE_TOPIC_PARTITIONS: 'INCREASE_TOPIC_PARTITIONS',
} as const;

const TOPIC_PERMISSIONS_LIST = [
    TOPIC_PERMISSIONS.TOPIC_FEATURE_ENABLED,
    TOPIC_PERMISSIONS.DESCRIBE_TOPICS,
    TOPIC_PERMISSIONS.CREATE_TOPIC,
    TOPIC_PERMISSIONS.DELETE_TOPIC,
    TOPIC_PERMISSIONS.DELETE_TOPIC_RECORDS,
    TOPIC_PERMISSIONS.ALTER_TOPIC_CONFIGURATION,
    TOPIC_PERMISSIONS.INCREASE_TOPIC_PARTITIONS,
] as const;

const TOPIC_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Topic Feature',
        permission: TOPIC_PERMISSIONS.TOPIC_FEATURE_ENABLED,
    },
    {
        label: 'Describe Topics',
        permission: TOPIC_PERMISSIONS.DESCRIBE_TOPICS,
    },
    {
        label: 'Create Topic',
        permission: TOPIC_PERMISSIONS.CREATE_TOPIC,
    },
    {
        label: 'Delete Topic',
        permission: TOPIC_PERMISSIONS.DELETE_TOPIC,
    },
    {
        label: 'Delete Topic Records',
        permission: TOPIC_PERMISSIONS.DELETE_TOPIC_RECORDS,
    },
    {
        label: 'Alter Topic Configuration',
        permission: TOPIC_PERMISSIONS.ALTER_TOPIC_CONFIGURATION,
    },
    {
        label: 'Increase Topic Partitions',
        permission: TOPIC_PERMISSIONS.INCREASE_TOPIC_PARTITIONS,
    },
];

const TopicPermissions = {
    TOPIC_PERMISSIONS,
    TOPIC_PERMISSIONS_LIST,
    TOPIC_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { TopicPermissions };
