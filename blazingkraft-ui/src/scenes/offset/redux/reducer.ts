import { ReduxAction } from 'redux_config/.';
import { OffsetReducerState } from '.';
import offsetTypes from './types';

const initialState: OffsetReducerState = {
    isAlterConsumerGroupOffsetsPending: false,
    isDeleteConsumerGroupOffsetsPending: false,
    isListConsumerGroupOffsetsPending: false,
    isListTopicPartitionsOffsetsPending: false,
    isListConsumerGroupEarliestTopicPartitionsOffsetsPending: false,
    isListConsumerGroupLatestTopicPartitionsOffsetsPending: false,
    consumerGroupOffsets: [],
    consumerGroupEarliestTopicPartitionsOffsets: [],
    consumerGroupLatestTopicPartitionsOffsets: [],
    topicPartitionsOffsets: [],
};

function offsetReducer(
    state = initialState,
    action: ReduxAction,
): OffsetReducerState {
    switch (action.type) {
        // ALTER_CONSUMER_GROUP_OFFSETS
        case offsetTypes.ALTER_CONSUMER_GROUP_OFFSETS_PENDING:
            return {
                ...state,
                isAlterConsumerGroupOffsetsPending: true,
            };
        case offsetTypes.ALTER_CONSUMER_GROUP_OFFSETS_FULFILLED:
            return {
                ...state,
                isAlterConsumerGroupOffsetsPending: false,
            };
        case offsetTypes.ALTER_CONSUMER_GROUP_OFFSETS_REJECTED:
            return {
                ...state,
                isAlterConsumerGroupOffsetsPending: false,
            };

        // DELETE_CONSUMER_GROUP_OFFSETS
        case offsetTypes.DELETE_CONSUMER_GROUP_OFFSETS_PENDING:
            return {
                ...state,
                isDeleteConsumerGroupOffsetsPending: true,
            };
        case offsetTypes.DELETE_CONSUMER_GROUP_OFFSETS_FULFILLED:
            return {
                ...state,
                isDeleteConsumerGroupOffsetsPending: false,
            };
        case offsetTypes.DELETE_CONSUMER_GROUP_OFFSETS_REJECTED:
            return {
                ...state,
                isDeleteConsumerGroupOffsetsPending: false,
            };

        // LIST_CONSUMER_GROUP_OFFSETS
        case offsetTypes.LIST_CONSUMER_GROUP_OFFSETS_PENDING:
            return {
                ...state,
                isListConsumerGroupOffsetsPending: true,
            };
        case offsetTypes.LIST_CONSUMER_GROUP_OFFSETS_FULFILLED:
            return {
                ...state,
                consumerGroupOffsets: action.payload,
                isListConsumerGroupOffsetsPending: false,
            };
        case offsetTypes.LIST_CONSUMER_GROUP_OFFSETS_REJECTED:
            return {
                ...state,
                consumerGroupOffsets: [],
                isListConsumerGroupOffsetsPending: false,
            };

        // LIST_TOPIC_PARTITIONS_OFFSETS
        case offsetTypes.LIST_TOPIC_PARTITIONS_OFFSETS_PENDING:
            return {
                ...state,
                isListTopicPartitionsOffsetsPending: true,
            };
        case offsetTypes.LIST_TOPIC_PARTITIONS_OFFSETS_FULFILLED:
            return {
                ...state,
                topicPartitionsOffsets: action.payload,
                isListTopicPartitionsOffsetsPending: false,
            };
        case offsetTypes.LIST_TOPIC_PARTITIONS_OFFSETS_REJECTED:
            return {
                ...state,
                topicPartitionsOffsets: [],
                isListTopicPartitionsOffsetsPending: false,
            };

        // LIST_CONSUMER_GROUP_EARLIEST_TOPIC_PARTITIONS_OFFSETS
        case offsetTypes.LIST_CONSUMER_GROUP_EARLIEST_TOPIC_PARTITIONS_OFFSETS_PENDING:
            return {
                ...state,
                isListConsumerGroupEarliestTopicPartitionsOffsetsPending: true,
            };
        case offsetTypes.LIST_CONSUMER_GROUP_EARLIEST_TOPIC_PARTITIONS_OFFSETS_FULFILLED:
            return {
                ...state,
                consumerGroupEarliestTopicPartitionsOffsets: action.payload,
                isListConsumerGroupEarliestTopicPartitionsOffsetsPending: false,
            };
        case offsetTypes.LIST_CONSUMER_GROUP_EARLIEST_TOPIC_PARTITIONS_OFFSETS_REJECTED:
            return {
                ...state,
                consumerGroupEarliestTopicPartitionsOffsets: [],
                isListConsumerGroupEarliestTopicPartitionsOffsetsPending: false,
            };

        // LIST_CONSUMER_GROUP_LATEST_TOPIC_PARTITIONS_OFFSETS
        case offsetTypes.LIST_CONSUMER_GROUP_LATEST_TOPIC_PARTITIONS_OFFSETS_PENDING:
            return {
                ...state,
                isListConsumerGroupLatestTopicPartitionsOffsetsPending: true,
            };
        case offsetTypes.LIST_CONSUMER_GROUP_LATEST_TOPIC_PARTITIONS_OFFSETS_FULFILLED:
            return {
                ...state,
                consumerGroupLatestTopicPartitionsOffsets: action.payload,
                isListConsumerGroupLatestTopicPartitionsOffsetsPending: false,
            };
        case offsetTypes.LIST_CONSUMER_GROUP_LATEST_TOPIC_PARTITIONS_OFFSETS_REJECTED:
            return {
                ...state,
                consumerGroupLatestTopicPartitionsOffsets: [],
                isListConsumerGroupLatestTopicPartitionsOffsetsPending: false,
            };

        default:
            return state;
    }
}

export default offsetReducer;
