import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import topicActions from 'scenes/topic/redux/actions';
import CreateTopicBodyComponent from './CreateTopicBodyComponent';

const CreateTopicBody = () => {
    // Map State To Props
    const { isCreateTopicPending } = useSelector((store: ReduxStore) => {
        return {
            isCreateTopicPending: store.topicReducer.isCreateTopicPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();
    const navigate = useNavigate();

    const createTopic = (
        name,
        numPartitions,
        replicationFactor,
        configuration,
    ) =>
        dispatch(
            topicActions.createTopic(
                name,
                numPartitions ?? 1,
                replicationFactor ?? 1,
                configuration,
                clusterCode,
            ),
        ).then(() => navigate(`/clusters/${clusterCode}/topics/${name}`));

    return (
        <>
            <CreateTopicBodyComponent createTopic={createTopic} />
            <LoadingSpinner isLoading={isCreateTopicPending} />
        </>
    );
};

export default CreateTopicBody;
