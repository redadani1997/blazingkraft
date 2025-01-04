import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ConsumerGroupMetadataComponent from './ConsumerGroupMetadataComponent';

const ConsumerGroupMetadata = () => {
    // Map State To Props
    const { consumerGroupDescription, isDescribeConsumerGroupPending } =
        useSelector((store: ReduxStore) => {
            return {
                consumerGroupDescription:
                    store.consumerGroupReducer.consumerGroupDescription,
                isDescribeConsumerGroupPending:
                    store.consumerGroupReducer.isDescribeConsumerGroupPending,
            };
        }, shallowEqual);

    // Map Dispatch To Props

    return (
        <ConsumerGroupMetadataComponent
            consumerGroupDescription={consumerGroupDescription}
            isDescribeConsumerGroupPending={isDescribeConsumerGroupPending}
        />
    );
};

export default ConsumerGroupMetadata;
