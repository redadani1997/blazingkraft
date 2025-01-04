import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import producerActions from 'scenes/producer/redux/actions';
import BlazingProducerBodyComponent from './BlazingProducerBodyComponent';

interface BlazingProducerBodyProps {
    topic: string;
    setIsImportBlazingRecordsModalOpen: (isOpen: boolean) => void;
    isImportBlazingRecordsModalOpen: boolean;
}

const BlazingProducerBody = ({
    topic,
    isImportBlazingRecordsModalOpen,
    setIsImportBlazingRecordsModalOpen,
}: BlazingProducerBodyProps) => {
    const { clusterCode } = useParams();

    // Map State To Props
    const {
        producerConfiguration,
        isGetAllTopicsDescriptionsPending,
        topicsDescriptions,
    } = useSelector((store: ReduxStore) => {
        return {
            producerConfiguration: store.producerReducer.producerConfiguration,
            topicsDescriptions:
                store.topicReducer.topicsDescriptionsByCluster.get(clusterCode),
            isGetAllTopicsDescriptionsPending:
                store.topicReducer.isGetAllTopicsDescriptionsPendingByCluster.get(
                    clusterCode,
                ),
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const produceBlazingRecord = (
        topic,
        partition,
        kafkaKey,
        kafkaValue,
        kafkaHeaders,
        kafkaKeySchema,
        kafkaValueSchema,
        keySerializer,
        keySerializerConfiguration,
        valueSerializer,
        valueSerializerConfiguration,
    ) =>
        dispatch(
            producerActions.produceBlazingRecord(
                topic,
                partition,
                kafkaKey,
                kafkaValue,
                kafkaHeaders,
                kafkaKeySchema,
                kafkaValueSchema,
                keySerializer,
                keySerializerConfiguration,
                valueSerializer,
                valueSerializerConfiguration,
                clusterCode,
            ),
        );

    return (
        <>
            {producerConfiguration && (
                <BlazingProducerBodyComponent
                    produceBlazingRecord={produceBlazingRecord}
                    producerConfiguration={producerConfiguration}
                    isGetAllTopicsDescriptionsPending={
                        isGetAllTopicsDescriptionsPending || false
                    }
                    topicsDescriptions={topicsDescriptions || []}
                    topic={topic}
                    isImportBlazingRecordsModalOpen={
                        isImportBlazingRecordsModalOpen
                    }
                    setIsImportBlazingRecordsModalOpen={
                        setIsImportBlazingRecordsModalOpen
                    }
                />
            )}
        </>
    );
};

export default BlazingProducerBody;
