import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import offsetActions, {
    OffsetAndMetadataByTopicPartition,
} from 'scenes/offset/redux/actions';
import { TopicPartitionOffsetToAlter } from '../consumer_group_details/ConsumerGroupDetailsComponent';
import AlterConsumerGroupOffsetsComponent from './AlterConsumerGroupOffsetsComponent';

interface AlterConsumerGroupOffsetsProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[];
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[],
    ) => void;
}

const AlterConsumerGroupOffsets = (props: AlterConsumerGroupOffsetsProps) => {
    // Map State To Props
    const {
        isAlterConsumerGroupOffsetsPending,
        consumerGroupOffsets,
        consumerGroupEarliestTopicPartitionsOffsets,
        consumerGroupLatestTopicPartitionsOffsets,
    } = useSelector((store: ReduxStore) => {
        return {
            isAlterConsumerGroupOffsetsPending:
                store.offsetReducer.isAlterConsumerGroupOffsetsPending,
            consumerGroupOffsets: store.offsetReducer.consumerGroupOffsets,
            consumerGroupEarliestTopicPartitionsOffsets:
                store.offsetReducer.consumerGroupEarliestTopicPartitionsOffsets,
            consumerGroupLatestTopicPartitionsOffsets:
                store.offsetReducer.consumerGroupLatestTopicPartitionsOffsets,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, consumerGroup } = useParams();

    const listConsumerGroupOffsets = () =>
        dispatch(
            offsetActions.listConsumerGroupOffsets(consumerGroup, clusterCode),
        );

    const alterConsumerGroupOffsets = () => {
        const offsetAndMetadataByTopicPartition: OffsetAndMetadataByTopicPartition[] =
            props.topicPartitionOffsetsToAlter.map(
                topicPartitionOffsetToAlter => {
                    return {
                        topicPartition: {
                            topic: topicPartitionOffsetToAlter.topic,
                            partition: topicPartitionOffsetToAlter.partition,
                        },
                        offsetAndMetadata: {
                            offset: topicPartitionOffsetToAlter.offset,
                            leaderEpoch: undefined,
                            metadata: undefined,
                        },
                    };
                },
            );
        return dispatch(
            offsetActions.alterConsumerGroupOffsets(
                consumerGroup,
                offsetAndMetadataByTopicPartition,
                clusterCode,
            ),
        ).then(() => {
            listConsumerGroupOffsets();
            props.setIsModalOpen(false);
        });
    };

    return (
        <>
            <AlterConsumerGroupOffsetsComponent
                {...props}
                alterConsumerGroupOffsets={alterConsumerGroupOffsets}
                isAlterConsumerGroupOffsetsPending={
                    isAlterConsumerGroupOffsetsPending
                }
                consumerGroupOffsets={consumerGroupOffsets}
                consumerGroupEarliestTopicPartitionsOffsets={
                    consumerGroupEarliestTopicPartitionsOffsets
                }
                consumerGroupLatestTopicPartitionsOffsets={
                    consumerGroupLatestTopicPartitionsOffsets
                }
                consumerGroup={consumerGroup}
            />
        </>
    );
};

export default AlterConsumerGroupOffsets;
