import {
    AclOperation,
    AclPatternType,
    AclPermissionType,
    AclResourceType,
} from 'common/types/acl_binding';

const ALL_OPERATIONS_OPTIONS: { label: AclOperation; value: AclOperation }[] = [
    { label: 'UNKNOWN', value: 'UNKNOWN' },
    { label: 'ANY', value: 'ANY' },
    { label: 'ALL', value: 'ALL' },
    { label: 'READ', value: 'READ' },
    { label: 'WRITE', value: 'WRITE' },
    { label: 'CREATE', value: 'CREATE' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'ALTER', value: 'ALTER' },
    { label: 'DESCRIBE', value: 'DESCRIBE' },
    { label: 'CLUSTER_ACTION', value: 'CLUSTER_ACTION' },
    { label: 'DESCRIBE_CONFIGS', value: 'DESCRIBE_CONFIGS' },
    { label: 'ALTER_CONFIGS', value: 'ALTER_CONFIGS' },
    { label: 'IDEMPOTENT_WRITE', value: 'IDEMPOTENT_WRITE' },
    { label: 'CREATE_TOKENS', value: 'CREATE_TOKENS' },
    { label: 'DESCRIBE_TOKENS', value: 'DESCRIBE_TOKENS' },
];

const CLUSTER_OPERATIONS_OPTIONS: { label: string; value: AclOperation }[] = [
    { label: 'ALTER', value: 'ALTER' },
    { label: 'ALTER_CONFIGS', value: 'ALTER_CONFIGS' },
    { label: 'CLUSTER_ACTION', value: 'CLUSTER_ACTION' },
    { label: 'CREATE', value: 'CREATE' },
    { label: 'DESCRIBE', value: 'DESCRIBE' },
    { label: 'DESCRIBE_CONFIGS', value: 'DESCRIBE_CONFIGS' },
];

const DELEGATION_TOKEN_OPERATIONS_OPTIONS: {
    label: string;
    value: AclOperation;
}[] = [{ label: 'DESCRIBE', value: 'DESCRIBE' }];

const GROUP_OPERATIONS_OPTIONS: { label: string; value: AclOperation }[] = [
    { label: 'READ', value: 'READ' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'DESCRIBE', value: 'DESCRIBE' },
];

const TRANSACTIONAL_ID_OPERATIONS_OPTIONS: {
    label: string;
    value: AclOperation;
}[] = [
    { label: 'WRITE', value: 'WRITE' },
    { label: 'DESCRIBE', value: 'DESCRIBE' },
];

const TOPIC_OPERATIONS_OPTIONS: { label: string; value: AclOperation }[] = [
    { label: 'ALTER', value: 'ALTER' },
    { label: 'ALTER_CONFIGS', value: 'ALTER_CONFIGS' },
    { label: 'CREATE', value: 'CREATE' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'DESCRIBE', value: 'DESCRIBE' },
    { label: 'DESCRIBE_CONFIGS', value: 'DESCRIBE_CONFIGS' },
    { label: 'READ', value: 'READ' },
    { label: 'WRITE', value: 'WRITE' },
];

const ALL_PATTERN_TYPES_OPTIONS: { label: string; value: AclPatternType }[] = [
    { label: 'UNKNOWN', value: 'UNKNOWN' },
    { label: 'MATCH', value: 'MATCH' },
    { label: 'LITERAL', value: 'LITERAL' },
    { label: 'PREFIXED', value: 'PREFIXED' },
    { label: 'ANY', value: 'ANY' },
];

const ALL_RESOURCE_TYPES_OPTIONS: {
    label: AclResourceType;
    value: AclResourceType;
}[] = [
    { label: 'UNKNOWN', value: 'UNKNOWN' },
    { label: 'ANY', value: 'ANY' },
    { label: 'TOPIC', value: 'TOPIC' },
    { label: 'GROUP', value: 'GROUP' },
    { label: 'CLUSTER', value: 'CLUSTER' },
    { label: 'TRANSACTIONAL_ID', value: 'TRANSACTIONAL_ID' },
    { label: 'DELEGATION_TOKEN', value: 'DELEGATION_TOKEN' },
    { label: 'USER', value: 'USER' },
];

function getOperationsOptionsByResourceType(
    resourceType: AclResourceType | string,
): { label: string; value: AclOperation }[] {
    if (resourceType === 'CLUSTER') {
        return CLUSTER_OPERATIONS_OPTIONS;
    }
    if (resourceType === 'GROUP') {
        return GROUP_OPERATIONS_OPTIONS;
    }
    if (resourceType === 'TRANSACTIONAL_ID') {
        return TRANSACTIONAL_ID_OPERATIONS_OPTIONS;
    }
    if (resourceType === 'TOPIC') {
        return TOPIC_OPERATIONS_OPTIONS;
    }
    if (resourceType === 'DELEGATION_TOKEN') {
        return DELEGATION_TOKEN_OPERATIONS_OPTIONS;
    }

    return ALL_OPERATIONS_OPTIONS;
}

const ALL_PERMISSION_TYPES_OPTIONS: {
    label: AclPermissionType;
    value: AclPermissionType;
}[] = [
    { label: 'UNKNOWN', value: 'UNKNOWN' },
    { label: 'ANY', value: 'ANY' },
    { label: 'DENY', value: 'DENY' },
    { label: 'ALLOW', value: 'ALLOW' },
];

const AclUtils = {
    ALL_OPERATIONS_OPTIONS,
    ALL_PATTERN_TYPES_OPTIONS,
    ALL_RESOURCE_TYPES_OPTIONS,
    getOperationsOptionsByResourceType,
    TOPIC_OPERATIONS_OPTIONS,
    DELEGATION_TOKEN_OPERATIONS_OPTIONS,
    TRANSACTIONAL_ID_OPERATIONS_OPTIONS,
    GROUP_OPERATIONS_OPTIONS,
    CLUSTER_OPERATIONS_OPTIONS,
    ALL_PERMISSION_TYPES_OPTIONS,
};

export { AclUtils };
