const AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION = {
    CREATE_DATA_MASKING: 'Create Data Masking Rule',
    EXPORT_DATA_MASKINGS: 'Export Data Masking Rules',
    IMPORT_DATA_MASKINGS: 'Import Data Masking Rules',
    EDIT_DATA_MASKING: 'Edit Data Masking Rule',
    DELETE_DATA_MASKING: 'Delete Data Masking Rule',
    CREATE_FILE: 'Create File',
    DELETE_FILE: 'Delete File',
    CREATE_GROUP: 'Create Group',
    EXPORT_GROUPS: 'Export Groups',
    IMPORT_GROUPS: 'Import Groups',
    EDIT_GROUP: 'Edit Group',
    DELETE_GROUP: 'Delete Group',
    DELETE_GROUP_WITH_USERS: 'Delete Group with Users',
    MANAGEMENT_CREATE_CLUSTER: 'Create Cluster',
    MANAGEMENT_EXPORT_CLUSTER: 'Export Cluster',
    MANAGEMENT_IMPORT_CLUSTER: 'Import Cluster',
    MANAGEMENT_EDIT_CLUSTER: 'Edit Cluster',
    MANAGEMENT_DELETE_CLUSTER: 'Delete Cluster',
    MANAGEMENT_CREATE_KAFKA_CONNECT: 'Create Kafka Connect',
    MANAGEMENT_EXPORT_KAFKA_CONNECT: 'Export Kafka Connect',
    MANAGEMENT_IMPORT_KAFKA_CONNECT: 'Import Kafka Connect',
    MANAGEMENT_EDIT_KAFKA_CONNECT: 'Edit Kafka Connect',
    MANAGEMENT_DELETE_KAFKA_CONNECT: 'Delete Kafka Connect',
    MANAGEMENT_CREATE_KSQLDB: 'Create KsqlDb',
    MANAGEMENT_EXPORT_KSQLDB: 'Export KsqlDb',
    MANAGEMENT_IMPORT_KSQLDB: 'Import KsqlDb',
    MANAGEMENT_EDIT_KSQLDB: 'Edit KsqlDb',
    MANAGEMENT_DELETE_KSQLDB: 'Delete KsqlDb',
    MANAGEMENT_CREATE_SCHEMA_REGISTRY: 'Create Schema Registry',
    MANAGEMENT_EXPORT_SCHEMA_REGISTRY: 'Export Schema Registry',
    MANAGEMENT_IMPORT_SCHEMA_REGISTRY: 'Import Schema Registry',
    MANAGEMENT_EDIT_SCHEMA_REGISTRY: 'Edit Schema Registry',
    MANAGEMENT_DELETE_SCHEMA_REGISTRY: 'Delete Schema Registry',
    CREATE_OIDC_PROVIDER: 'Create OpenID Connect Provider',
    EDIT_OIDC_PROVIDER: 'Edit OpenID Connect Provider',
    DELETE_OIDC_PROVIDER: 'Delete OpenID Connect Provider',
    EDIT_SERVER_PERMISSIONS: 'Edit Server Permissions',
    CREATE_USER: 'Create User',
    EXPORT_USERS: 'Export Users',
    IMPORT_USERS: 'Import Users',
    EDIT_USER: 'Edit User',
    EDIT_USER_PASSWORD: 'Edit User Password',
    EDIT_USER_PASSWORD_WITHOUT_CURRENT:
        'Edit User Password Without Verification',
    DELETE_USER: 'Delete User',
};

