import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ConsumerGroupTableComponent from './ConsumerGroupTableComponent';

interface ConsumerGroupTableProps {
    setIsAlterConsumerGroupOffsetsModalOpened: (isOpened: boolean) => void;
    setTopicPartitionOffsetsToAlter: (topicPartitionOffsets: any) => void;
}

const ConsumerGroupTable = (props: ConsumerGroupTableProps) => {
    // Map State To Props
    const {
        consumerGroupEarliestTopicPartitionsOffsets,
        consumerGroupLatestTopicPartitionsOffsets,
        consumerGroupOffsets,
        isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
        isListConsumerGroupLatestTopicPartitionsOffsetsPending,
        isListConsumerGroupOffsetsPending,
        consumerGroupDescription,
    } = useSelector((store: ReduxStore) => {
        return {
            consumerGroupDescription:
                store.consumerGroupReducer.consumerGroupDescription,
            consumerGroupOffsets: store.offsetReducer.consumerGroupOffsets,
            consumerGroupEarliestTopicPartitionsOffsets:
                store.offsetReducer.consumerGroupEarliestTopicPartitionsOffsets,
            consumerGroupLatestTopicPartitionsOffsets:
                store.offsetReducer.consumerGroupLatestTopicPartitionsOffsets,
            isListConsumerGroupOffsetsPending:
                store.offsetReducer.isListConsumerGroupOffsetsPending,
            isListConsumerGroupEarliestTopicPartitionsOffsetsPending:
                store.offsetReducer
                    .isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
            isListConsumerGroupLatestTopicPartitionsOffsetsPending:
                store.offsetReducer
                    .isListConsumerGroupLatestTopicPartitionsOffsetsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <ConsumerGroupTableComponent
                {...props}
                consumerGroupEarliestTopicPartitionsOffsets={
                    consumerGroupEarliestTopicPartitionsOffsets
                }
                consumerGroupLatestTopicPartitionsOffsets={
                    consumerGroupLatestTopicPartitionsOffsets
                }
                consumerGroupOffsets={consumerGroupOffsets}
                isListConsumerGroupEarliestTopicPartitionsOffsetsPending={
                    isListConsumerGroupEarliestTopicPartitionsOffsetsPending
                }
                isListConsumerGroupLatestTopicPartitionsOffsetsPending={
                    isListConsumerGroupLatestTopicPartitionsOffsetsPending
                }
                isListConsumerGroupOffsetsPending={
                    isListConsumerGroupOffsetsPending
                }
                consumerGroupDescription={consumerGroupDescription}
            />
        </>
    );
};

export default ConsumerGroupTable;
