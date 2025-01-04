import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import BlazingProducerDetailsBodyComponent from './BlazingProducerDetailsBodyComponent';

const BlazingProducerDetailsBody = () => {
    // Map State To Props
    const {
        isGetProducerCompleteConfigurationPending,
        producerCompleteConfiguration,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetProducerCompleteConfigurationPending:
                store.producerReducer.isGetProducerCompleteConfigurationPending,
            producerCompleteConfiguration:
                store.producerReducer.producerCompleteConfiguration,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <BlazingProducerDetailsBodyComponent
                producerCompleteConfiguration={producerCompleteConfiguration}
                isGetProducerCompleteConfigurationPending={
                    isGetProducerCompleteConfigurationPending
                }
            />
            <LoadingSpinner
                isLoading={isGetProducerCompleteConfigurationPending}
            />
        </>
    );
};

export default BlazingProducerDetailsBody;
