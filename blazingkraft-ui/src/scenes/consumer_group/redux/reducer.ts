import { ConsumerGroupDescription } from 'common/types/consumer_group';
import { ReduxAction } from 'redux_config/.';
import { ConsumerGroupReducerState } from '.';
import consumerGroupTypes from './types';

const initialState: ConsumerGroupReducerState = {
    consumerGroupsDescriptions: new Map(),
    consumerGroupsListings: [],
    isListAllConsumerGroupsPending: false,
    isDescribeConsumerGroupsPending: false,
    consumerGroupDescription: undefined,
    isDescribeConsumerGroupPending: false,
    isDeleteConsumerGroupPending: false,
    isDeleteMemberPending: false,
};

function consumerGroupReducer(
    state = initialState,
    action: ReduxAction,
): ConsumerGroupReducerState {
    switch (action.type) {
        // GET_ALL_CONSUMER_GROUPS_LISTINGS
        case consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_LISTINGS_PENDING:
            return {
                ...state,
                isListAllConsumerGroupsPending: true,
            };
        case consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_LISTINGS_FULFILLED:
            return {
                ...state,
                consumerGroupsListings: action.payload,
                isListAllConsumerGroupsPending: false,
            };
        case consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_LISTINGS_REJECTED:
            return {
                ...state,
                isListAllConsumerGroupsPending: false,
                consumerGroupsListings: [],
            };

        // GET_CONSUMER_GROUP_DESCRIPTION
        case consumerGroupTypes.GET_CONSUMER_GROUP_DESCRIPTION_PENDING:
            return {
                ...state,
                isDescribeConsumerGroupPending: true,
            };
        case consumerGroupTypes.GET_CONSUMER_GROUP_DESCRIPTION_FULFILLED:
            return {
                ...state,
                consumerGroupDescription: action.payload,
                isDescribeConsumerGroupPending: false,
            };
        case consumerGroupTypes.GET_CONSUMER_GROUP_DESCRIPTION_REJECTED:
            return {
                ...state,
                isDescribeConsumerGroupPending: false,
                consumerGroupDescription: undefined,
            };

        // GET_ALL_CONSUMER_GROUPS_DESCRIPTIONS
        case consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_DESCRIPTIONS_PENDING:
            return {
                ...state,
                isDescribeConsumerGroupsPending: true,
            };
        case consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_DESCRIPTIONS_FULFILLED: {
            return {
                ...state,
                consumerGroupsDescriptions: new Map<
                    string,
                    ConsumerGroupDescription
                >(
                    action.payload.map(
                        (
                            consumerGroupDescription: ConsumerGroupDescription,
                        ) => {
                            const topicPartitions =
                                consumerGroupDescription.members.flatMap(
                                    member => member.assignment.topicPartitions,
                                );
                            return [
                                consumerGroupDescription.groupId,
                                {
                                    ...consumerGroupDescription,
                                    topicPartitions,
                                },
                            ];
                        },
                    ),
                ),
                isDescribeConsumerGroupsPending: false,
            };
        }
        case consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_DESCRIPTIONS_REJECTED:
            return {
                ...state,
                isDescribeConsumerGroupsPending: false,
                consumerGroupsDescriptions: new Map(),
            };

        // DELETE_CONSUMER_GROUP
        case consumerGroupTypes.DELETE_CONSUMER_GROUP_PENDING:
            return {
                ...state,
                isDeleteConsumerGroupPending: true,
            };
        case consumerGroupTypes.DELETE_CONSUMER_GROUP_FULFILLED:
            return {
                ...state,
                isDeleteConsumerGroupPending: false,
            };
        case consumerGroupTypes.DELETE_CONSUMER_GROUP_REJECTED:
            return {
                ...state,
                isDeleteConsumerGroupPending: false,
            };

        // DELETE_MEMBER
        case consumerGroupTypes.DELETE_MEMBER_PENDING:
            return {
                ...state,
                isDeleteMemberPending: true,
            };
        case consumerGroupTypes.DELETE_MEMBER_FULFILLED:
            return {
                ...state,
                isDeleteMemberPending: false,
            };
        case consumerGroupTypes.DELETE_MEMBER_REJECTED:
            return {
                ...state,
                isDeleteMemberPending: false,
            };

        default:
            return state;
    }
}

export default consumerGroupReducer;
