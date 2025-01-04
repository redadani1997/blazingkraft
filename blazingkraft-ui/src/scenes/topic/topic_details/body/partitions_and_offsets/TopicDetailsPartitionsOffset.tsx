import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import TopicDetailsPartitionsOffsetComponent from './TopicDetailsPartitionsOffsetComponent';

const TopicDetailsPartitionsOffset = () => {
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
        <>
            <TopicDetailsPartitionsOffsetComponent
                isGetTopicDetailsPending={isGetTopicDetailsPending}
                topicDetails={topicDetails}
            />
        </>
    );
};

export default TopicDetailsPartitionsOffset;
