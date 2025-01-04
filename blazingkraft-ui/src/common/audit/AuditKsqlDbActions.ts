const AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION = {
    DELETE_KSQLDB_CONNECTOR: 'Delete KsqlDb Connector',
    CREATE_KSQLDB_CONNECTOR: 'Create KsqlDb Connector',
    KSQLDB_EDITOR_EXECUTE_QUERY: 'KsqlDb Editor Execute Query',
    KSQLDB_EDITOR_STREAM_QUERY: 'KsqlDb Editor Stream Query',
    KSQLDB_EDITOR_EXECUTE_STATEMENT: 'KsqlDb Editor Execute Statement',
};

const AUDIT_KSQLDB_ACTIONS_OPTIONS: {
    label: string;
    value: string;
    group: string;
}[] = [
    {
        label: AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION.DELETE_KSQLDB_CONNECTOR,
        value: 'DELETE_KSQLDB_CONNECTOR',
        group: 'KsqlDb',
    },
    {
        label: AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION.CREATE_KSQLDB_CONNECTOR,
        value: 'CREATE_KSQLDB_CONNECTOR',
        group: 'KsqlDb',
    },
    {
        label: AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION.KSQLDB_EDITOR_EXECUTE_QUERY,
        value: 'KSQLDB_EDITOR_EXECUTE_QUERY',
        group: 'KsqlDb',
    },
    {
        label: AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION.KSQLDB_EDITOR_STREAM_QUERY,
        value: 'KSQLDB_EDITOR_STREAM_QUERY',
        group: 'KsqlDb',
    },
    {
        label: AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION.KSQLDB_EDITOR_EXECUTE_STATEMENT,
        value: 'KSQLDB_EDITOR_EXECUTE_STATEMENT',
        group: 'KsqlDb',
    },
];

const AuditKsqlDbActions = {
    AUDIT_KSQLDB_ACTIONS_OPTIONS,
    AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION,
};

export { AuditKsqlDbActions };