const AUDIT_MANAGEMENT_ACTIONS_OPTIONS: {
    label: string;
    value: string;
    group: string;
}[] = [
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.CREATE_GROUP,
        value: 'CREATE_GROUP',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EXPORT_GROUPS,
        value: 'MANAGEMENT_EXPORT_GROUPS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.IMPORT_GROUPS,
        value: 'MANAGEMENT_IMPORT_GROUPS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_GROUP,
        value: 'EDIT_GROUP',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.DELETE_GROUP,
        value: 'DELETE_GROUP',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.DELETE_GROUP_WITH_USERS,
        value: 'DELETE_GROUP_WITH_USERS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.CREATE_USER,
        value: 'CREATE_USER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EXPORT_USERS,
        value: 'MANAGEMENT_EXPORT_USERS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.IMPORT_USERS,
        value: 'MANAGEMENT_IMPORT_USERS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_USER,
        value: 'EDIT_USER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.DELETE_USER,
        value: 'DELETE_USER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_USER_PASSWORD,
        value: 'EDIT_USER_PASSWORD',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_USER_PASSWORD_WITHOUT_CURRENT,
        value: 'EDIT_USER_PASSWORD_WITHOUT_CURRENT',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.CREATE_DATA_MASKING,
        value: 'CREATE_DATA_MASKING',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EXPORT_DATA_MASKINGS,
        value: 'MANAGEMENT_EXPORT_DATA_MASKINGS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.IMPORT_DATA_MASKINGS,
        value: 'MANAGEMENT_IMPORT_DATA_MASKINGS',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_DATA_MASKING,
        value: 'EDIT_DATA_MASKING',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.DELETE_DATA_MASKING,
        value: 'DELETE_DATA_MASKING',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.CREATE_FILE,
        value: 'CREATE_FILE',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.DELETE_FILE,
        value: 'DELETE_FILE',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_CREATE_CLUSTER,
        value: 'MANAGEMENT_CREATE_CLUSTER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EXPORT_CLUSTER,
        value: 'MANAGEMENT_EXPORT_CLUSTER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_IMPORT_CLUSTER,
        value: 'MANAGEMENT_IMPORT_CLUSTER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EDIT_CLUSTER,
        value: 'MANAGEMENT_EDIT_CLUSTER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_DELETE_CLUSTER,
        value: 'MANAGEMENT_DELETE_CLUSTER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_CREATE_KAFKA_CONNECT,
        value: 'MANAGEMENT_CREATE_KAFKA_CONNECT',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EXPORT_KAFKA_CONNECT,
        value: 'MANAGEMENT_EXPORT_KAFKA_CONNECT',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_IMPORT_KAFKA_CONNECT,
        value: 'MANAGEMENT_IMPORT_KAFKA_CONNECT',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EDIT_KAFKA_CONNECT,
        value: 'MANAGEMENT_EDIT_KAFKA_CONNECT',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_DELETE_KAFKA_CONNECT,
        value: 'MANAGEMENT_DELETE_KAFKA_CONNECT',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_CREATE_KSQLDB,
        value: 'MANAGEMENT_CREATE_KSQLDB',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EXPORT_KSQLDB,
        value: 'MANAGEMENT_EXPORT_KSQLDB',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_IMPORT_KSQLDB,
        value: 'MANAGEMENT_IMPORT_KSQLDB',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EDIT_KSQLDB,
        value: 'MANAGEMENT_EDIT_KSQLDB',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_DELETE_KSQLDB,
        value: 'MANAGEMENT_DELETE_KSQLDB',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_CREATE_SCHEMA_REGISTRY,
        value: 'MANAGEMENT_CREATE_SCHEMA_REGISTRY',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EXPORT_SCHEMA_REGISTRY,
        value: 'MANAGEMENT_EXPORT_SCHEMA_REGISTRY',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_IMPORT_SCHEMA_REGISTRY,
        value: 'MANAGEMENT_IMPORT_SCHEMA_REGISTRY',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_EDIT_SCHEMA_REGISTRY,
        value: 'MANAGEMENT_EDIT_SCHEMA_REGISTRY',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.MANAGEMENT_DELETE_SCHEMA_REGISTRY,
        value: 'MANAGEMENT_DELETE_SCHEMA_REGISTRY',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.CREATE_OIDC_PROVIDER,
        value: 'CREATE_OIDC_PROVIDER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_OIDC_PROVIDER,
        value: 'EDIT_OIDC_PROVIDER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.DELETE_OIDC_PROVIDER,
        value: 'DELETE_OIDC_PROVIDER',
        group: 'Management',
    },
    {
        label: AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION.EDIT_SERVER_PERMISSIONS,
        value: 'EDIT_SERVER_PERMISSIONS',
        group: 'Management',
    },
];

const AuditManagementActions = {
    AUDIT_MANAGEMENT_ACTIONS_OPTIONS,
    AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION,
};

export { AuditManagementActions };
