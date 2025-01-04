import { Offset, OffsetInfo } from 'common/types/offset';

export type OffsetReducerState = {
    consumerGroupEarliestTopicPartitionsOffsets: OffsetInfo[];
    consumerGroupLatestTopicPartitionsOffsets: OffsetInfo[];
    topicPartitionsOffsets: OffsetInfo[];
    consumerGroupOffsets: Offset[];
    isAlterConsumerGroupOffsetsPending: boolean;
    isDeleteConsumerGroupOffsetsPending: boolean;
    isListConsumerGroupOffsetsPending: boolean;
    isListTopicPartitionsOffsetsPending: boolean;
    isListConsumerGroupEarliestTopicPartitionsOffsetsPending: boolean;
    isListConsumerGroupLatestTopicPartitionsOffsetsPending: boolean;
};
