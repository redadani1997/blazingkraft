import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import TopicDetailsBodyComponent from './TopicDetailsBodyComponent';

interface TopicDetailsBodyProps {
    schemaRegistryCode?: string;
    isAuthorizedDescribeSubjects: boolean;
}

const TopicDetailsBody = ({
    isAuthorizedDescribeSubjects,
    schemaRegistryCode,
}: TopicDetailsBodyProps) => {
    // Map State To Props
    const {
        isGetTopicDetailsPending,
        isGetTopicConfigurationPending,
        topicConfiguration,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetTopicDetailsPending:
                store.topicReducer.isGetTopicDetailsPending,
            isGetTopicConfigurationPending:
                store.topicReducer.isGetTopicConfigurationPending,
            topicConfiguration: store.topicReducer.topicConfiguration,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <TopicDetailsBodyComponent
                topicConfiguration={topicConfiguration}
                schemaRegistryCode={schemaRegistryCode}
                isAuthorizedDescribeSubjects={isAuthorizedDescribeSubjects}
            />
            <LoadingSpinner
                isLoading={
                    isGetTopicDetailsPending || isGetTopicConfigurationPending
                }
            />
        </>
    );
};

export default TopicDetailsBody;
