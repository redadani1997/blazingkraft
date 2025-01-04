import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbTablesHeaderComponent from './AllKsqlDbTablesHeaderComponent';

interface AllKsqlDbTablesHeaderProps {
    refreshPageContent: () => void;
}

const AllKsqlDbTablesHeader = ({
    refreshPageContent,
}: AllKsqlDbTablesHeaderProps) => {
    // Map State To Props
    const { ksqlDbTables, isGetAllKsqlDbTablesPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKsqlDbTablesPending:
                    store.ksqlDbEcosystemReducer.isGetAllKsqlDbTablesPending,
                ksqlDbTables: store.ksqlDbEcosystemReducer.ksqlDbTables,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization

    return (
        <AllKsqlDbTablesHeaderComponent
            isRefreshPageContentPending={isGetAllKsqlDbTablesPending}
            refreshPageContent={refreshPageContent}
            ksqlDbTablesLength={ksqlDbTables.length}
        />
    );
};

export default AllKsqlDbTablesHeader;
