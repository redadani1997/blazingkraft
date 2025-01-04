import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import BlazingConsumerDetailsBodyComponent from './BlazingConsumerDetailsBodyComponent';

const BlazingConsumerDetailsBody = () => {
    // Map State To Props
    const {
        isGetConsumerCompleteConfigurationPending,
        consumerCompleteConfiguration,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetConsumerCompleteConfigurationPending:
                store.consumerReducer.isGetConsumerCompleteConfigurationPending,
            consumerCompleteConfiguration:
                store.consumerReducer.consumerCompleteConfiguration,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <BlazingConsumerDetailsBodyComponent
                consumerCompleteConfiguration={consumerCompleteConfiguration}
                isGetConsumerCompleteConfigurationPending={
                    isGetConsumerCompleteConfigurationPending
                }
            />
            <LoadingSpinner
                isLoading={isGetConsumerCompleteConfigurationPending}
            />
        </>
    );
};

export default BlazingConsumerDetailsBody;
