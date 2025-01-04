import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import consumerActions from 'scenes/consumer/redux/actions';
import EditConsumerConfigurationBodyComponent from './EditConsumerConfigurationBodyComponent';

const EditConsumerConfigurationBody = () => {
    // Map State To Props
    const {
        isEditConsumerConfigurationPending,
        isGetConsumerCompleteConfigurationPending,
        consumerCompleteConfiguration,
    } = useSelector((store: ReduxStore) => {
        return {
            isEditConsumerConfigurationPending:
                store.consumerReducer.isEditConsumerConfigurationPending,
            isGetConsumerCompleteConfigurationPending:
                store.consumerReducer.isGetConsumerCompleteConfigurationPending,
            consumerCompleteConfiguration:
                store.consumerReducer.consumerCompleteConfiguration,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { clusterCode } = useParams();

    const editConsumerConfiguration = (
        mainConfiguration,
        keyDeserializer,
        keyDeserializerConfiguration,
        valueDeserializer,
        valueDeserializerConfiguration,
        pollTimeoutMs,
    ) =>
        dispatch(
            consumerActions.editConsumerConfiguration(
                mainConfiguration,
                keyDeserializer,
                keyDeserializerConfiguration,
                valueDeserializer,
                valueDeserializerConfiguration,
                pollTimeoutMs,
                clusterCode,
            ),
        ).then(() => {
            navigate(`/clusters/${clusterCode}/consumer/configuration`);
        });

    return (
        <>
            <EditConsumerConfigurationBodyComponent
                editConsumerConfiguration={editConsumerConfiguration}
                consumerCompleteConfiguration={consumerCompleteConfiguration}
                isGetConsumerCompleteConfigurationPending={
                    isGetConsumerCompleteConfigurationPending
                }
            />
            <LoadingSpinner
                isLoading={
                    isEditConsumerConfigurationPending ||
                    isGetConsumerCompleteConfigurationPending
                }
            />
        </>
    );
};

export default EditConsumerConfigurationBody;
