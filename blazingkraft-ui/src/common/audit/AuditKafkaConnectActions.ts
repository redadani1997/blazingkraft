const AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION = {
    CREATE_CONNECTOR: 'Create Connector',
    DESTROY_CONNECTOR: 'Destroy Connector',
    EDIT_CONNECTOR: 'Edit Connector',
    PAUSE_CONNECTOR: 'Pause Connector',
    RESET_CONNECTOR_TOPICS: 'Reset Connector Topics',
    RESTART_CONNECTOR: 'Restart Connector',
    RESUME_CONNECTOR: 'Resume Connector',
    RESTART_TASK: 'Restart Task',
};

const AUDIT_KAFKA_CONNECT_ACTIONS_OPTIONS: {
    label: string;
    value: string;
    group: string;
}[] = [
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.CREATE_CONNECTOR,
        value: 'CREATE_CONNECTOR',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.DESTROY_CONNECTOR,
        value: 'DESTROY_CONNECTOR',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.EDIT_CONNECTOR,
        value: 'EDIT_CONNECTOR',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.PAUSE_CONNECTOR,
        value: 'PAUSE_CONNECTOR',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.RESET_CONNECTOR_TOPICS,
        value: 'RESET_CONNECTOR_TOPICS',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.RESTART_CONNECTOR,
        value: 'RESTART_CONNECTOR',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.RESUME_CONNECTOR,
        value: 'RESUME_CONNECTOR',
        group: 'Kafka Connect',
    },
    {
        label: AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION.RESTART_TASK,
        value: 'RESTART_TASK',
        group: 'Kafka Connect',
    },
];

const AuditKafkaConnectActions = {
    AUDIT_KAFKA_CONNECT_ACTIONS_OPTIONS,
    AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION,
};

export { AuditKafkaConnectActions };
