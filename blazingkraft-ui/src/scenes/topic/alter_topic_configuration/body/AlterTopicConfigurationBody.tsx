import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import topicActions from 'scenes/topic/redux/actions';
import AlterTopicConfigurationBodyComponent from './AlterTopicConfigurationBodyComponent';

const AlterTopicConfigurationBody = () => {
    // Map State To Props
    const { isAlterTopicConfigurationPending, topicConfiguration } =
        useSelector((store: ReduxStore) => {
            return {
                isAlterTopicConfigurationPending:
                    store.topicReducer.isAlterTopicConfigurationPending,
                topicConfiguration: store.topicReducer.topicConfiguration,
            };
        }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, topic } = useParams();
    const navigate = useNavigate();

    const alterTopicConfiguration = configuration =>
        dispatch(
            topicActions.alterTopicConfiguration(
                topic,
                configuration,
                clusterCode,
            ),
        ).then(() => navigate(`/clusters/${clusterCode}/topics/${topic}`));

    return (
        <>
            <AlterTopicConfigurationBodyComponent
                alterTopicConfiguration={alterTopicConfiguration}
                topicConfiguration={topicConfiguration}
            />
            <LoadingSpinner isLoading={isAlterTopicConfigurationPending} />
        </>
    );
};

export default AlterTopicConfigurationBody;
