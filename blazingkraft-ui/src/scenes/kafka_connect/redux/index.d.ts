export interface KafkaConnectMeta {
    name: string;
    code: string;
    clusterCode: string;
    clusterName: string;
    color: string;
    jmxEnabled: boolean;
}

export interface KafkaConnectDetails {
    name: string;
    code: string;
    color: string;
    basicAuthEnabled: boolean;
    basicAuthUsername: string;
    basicAuthPassword: string;
    url: string;
    clusterCode: string;
    clusterName: string;
    jmxEnabled: boolean;
    jmxUrl: string | null;
    jmxEnvironment: Map<string, any> | null;
}

export interface IKafkaConnectDescription {
    version?: string;
    kafka_cluster_id?: string;
    commit?: string;
    errorMessage?: string;
    succeeded: boolean;
}

export interface IKafkaConnectMonitoring {
    // Connector
    ['connector-count']?: string;
    ['connector-startup-attempts-total']?: string;
    ['connector-startup-failure-percentage']?: string;
    ['connector-startup-failure-total']?: string;
    ['connector-startup-success-percentage']?: string;
    ['connector-startup-success-total']?: string;
    // Task
    ['task-count']?: string;
    ['task-startup-attempts-total']?: string;
    ['task-startup-failure-percentage']?: string;
    ['task-startup-failure-total']?: string;
    ['task-startup-success-percentage']?: string;
    ['task-startup-success-total']?: string;
}

export type KafkaConnectReducerState = {
    isCreateKafkaConnectPending: boolean;
    isGetAllKafkaConnectsPending: boolean;
    isGetKafkaConnectDetailsPending: boolean;
    isDeleteKafkaConnectPending: boolean;
    isEditKafkaConnectPending: boolean;
    isTestKafkaConnectClientConnectivityPending: boolean;
    isTestKafkaConnectJmxConnectivityPending: boolean;
    isMonitorKafkaConnectPending: boolean;
    isGetKafkaConnectsDescriptionsPending: Map<string, boolean>;
    kafkaConnects: KafkaConnectMeta[];
    kafkaConnectDetails: KafkaConnectDetails | null;
    kafkaConnectsDescriptions: Map<string, IKafkaConnectDescription>;
    kafkaConnectMonitoring: IKafkaConnectMonitoring;
};
