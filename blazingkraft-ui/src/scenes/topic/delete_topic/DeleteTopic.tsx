import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import topicActions from '../redux/actions';
import DeleteTopicComponent from './DeleteTopicComponent';

interface DeleteTopicProps {
    topicToDelete: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteTopic = ({
    topicToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteTopicProps) => {
    // Map State To Props
    const { isDeleteTopicPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteTopicPending: store.topicReducer.isDeleteTopicPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const deleteTopic = () =>
        dispatch(topicActions.deleteTopic(topicToDelete, clusterCode)).then(
            () => {
                setIsModalOpen(false);
                onSuccess();
            },
        );

    return (
        <>
            <DeleteTopicComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteTopic={deleteTopic}
                isDeleteTopicPending={isDeleteTopicPending}
                topicToDelete={topicToDelete}
            />
        </>
    );
};

export default DeleteTopic;
