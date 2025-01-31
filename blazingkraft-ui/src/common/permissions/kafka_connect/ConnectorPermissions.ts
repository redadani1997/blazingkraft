import { PermissionLabel } from '..';

const CONNECTOR_PERMISSIONS = {
    CONNECTOR_FEATURE_ENABLED: 'CONNECTOR_FEATURE_ENABLED',
    DESCRIBE_CONNECTORS: 'DESCRIBE_CONNECTORS',
    CREATE_CONNECTOR: 'CREATE_CONNECTOR',
    DESTROY_CONNECTOR: 'DESTROY_CONNECTOR',
    EDIT_CONNECTOR: 'EDIT_CONNECTOR',
    PAUSE_CONNECTOR: 'PAUSE_CONNECTOR',
    RESET_CONNECTOR_TOPICS: 'RESET_CONNECTOR_TOPICS',
    RESTART_CONNECTOR: 'RESTART_CONNECTOR',
    RESUME_CONNECTOR: 'RESUME_CONNECTOR',
    RESTART_TASK: 'RESTART_TASK',
} as const;

const CONNECTOR_PERMISSIONS_LIST = [
    CONNECTOR_PERMISSIONS.CONNECTOR_FEATURE_ENABLED,
    CONNECTOR_PERMISSIONS.DESCRIBE_CONNECTORS,
    CONNECTOR_PERMISSIONS.CREATE_CONNECTOR,
    CONNECTOR_PERMISSIONS.DESTROY_CONNECTOR,
    CONNECTOR_PERMISSIONS.EDIT_CONNECTOR,
    CONNECTOR_PERMISSIONS.PAUSE_CONNECTOR,
    CONNECTOR_PERMISSIONS.RESET_CONNECTOR_TOPICS,
    CONNECTOR_PERMISSIONS.RESTART_CONNECTOR,
    CONNECTOR_PERMISSIONS.RESUME_CONNECTOR,
    CONNECTOR_PERMISSIONS.RESTART_TASK,
] as const;

const CONNECTOR_PERMISSIONS_LABELS_BY_PERMISSION: PermissionLabel[] = [
    {
        label: 'Enable Plugin Feature',
        permission: CONNECTOR_PERMISSIONS.CONNECTOR_FEATURE_ENABLED,
    },
    {
        label: 'Describe Connectors',
        permission: CONNECTOR_PERMISSIONS.DESCRIBE_CONNECTORS,
    },
    {
        label: 'Create Connector',
        permission: CONNECTOR_PERMISSIONS.CREATE_CONNECTOR,
    },
    {
        label: 'Destroy Connector',
        permission: CONNECTOR_PERMISSIONS.DESTROY_CONNECTOR,
    },
    {
        label: 'Edit Connector',
        permission: CONNECTOR_PERMISSIONS.EDIT_CONNECTOR,
    },
    {
        label: 'Pause Connector',
        permission: CONNECTOR_PERMISSIONS.PAUSE_CONNECTOR,
    },
    {
        label: 'Reset Connector Topics',
        permission: CONNECTOR_PERMISSIONS.RESET_CONNECTOR_TOPICS,
    },
    {
        label: 'Restart Connector',
        permission: CONNECTOR_PERMISSIONS.RESTART_CONNECTOR,
    },
    {
        label: 'Resume Connector',
        permission: CONNECTOR_PERMISSIONS.RESUME_CONNECTOR,
    },
    {
        label: 'Restart Task',
        permission: CONNECTOR_PERMISSIONS.RESTART_TASK,
    },
];

const ConnectorPermissions = {
    CONNECTOR_PERMISSIONS,
    CONNECTOR_PERMISSIONS_LIST,
    CONNECTOR_PERMISSIONS_LABELS_BY_PERMISSION,
};

export { ConnectorPermissions };
