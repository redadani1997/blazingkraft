import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbTablesBodyComponent from './AllKsqlDbTablesBodyComponent';

const AllKsqlDbTablesBody = () => {
    // Map State To Props
    const { isGetAllKsqlDbTablesPending, ksqlDbTables } = useSelector(
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
        <AllKsqlDbTablesBodyComponent
            isGetAllKsqlDbTablesPending={isGetAllKsqlDbTablesPending}
            ksqlDbTables={ksqlDbTables}
        />
    );
};

export default AllKsqlDbTablesBody;
