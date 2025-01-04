export type AclOperation =
    | 'UNKNOWN'
    | 'ANY'
    | 'ALL'
    | 'READ'
    | 'WRITE'
    | 'CREATE'
    | 'DELETE'
    | 'ALTER'
    | 'DESCRIBE'
    | 'CLUSTER_ACTION'
    | 'DESCRIBE_CONFIGS'
    | 'ALTER_CONFIGS'
    | 'IDEMPOTENT_WRITE'
    | 'CREATE_TOKENS'
    | 'DESCRIBE_TOKENS';

export type AclResourceType =
    | 'UNKNOWN'
    | 'ANY'
    | 'TOPIC'
    | 'GROUP'
    | 'CLUSTER'
    | 'TRANSACTIONAL_ID'
    | 'DELEGATION_TOKEN'
    | 'USER';

export type AclPatternType =
    | 'UNKNOWN'
    | 'ANY'
    | 'MATCH'
    | 'LITERAL'
    | 'PREFIXED';

export type AclPermissionType = 'UNKNOWN' | 'ANY' | 'DENY' | 'ALLOW';

export interface AclBinding {
    principal: string;
    host: string;
    operation: AclOperation;
    permissionType: AclPermissionType;
    resourceType: AclResourceType;
    resourceName: string;
    patternType: AclPatternType;
}
