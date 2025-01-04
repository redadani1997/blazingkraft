import { AclOperation } from './acl_binding';
import { OffsetInfo } from './offset';
import { PartitionInfo } from './partition';

export interface TopicMeta {
    name: string;
    code: string;
}

export interface TopicListing {
    name: string;
    topicId: string;
    internal: boolean;
}

export interface TopicDescription {
    name: string;
    topicId: string;
    internal: boolean;
    partitions: PartitionInfo[];
    aclOperations?: AclOperation[];
    replicas: number;
    isr: number;
    isFavorite?: boolean;
}

export interface TopicPartition {
    topic: string;
    partition: number;
}

export interface IPartitionDetails {
    partition: number;
    offsetLag: number;
    size: number;
}

export interface ITopicDetails {
    topicDescription: TopicDescription;
    earliestOffsetInfos: OffsetInfo[];
    latestOffsetInfos: OffsetInfo[];
    partitionsDetails: IPartitionDetails[];
}

export interface ITopicConfiguration {
    topicConfiguration: Map<string, string>;
}
