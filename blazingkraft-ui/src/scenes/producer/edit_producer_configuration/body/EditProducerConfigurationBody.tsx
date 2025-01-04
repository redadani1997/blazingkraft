import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import producerActions from 'scenes/producer/redux/actions';
import EditProducerConfigurationBodyComponent from './EditProducerConfigurationBodyComponent';

const EditProducerConfigurationBody = () => {
    // Map State To Props
    const {
        isEditProducerConfigurationPending,
        isGetProducerCompleteConfigurationPending,
        producerCompleteConfiguration,
    } = useSelector((store: ReduxStore) => {
        return {
            isEditProducerConfigurationPending:
                store.producerReducer.isEditProducerConfigurationPending,
            isGetProducerCompleteConfigurationPending:
                store.producerReducer.isGetProducerCompleteConfigurationPending,
            producerCompleteConfiguration:
                store.producerReducer.producerCompleteConfiguration,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { clusterCode } = useParams();

    const editProducerConfiguration = (
        mainConfiguration,
        keySerializer,
        keySerializerConfiguration,
        valueSerializer,
        valueSerializerConfiguration,
    ) =>
        dispatch(
            producerActions.editProducerConfiguration(
                mainConfiguration,
                keySerializer,
                keySerializerConfiguration,
                valueSerializer,
                valueSerializerConfiguration,
                clusterCode,
            ),
        ).then(() => {
            navigate(`/clusters/${clusterCode}/producer/configuration`);
        });

    return (
        <>
            <EditProducerConfigurationBodyComponent
                editProducerConfiguration={editProducerConfiguration}
                producerCompleteConfiguration={producerCompleteConfiguration}
                isGetProducerCompleteConfigurationPending={
                    isGetProducerCompleteConfigurationPending
                }
            />
            <LoadingSpinner
                isLoading={
                    isEditProducerConfigurationPending ||
                    isGetProducerCompleteConfigurationPending
                }
            />
        </>
    );
};

export default EditProducerConfigurationBody;
