import { KafkaNode } from 'common/types/node';

export interface ClusterMeta {
    id: string;
    name: string;
    code: string;
    color: string;
    schemaRegistryCode: string | null;
    schemaRegistryName: string | null;
    jmxEnabled: boolean;
}

export interface ClusterDetails {
    id: string;
    name: string;
    code: string;
    color: string;
    schemaRegistryCode: string | null;
    commonConfiguration: Map<string, any>;
    jmxEnabled: boolean;
    jmxUrl: string | null;
    jmxEnvironment: Map<string, any> | null;
}

export interface IClusterDescription {
    topics: number;
    kafkaVersion: string;
    totalBytesWritten: string;
    brokers: number;
    errorMessage?: string;
    succeeded: boolean;
}

export interface IClusterMonitoring {
    BytesInPerSecCount?: string;
    BytesInPerSecMeanRate?: string;
    BytesOutPerSecCount?: string;
    BytesOutPerSecMeanRate?: string;
    TotalFetchRequestsPerSecCount?: string;
    TotalFetchRequestsPerSecMeanRate?: string;
    TotalProduceRequestsPerSecCount?: string;
    TotalProduceRequestsPerSecMeanRate?: string;
    UnderReplicatedPartitions?: string;
    LeaderElectionRateAndTimeMsCount?: string;
    LeaderElectionRateAndTimeMsMeanRate?: string;
    ActiveControllerCount?: string;
    OfflinePartitionsCount?: string;
    TotalTimeMsProduceCount?: string;
    TotalTimeMsProduceMean?: string;
    TotalTimeMsFetchCount?: string;
    TotalTimeMsFetchMean?: string;
    TotalTimeMsFetchConsumerCount?: string;
    TotalTimeMsFetchConsumerMean?: string;
    TotalTimeMsFetchFollowerCount?: string;
    TotalTimeMsFetchFollowerMean?: string;
    ['linux-disk-write-bytes']?: string;
    ['linux-disk-read-bytes']?: string;
}

export interface IClusterBrokersDetails {
    totalBytes: number;
    usableBytes: number;
    totalOffsetLag: number;
    totalReplicasSize: number;
    node: KafkaNode;
}

export interface IClusterBrokerConfiguration {
    configuration: {
        name: string;
        value: string;
        source: string;
        sensitive: boolean;
        readOnly: boolean;
        type: string;
        documentation: string;
    }[];
}

export type ClusterReducerState = {
    isCreateClusterPending: boolean;
    isDeleteClusterPending: boolean;
    isEditClusterPending: boolean;
    isExportClusterPending: boolean;
    isImportClusterPending: boolean;
    isGetAllClustersPending: boolean;
    isGetClusterDetailsPending: boolean;
    isTestClusterClientConnectivityPending: boolean;
    isTestClusterJmxConnectivityPending: boolean;
    isGetClustersDescriptionsPending: Map<string, boolean>;
    isMonitorClusterPending: boolean;
    isGetClusterBrokerConfiguration: boolean;
    isGetClusterBrokersDetailsPending: boolean;
    clusters: ClusterMeta[];
    clusterDetails: ClusterDetails | null;
    clustersDescriptions: Map<string, IClusterDescription>;
    clusterMonitoring: IClusterMonitoring;
    clusterBrokersDetails: IClusterBrokersDetails[];
    clusterBrokerConfiguration: IClusterBrokerConfiguration;
};
