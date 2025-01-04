export interface KsqlDbMeta {
    name: string;
    code: string;
    color: string;
    jmxEnabled: boolean;
}

export interface KsqlDbDetails {
    name: string;
    code: string;
    color: string;
    host: string;
    port: number;
    basicAuthEnabled: boolean;
    basicAuthUsername: string;
    basicAuthPassword: string;
    keyStoreEnabled: boolean;
    keyStore: string;
    keyStorePassword: string;
    trustStoreEnabled: boolean;
    trustStore: string;
    trustStorePassword: string;
    useTls: boolean;
    verifyHost: boolean;
    useAlpn: boolean;
    executeQueryMaxResultRows: number;
    jmxEnabled: boolean;
    jmxUrl: string | null;
    jmxEnvironment: Map<string, any> | null;
}
export interface IKsqlDbDescription {
    serverVersion?: string;
    kafkaClusterId?: string;
    ksqlServiceId?: string;
    errorMessage?: string;
    succeeded: boolean;
}

export interface IKsqlDbMonitoring {
    // Common
    ['bytes-consumed-total']?: string;
    ['messages-consumed-min']?: string;
    ['messages-consumed-max']?: string;
    ['messages-consumed-avg']?: string;
    ['messages-consumed-per-sec']?: string;
    ['messages-produced-per-sec']?: string;
    ['error-rate']?: string;

    // Consumer
    ['consumer-total-messages']?: string;
    ['consumer-messages-per-sec']?: string;
    ['consumer-total-bytes']?: string;

    // Producer
    ['total-messages']?: string;
    ['messages-per-sec']?: string;

    // Pull query
    ['pull-query-requests-total']?: string;
    ['pull-query-requests-rate']?: string;
    ['pull-query-requests-error-total']?: string;
    ['pull-query-requests-error-rate']?: string;

    // Node Utilization
    node_storage_free_bytes?: string;
    node_storage_total_bytes?: string;
    node_storage_used_bytes?: string;
    num_stateful_tasks?: string;
    storage_utilization?: string;
}

export type KsqlDbReducerState = {
    isCreateKsqlDbPending: boolean;
    isGetAllKsqlDbsPending: boolean;
    isGetKsqlDbDetailsPending: boolean;
    isDeleteKsqlDbPending: boolean;
    isEditKsqlDbPending: boolean;
    isTestKsqlDbClientConnectivityPending: boolean;
    isTestKsqlDbJmxConnectivityPending: boolean;
    isMonitorKsqlDbPending: boolean;
    isGetKsqlDbsDescriptionsPending: Map<string, boolean>;
    ksqlDbs: KsqlDbMeta[];
    ksqlDbDetails: KsqlDbDetails | null;
    ksqlDbsDescriptions: Map<string, IKsqlDbDescription>;
    ksqlDbMonitoring: IKsqlDbMonitoring;
};
