export type COMMON_ROUTE_ID =
    | 'NOT_FOUND'
    | 'HOME'
    | 'MANAGEMENT'
    | 'CLUSTERS'
    | 'SCHEMA_REGISTRIES'
    | 'KAFKA_CONNECTS'
    | 'PLAYGROUND'
    | 'KSQLDBS';

export type COMMON_CLUSTER_ROUTE_TYPE =
    | 'DASHBOARD'
    | 'TOPIC'
    | 'PRODUCER'
    | 'CONSUMER'
    | 'CONSUMER_GROUP'
    | 'ACL'
    | 'DELEGATION_TOKEN'
    | 'QUOTAS'
    | 'STREAMS';

export type COMMON_SCHEMA_REGISTRY_ROUTE_TYPE = 'DASHBOARD' | 'SUBJECT';

export type COMMON_MANAGEMENT_ROUTE_TYPE =
    | 'USERS'
    | 'DATA_MASKING'
    | 'AUDIT'
    | 'ALERTS'
    | 'OIDC_PROVIDERS'
    | 'GROUPS'
    | 'SERVER_PERMISSIONS';

export type COMMON_PLAYGROUND_ROUTE_TYPE =
    | 'OPENAPI_DEFINITION'
    | 'OPENAPI_CONTENT'
    | 'SCHEMAS_DEFINITION'
    | 'SCHEMAS_CONTENT'
    | 'CONTENT_VALIDATION'
    | 'CONTENT_DIFF'
    | 'CONVERSIONS';

export type COMMON_KAFKA_CONNECT_ROUTE_TYPE =
    | 'DASHBOARD'
    | 'CONNECTOR'
    | 'PLUGIN';

export type COMMON_KSQLDB_ROUTE_TYPE =
    | 'DASHBOARD'
    | 'EDITOR'
    | 'CONNECTOR'
    | 'TABLE'
    | 'STREAM'
    | 'TOPIC'
    | 'QUERY';

export type COMMON_ROUTE_TYPE =
    | COMMON_MANAGEMENT_ROUTE_TYPE
    | COMMON_CLUSTER_ROUTE_TYPE
    | COMMON_KAFKA_CONNECT_ROUTE_TYPE
    | COMMON_KSQLDB_ROUTE_TYPE
    | COMMON_SCHEMA_REGISTRY_ROUTE_TYPE
    | COMMON_PLAYGROUND_ROUTE_TYPE;

export interface ActiveLink {
    id: COMMON_ROUTE_ID | undefined;
    type?: COMMON_ROUTE_TYPE;
    code?: string;
}

export interface OpenedLink {
    id: COMMON_ROUTE_ID;
    code: string;
}

export interface CodeLink {
    name: string;
    icon: React.ReactNode;
    link: string;
    type: COMMON_ROUTE_TYPE;
}

type ActivePage =
    | 'PRIMARY'
    | 'MANAGEMENT'
    | 'CLUSTERS'
    | 'SCHEMA_REGISTRIES'
    | 'KAFKA_CONNECTS'
    | 'PLAYGROUND'
    | 'KSQLDBS';
