import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import TopicSubjectsDetailsComponent from './TopicSubjectsDetailsComponent';

const TopicSubjectsDetails = () => {
    // Map State To Props
    const { isGetTopicSubjectDetailsPending, topicSubjectDetails } =
        useSelector((store: ReduxStore) => {
            return {
                isGetTopicSubjectDetailsPending:
                    store.schemaRegistryReducer.isGetTopicSubjectDetailsPending,
                topicSubjectDetails:
                    store.schemaRegistryReducer.topicSubjectDetails,
            };
        }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <TopicSubjectsDetailsComponent
                isGetTopicSubjectDetailsPending={
                    isGetTopicSubjectDetailsPending
                }
                topicSubjectDetails={topicSubjectDetails}
            />
        </>
    );
};

export default TopicSubjectsDetails;
