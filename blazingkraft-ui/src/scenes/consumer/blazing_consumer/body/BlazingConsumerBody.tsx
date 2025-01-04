import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import BlazingConsumerBodyComponent from './BlazingConsumerBodyComponent';

interface BlazingConsumerBodyProps {
    topics: string[];
}

const BlazingConsumerBody = ({ topics }: BlazingConsumerBodyProps) => {
    const { clusterCode } = useParams();

    // Map State To Props
    const {
        consumerConfiguration,
        isGetAllTopicsDescriptionsPending,
        topicsDescriptions,
    } = useSelector((store: ReduxStore) => {
        return {
            consumerConfiguration: store.consumerReducer.consumerConfiguration,
            topicsDescriptions:
                store.topicReducer.topicsDescriptionsByCluster.get(clusterCode),
            isGetAllTopicsDescriptionsPending:
                store.topicReducer.isGetAllTopicsDescriptionsPendingByCluster.get(
                    clusterCode,
                ),
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            {consumerConfiguration && (
                <BlazingConsumerBodyComponent
                    consumerConfiguration={consumerConfiguration}
                    isGetAllTopicsDescriptionsPending={
                        isGetAllTopicsDescriptionsPending || false
                    }
                    topicsDescriptions={topicsDescriptions || []}
                    topics={topics}
                />
            )}
        </>
    );
};

export default BlazingConsumerBody;
