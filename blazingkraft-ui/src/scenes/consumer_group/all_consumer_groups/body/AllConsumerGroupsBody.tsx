import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllConsumerGroupsBodyComponent from './AllConsumerGroupsBodyComponent';

const AllConsumerGroupsBody = () => {
    // Map State To Props
    const { consumerGroupsListings, isListAllConsumerGroupsPending } =
        useSelector((store: ReduxStore) => {
            return {
                isListAllConsumerGroupsPending:
                    store.consumerGroupReducer.isListAllConsumerGroupsPending,
                consumerGroupsListings:
                    store.consumerGroupReducer.consumerGroupsListings,
            };
        }, shallowEqual);
    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    return (
        <AllConsumerGroupsBodyComponent
            isListAllConsumerGroupsPending={isListAllConsumerGroupsPending}
            consumerGroupsListings={consumerGroupsListings}
        />
    );
};

export default AllConsumerGroupsBody;
