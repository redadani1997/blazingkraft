import {
    ConsumerGroupDescription,
    ConsumerGroupListing,
} from 'common/types/consumer_group';

export type ConsumerGroupReducerState = {
    consumerGroupsListings: ConsumerGroupListing[];
    consumerGroupsDescriptions: Map<string, ConsumerGroupDescription>;
    consumerGroupDescription: ConsumerGroupDescription | undefined;
    isListAllConsumerGroupsPending: boolean;
    isDescribeConsumerGroupsPending: boolean;
    isDescribeConsumerGroupPending: boolean;
    isDeleteConsumerGroupPending: boolean;
    isDeleteMemberPending: boolean;
};
