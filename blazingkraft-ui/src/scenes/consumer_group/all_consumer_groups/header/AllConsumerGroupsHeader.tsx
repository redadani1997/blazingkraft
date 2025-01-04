import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllConsumerGroupsHeaderComponent from './AllConsumerGroupsHeaderComponent';

interface AllConsumerGroupsHeaderProps {
    refreshPageContent: () => void;
}

const AllConsumerGroupsHeader = ({
    refreshPageContent,
}: AllConsumerGroupsHeaderProps) => {
    // Map State To Props
    const { isListAllConsumerGroupsPending, consumerGroupsListings } =
        useSelector((store: ReduxStore) => {
            return {
                isListAllConsumerGroupsPending:
                    store.consumerGroupReducer.isListAllConsumerGroupsPending,
                consumerGroupsListings:
                    store.consumerGroupReducer.consumerGroupsListings,
            };
        }, shallowEqual);

    return (
        <AllConsumerGroupsHeaderComponent
            isRefreshPageContentPending={isListAllConsumerGroupsPending}
            refreshPageContent={refreshPageContent}
            consumerGroupsLength={consumerGroupsListings.length}
        />
    );
};

export default AllConsumerGroupsHeader;
