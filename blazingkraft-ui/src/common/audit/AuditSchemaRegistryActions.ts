const AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION = {
    UPDATE_SCHEMA_REGISTRY_COMPATIBILITY:
        'Update Schema Registry Compatibility',
    UPDATE_SCHEMA_REGISTRY_MODE: 'Update Schema Registry Mode',
    CREATE_SUBJECT: 'Create Subject',
    CREATE_SUBJECT_VERSION: 'Create Subject Version',
    DELETE_SUBJECT: 'Delete Subject',
    DELETE_SUBJECT_VERSION: 'Delete Subject Version',
    UPDATE_SUBJECT_COMPATIBILITY: 'Update Subject Compatibility',
    UPDATE_SUBJECT_MODE: 'Update Subject Mode',
};

const AUDIT_SCHEMA_REGISTRY_ACTIONS_OPTIONS: {
    label: string;
    value: string;
    group: string;
}[] = [
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY,
        value: 'UPDATE_SCHEMA_REGISTRY_COMPATIBILITY',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.UPDATE_SCHEMA_REGISTRY_MODE,
        value: 'UPDATE_SCHEMA_REGISTRY_MODE',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.CREATE_SUBJECT,
        value: 'CREATE_SUBJECT',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.CREATE_SUBJECT_VERSION,
        value: 'CREATE_SUBJECT_VERSION',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.DELETE_SUBJECT,
        value: 'DELETE_SUBJECT',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.DELETE_SUBJECT_VERSION,
        value: 'DELETE_SUBJECT_VERSION',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.UPDATE_SUBJECT_COMPATIBILITY,
        value: 'UPDATE_SUBJECT_COMPATIBILITY',
        group: 'Schema Registry',
    },
    {
        label: AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION.UPDATE_SUBJECT_MODE,
        value: 'UPDATE_SUBJECT_MODE',
        group: 'Schema Registry',
    },
];

const AuditSchemaRegistryActions = {
    AUDIT_SCHEMA_REGISTRY_ACTIONS_OPTIONS,
    AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION,
};

export { AuditSchemaRegistryActions };
