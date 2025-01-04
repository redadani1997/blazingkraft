import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbTopicsHeaderComponent from './AllKsqlDbTopicsHeaderComponent';

interface AllKsqlDbTopicsHeaderProps {
    refreshPageContent: () => void;
}

const AllKsqlDbTopicsHeader = ({
    refreshPageContent,
}: AllKsqlDbTopicsHeaderProps) => {
    // Map State To Props
    const { ksqlDbTopics, isGetAllKsqlDbTopicsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKsqlDbTopicsPending:
                    store.ksqlDbEcosystemReducer.isGetAllKsqlDbTopicsPending,
                ksqlDbTopics: store.ksqlDbEcosystemReducer.ksqlDbTopics,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization

    return (
        <AllKsqlDbTopicsHeaderComponent
            isRefreshPageContentPending={isGetAllKsqlDbTopicsPending}
            refreshPageContent={refreshPageContent}
            ksqlDbTopicsLength={ksqlDbTopics.length}
        />
    );
};

export default AllKsqlDbTopicsHeader;
