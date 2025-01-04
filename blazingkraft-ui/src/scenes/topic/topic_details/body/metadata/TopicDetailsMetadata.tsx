import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import TopicDetailsMetadataComponent from './TopicDetailsMetadataComponent';

const TopicDetailsMetadata = () => {
    // Map State To Props
    const { isGetTopicDetailsPending, topicDetails } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetTopicDetailsPending:
                    store.topicReducer.isGetTopicDetailsPending,
                topicDetails: store.topicReducer.topicDetails,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    return (
        <TopicDetailsMetadataComponent
            topicDetails={topicDetails}
            isGetTopicDetailsPending={isGetTopicDetailsPending}
        />
    );
};

export default TopicDetailsMetadata;
