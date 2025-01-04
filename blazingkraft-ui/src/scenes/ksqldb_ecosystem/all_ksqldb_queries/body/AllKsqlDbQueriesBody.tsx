import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbQueriesBodyComponent from './AllKsqlDbQueriesBodyComponent';

const AllKsqlDbQueriesBody = () => {
    // Map State To Props
    const { isGetAllKsqlDbQueriesPending, ksqlDbQueries } = useSelector(
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
        <AllKsqlDbQueriesBodyComponent
            isGetAllKsqlDbQueriesPending={isGetAllKsqlDbQueriesPending}
            ksqlDbQueries={ksqlDbQueries}
        />
    );
};

export default AllKsqlDbQueriesBody;
