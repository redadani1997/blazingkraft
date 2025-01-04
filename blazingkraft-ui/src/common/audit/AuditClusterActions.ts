const AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION = {
    CREATE_ACL: 'Create ACL',
    DELETE_ACL: 'Delete ACL',
    DELETE_CONSUMER_GROUP: 'Delete Consumer Group',
    REMOVE_CONSUMER_GROUP_MEMBER: 'Remove Consumer Group Member',
    CONSUME: 'Record Consumption',
    EDIT_CONSUMER_CONFIGURATION: 'Edit Consumer Configuration',
    CREATE_DELEGATION_TOKEN: 'Create Delegation Token',
    RENEW_DELEGATION_TOKEN: 'Renew Delegation Token',
    EXPIRE_DELEGATION_TOKEN: 'Expire Delegation Token',
    ALTER_CONSUMER_GROUP_OFFSETS: 'Alter Consumer Group Offsets',
    CLEAR_CONSUMER_GROUP_OFFSETS: 'Clear Consumer Group Offsets',
    PRODUCE: 'Record Production',
    EDIT_PRODUCER_CONFIGURATION: 'Edit Producer Configuration',
    ALTER_QUOTA: 'Alter Quota',
    CREATE_TOPIC: 'Create Topic',
    DELETE_TOPIC: 'Delete Topic',
    DELETE_TOPIC_RECORDS: 'Delete Topic Records',
    ALTER_TOPIC_CONFIGURATION: 'Alter Topic Configuration',
    INCREASE_TOPIC_PARTITIONS: 'Increase Topic Partitions',
};

const AUDIT_CLUSTER_ACTIONS_OPTIONS: {
    label: string;
    value: string;
    group: string;
}[] = [
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.CREATE_ACL,
        value: 'CREATE_ACL',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.DELETE_ACL,
        value: 'DELETE_ACL',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.DELETE_CONSUMER_GROUP,
        value: 'DELETE_CONSUMER_GROUP',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.REMOVE_CONSUMER_GROUP_MEMBER,
        value: 'REMOVE_CONSUMER_GROUP_MEMBER',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.CONSUME,
        value: 'CONSUME',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.EDIT_CONSUMER_CONFIGURATION,
        value: 'EDIT_CONSUMER_CONFIGURATION',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.CREATE_DELEGATION_TOKEN,
        value: 'CREATE_DELEGATION_TOKEN',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.EXPIRE_DELEGATION_TOKEN,
        value: 'EXPIRE_DELEGATION_TOKEN',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.RENEW_DELEGATION_TOKEN,
        value: 'RENEW_DELEGATION_TOKEN',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.ALTER_CONSUMER_GROUP_OFFSETS,
        value: 'ALTER_CONSUMER_GROUP_OFFSETS',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.CLEAR_CONSUMER_GROUP_OFFSETS,
        value: 'CLEAR_CONSUMER_GROUP_OFFSETS',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.PRODUCE,
        value: 'PRODUCE',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.EDIT_PRODUCER_CONFIGURATION,
        value: 'EDIT_PRODUCER_CONFIGURATION',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.ALTER_QUOTA,
        value: 'ALTER_QUOTA',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.CREATE_TOPIC,
        value: 'CREATE_TOPIC',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.DELETE_TOPIC,
        value: 'DELETE_TOPIC',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.DELETE_TOPIC_RECORDS,
        value: 'DELETE_TOPIC_RECORDS',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.ALTER_TOPIC_CONFIGURATION,
        value: 'ALTER_TOPIC_CONFIGURATION',
        group: 'Cluster',
    },
    {
        label: AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION.INCREASE_TOPIC_PARTITIONS,
        value: 'INCREASE_TOPIC_PARTITIONS',
        group: 'Cluster',
    },
];

const AuditClusterActions = {
    AUDIT_CLUSTER_ACTIONS_OPTIONS,
    AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION,
};

export { AuditClusterActions };
