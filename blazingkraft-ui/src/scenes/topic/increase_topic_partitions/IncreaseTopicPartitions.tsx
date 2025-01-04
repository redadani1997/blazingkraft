import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import topicActions from '../redux/actions';
import IncreaseTopicPartitionsComponent from './IncreaseTopicPartitionsComponent';

interface IncreaseTopicPartitionsProps {
    topicToIncrease: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    numberOfPartitions: number;
    onSuccess: () => void;
}

const IncreaseTopicPartitions = ({
    topicToIncrease,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
    numberOfPartitions,
}: IncreaseTopicPartitionsProps) => {
    // Map State To Props
    const { isIncreaseTopicPartitionsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isIncreaseTopicPartitionsPending:
                    store.topicReducer.isIncreaseTopicPartitionsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const increaseTopicPartitions = increaseTo =>
        dispatch(
            topicActions.increaseTopicPartitions(
                topicToIncrease,
                increaseTo,
                clusterCode,
            ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <IncreaseTopicPartitionsComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                increaseTopicPartitions={increaseTopicPartitions}
                isIncreaseTopicPartitionsPending={
                    isIncreaseTopicPartitionsPending
                }
                topicToIncrease={topicToIncrease}
                numberOfPartitions={numberOfPartitions}
            />
        </>
    );
};

export default IncreaseTopicPartitions;
