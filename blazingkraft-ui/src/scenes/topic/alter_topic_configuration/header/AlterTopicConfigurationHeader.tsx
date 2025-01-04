import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AlterTopicConfigurationHeaderComponent from './AlterTopicConfigurationHeaderComponent';

interface AlterTopicConfigurationHeaderProps {
    refreshPageContent: () => void;
}

const AlterTopicConfigurationHeader = ({
    refreshPageContent,
}: AlterTopicConfigurationHeaderProps) => {
    // Map State To Props
    const { isGetTopicConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetTopicConfigurationPending:
                    store.topicReducer.isGetTopicConfigurationPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    return (
        <AlterTopicConfigurationHeaderComponent
            isRefreshPageContentPending={isGetTopicConfigurationPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default AlterTopicConfigurationHeader;
