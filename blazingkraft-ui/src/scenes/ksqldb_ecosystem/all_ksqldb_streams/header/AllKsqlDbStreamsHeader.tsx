import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbStreamsHeaderComponent from './AllKsqlDbStreamsHeaderComponent';

interface AllKsqlDbStreamsHeaderProps {
    refreshPageContent: () => void;
}

const AllKsqlDbStreamsHeader = ({
    refreshPageContent,
}: AllKsqlDbStreamsHeaderProps) => {
    // Map State To Props
    const { ksqlDbStreams, isGetAllKsqlDbStreamsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKsqlDbStreamsPending:
                    store.ksqlDbEcosystemReducer.isGetAllKsqlDbStreamsPending,
                ksqlDbStreams: store.ksqlDbEcosystemReducer.ksqlDbStreams,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization

    return (
        <AllKsqlDbStreamsHeaderComponent
            isRefreshPageContentPending={isGetAllKsqlDbStreamsPending}
            refreshPageContent={refreshPageContent}
            ksqlDbStreamsLength={ksqlDbStreams.length}
        />
    );
};

export default AllKsqlDbStreamsHeader;
