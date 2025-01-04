import { AclOperation } from './acl_binding';
import { KafkaNode } from './node';
import { TopicPartition } from './topic';

export type ConsumerGroupState =
    | 'UNKNOWN'
    | 'PREPARING_REBALANCE'
    | 'COMPLETING_REBALANCE'
    | 'STABLE'
    | 'DEAD'
    | 'EMPTY';

export interface MemberAssignment {
    topicPartitions: TopicPartition[];
}

export interface MemberDescription {
    memberId: string;
    clientId: string;
    host: string;
    groupInstanceId: string;
    assignment: MemberAssignment;
    authorizedOperations?: AclOperation[];
}

export interface ConsumerGroupListing {
    groupId: string;
    isSimpleConsumerGroup: boolean;
    state: ConsumerGroupState;
}

export interface ConsumerGroupDescription {
    groupId: string;
    isSimpleConsumerGroup: boolean;
    state: ConsumerGroupState;
    authorizedOperations?: AclOperation[];
    partitionAssignor: string;
    coordinator: KafkaNode;
    members: MemberDescription[];
    topicPartitions?: TopicPartition[];
}
