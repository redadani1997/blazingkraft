import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbStreamsBodyComponent from './AllKsqlDbStreamsBodyComponent';

const AllKsqlDbStreamsBody = () => {
    // Map State To Props
    const { isGetAllKsqlDbStreamsPending, ksqlDbStreams } = useSelector(
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
        <AllKsqlDbStreamsBodyComponent
            isGetAllKsqlDbStreamsPending={isGetAllKsqlDbStreamsPending}
            ksqlDbStreams={ksqlDbStreams}
        />
    );
};

export default AllKsqlDbStreamsBody;
