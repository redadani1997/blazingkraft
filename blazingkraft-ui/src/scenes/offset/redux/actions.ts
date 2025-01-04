import { IsolationLevel, OffsetSpec } from 'common/types/offset';
import { TopicPartition } from 'common/types/topic';
import { GET, POST, PUT } from 'rest/RestCalls';
import { TopicPartitionToClear } from 'scenes/consumer_group/clear_offsets/ClearConsumerGroupOffsets';
import offsetTypes from './types';

export interface OffsetSpecsByTopicPartition {
    topicPartition: TopicPartition;
    offsetSpec: OffsetSpec;
    timestamp: number | undefined;
}

export interface OffsetAndMetadata {
    offset: number;
    leaderEpoch: number | undefined;
    metadata: string | undefined;
}

export interface OffsetAndMetadataByTopicPartition {
    topicPartition: TopicPartition;
    offsetAndMetadata: OffsetAndMetadata;
}

function alterConsumerGroupOffsets(
    consumerGroup: string,
    offsetAndMetadataByTopicPartition: OffsetAndMetadataByTopicPartition[],
    clusterCode,
) {
    return {
        type: offsetTypes.ALTER_CONSUMER_GROUP_OFFSETS,
        payload: PUT(
            '/admin/offsets/alter',
            {
                groupId: consumerGroup,
                offsetsByTopicPartition: offsetAndMetadataByTopicPartition,
            },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Offsets Alteration', consumerGroup },
    };
}

function deleteConsumerGroupOffsets(
    consumerGroup: string,
    topicPartitions: TopicPartitionToClear[],
    clusterCode,
) {
    const topicPartitionsToClear = topicPartitions.flatMap(topicPartition => {
        return topicPartition.partitions?.map(partition => ({
            topic: topicPartition.topic,
            partition,
        }));
    });
    return {
        type: offsetTypes.DELETE_CONSUMER_GROUP_OFFSETS,
        payload: PUT(
            `/admin/offsets/consumer-group/${consumerGroup}/delete`,
            { topicPartitions: topicPartitionsToClear },
            { headers: { clusterCode } },
        ),
        meta: { context: 'Offsets Clearance', consumerGroup },
    };
}

function listConsumerGroupOffsets(consumerGroup: string, clusterCode) {
    return {
        type: offsetTypes.LIST_CONSUMER_GROUP_OFFSETS,
        payload: GET(`/admin/offsets/consumer-group/${consumerGroup}`, {
            headers: { clusterCode },
        }),
        meta: { context: 'Offsets', consumerGroup },
    };
}

function listTopicPartitionsOffsets(
    isolationLevel: IsolationLevel,
    offsetSpecsByTopicPartition: OffsetSpecsByTopicPartition[],
    clusterCode,
) {
    return {
        type: offsetTypes.LIST_TOPIC_PARTITIONS_OFFSETS,
        payload: POST(
            '/admin/offsets/topic-partitions',
            { isolationLevel, offsetSpecsByTopicPartition },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Offsets' },
    };
}

function listConsumerGroupEarliestTopicPartitionsOffsets(
    isolationLevel: IsolationLevel,
    offsetSpecsByTopicPartition: OffsetSpecsByTopicPartition[],
    clusterCode,
) {
    const earliest = offsetSpecsByTopicPartition.map(
        offsetSpecsByTopicPartition => ({
            ...offsetSpecsByTopicPartition,
            offsetSpec: 'EARLIEST',
        }),
    );
    return {
        type: offsetTypes.LIST_CONSUMER_GROUP_EARLIEST_TOPIC_PARTITIONS_OFFSETS,
        payload: POST(
            '/admin/offsets/topic-partitions',
            { isolationLevel, offsetSpecsByTopicPartition: earliest },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Offsets' },
    };
}

function listConsumerGroupLatestTopicPartitionsOffsets(
    isolationLevel: IsolationLevel,
    offsetSpecsByTopicPartition: OffsetSpecsByTopicPartition[],
    clusterCode,
) {
    const latest = offsetSpecsByTopicPartition.map(
        offsetSpecsByTopicPartition => ({
            ...offsetSpecsByTopicPartition,
            offsetSpec: 'LATEST',
        }),
    );

    return {
        type: offsetTypes.LIST_CONSUMER_GROUP_LATEST_TOPIC_PARTITIONS_OFFSETS,
        payload: POST(
            '/admin/offsets/topic-partitions',
            { isolationLevel, offsetSpecsByTopicPartition: latest },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Offsets' },
    };
}

const offsetActions = {
    alterConsumerGroupOffsets,
    deleteConsumerGroupOffsets,
    listConsumerGroupOffsets,
    listTopicPartitionsOffsets,
    listConsumerGroupLatestTopicPartitionsOffsets,
    listConsumerGroupEarliestTopicPartitionsOffsets,
};

export default offsetActions;
