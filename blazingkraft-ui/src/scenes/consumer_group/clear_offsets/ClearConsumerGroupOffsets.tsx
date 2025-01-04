import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import offsetActions from 'scenes/offset/redux/actions';
import consumerGroupActions from '../redux/actions';
import ClearConsumerGroupOffsetsComponent from './ClearConsumerGroupOffsetsComponent';

interface ClearConsumerGroupOffsetsProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

export interface TopicPartitionToClear {
    topic: string;
    partitions: number[];
    lineIndex: number;
}

const ClearConsumerGroupOffsets = (props: ClearConsumerGroupOffsetsProps) => {
    // Map State To Props
    const { isDeleteConsumerGroupOffsetsPending, consumerGroupOffsets } =
        useSelector((store: ReduxStore) => {
            return {
                isDeleteConsumerGroupOffsetsPending:
                    store.offsetReducer.isDeleteConsumerGroupOffsetsPending,
                consumerGroupOffsets: store.offsetReducer.consumerGroupOffsets,
            };
        }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, consumerGroup } = useParams();

    const listConsumerGroupOffsets = () =>
        dispatch(
            offsetActions.listConsumerGroupOffsets(consumerGroup, clusterCode),
        );
    const describeConsumerGroup = () =>
        dispatch(
            consumerGroupActions.describeConsumerGroup(
                consumerGroup,
                clusterCode,
            ),
        );

    const deleteConsumerGroupOffsets = topicPartitions => {
        return dispatch(
            offsetActions.deleteConsumerGroupOffsets(
                consumerGroup,
                topicPartitions,
                clusterCode,
            ),
        ).then(() => {
            describeConsumerGroup();
            listConsumerGroupOffsets();
            props.setIsModalOpen(false);
        });
    };

    return (
        <>
            <ClearConsumerGroupOffsetsComponent
                {...props}
                deleteConsumerGroupOffsets={deleteConsumerGroupOffsets}
                isDeleteConsumerGroupOffsetsPending={
                    isDeleteConsumerGroupOffsetsPending
                }
                consumerGroupOffsets={consumerGroupOffsets}
                consumerGroup={consumerGroup}
            />
        </>
    );
};

export default ClearConsumerGroupOffsets;
