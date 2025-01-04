import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbQueriesHeaderComponent from './AllKsqlDbQueriesHeaderComponent';

interface AllKsqlDbQueriesHeaderProps {
    refreshPageContent: () => void;
}

const AllKsqlDbQueriesHeader = ({
    refreshPageContent,
}: AllKsqlDbQueriesHeaderProps) => {
    // Map State To Props
    const { ksqlDbQueries, isGetAllKsqlDbQueriesPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKsqlDbQueriesPending:
                    store.ksqlDbEcosystemReducer.isGetAllKsqlDbQueriesPending,
                ksqlDbQueries: store.ksqlDbEcosystemReducer.ksqlDbQueries,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization

    return (
        <AllKsqlDbQueriesHeaderComponent
            isRefreshPageContentPending={isGetAllKsqlDbQueriesPending}
            refreshPageContent={refreshPageContent}
            ksqlDbQueriesLength={ksqlDbQueries.length}
        />
    );
};

export default AllKsqlDbQueriesHeader;
