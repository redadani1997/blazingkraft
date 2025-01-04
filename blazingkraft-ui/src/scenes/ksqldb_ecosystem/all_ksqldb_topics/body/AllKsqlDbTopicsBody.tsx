import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllKsqlDbTopicsBodyComponent from './AllKsqlDbTopicsBodyComponent';

const AllKsqlDbTopicsBody = () => {
    // Map State To Props
    const { isGetAllKsqlDbTopicsPending, ksqlDbTopics } = useSelector(
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
        <AllKsqlDbTopicsBodyComponent
            isGetAllKsqlDbTopicsPending={isGetAllKsqlDbTopicsPending}
            ksqlDbTopics={ksqlDbTopics}
        />
    );
};

export default AllKsqlDbTopicsBody;
