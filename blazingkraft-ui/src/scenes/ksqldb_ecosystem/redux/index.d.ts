export interface KsqlDbConnector {
    name: string;
    type: string;
    className: string;
    state: string;
}
export interface KsqlDbQuery {
    id: string;
    queryType: string;
    sql: string;
    sink: string;
    sinkTopic: string;
}

export interface KsqlDbStream {
    name: string;
    topic: string;
    format: string;
    keyFormat: string;
    valueFormat: string;
    isWindowed: boolean;
}

export interface KsqlDbTable {
    name: string;
    topic: string;
    format: string;
    keyFormat: string;
    valueFormat: string;
    isWindowed: boolean;
}

export interface KsqlDbTopic {
    name: string;
    partitions: number;
    replicas: number;
}

export interface IKsqlDbRow {
    id: number;
    data: {
        [key: string]: any;
    };
}

export type KsqlDbEcosystemReducerState = {
    isGetAllKsqlDbConnectorsPending: boolean;
    isGetAllKsqlDbTopicsPending: boolean;
    isGetAllKsqlDbTablesPending: boolean;
    isGetAllKsqlDbStreamsPending: boolean;
    isGetAllKsqlDbQueriesPending: boolean;
    isCreateKsqlDbConnectorPending: boolean;
    isDeleteKsqlDbConnectorPending: boolean;
    isKsqlDbEditorExecuteQueryPending: boolean;
    isKsqlDbEditorExecuteStatementPending: boolean;
    ksqlDbConnectors: KsqlDbConnector[];
    ksqlDbTopics: KsqlDbTopic[];
    ksqlDbTables: KsqlDbTable[];
    ksqlDbStreams: KsqlDbStream[];
    ksqlDbQueries: KsqlDbQuery[];
    ksqldbEditorResultRows: IKsqlDbRow[];
};
