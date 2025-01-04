import { DELETE, GET, POST } from 'rest/RestCalls';
import consumerGroupTypes from './types';

function listAllConsumerGroups(clusterCode) {
    return {
        type: consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_LISTINGS,
        payload: GET('/admin/consumer-groups/listings', {
            headers: { clusterCode },
        }),
        meta: { context: 'Consumer Groups' },
    };
}

function describeConsumerGroups(consumerGroups: string[], clusterCode) {
    return {
        type: consumerGroupTypes.GET_ALL_CONSUMER_GROUPS_DESCRIPTIONS,
        payload: POST(
            '/admin/consumer-groups/descriptions',
            { consumerGroups },
            { headers: { clusterCode } },
        ),
        meta: {
            context: 'Consumer Groups',
            concurrencyIdentifier: clusterCode,
        },
    };
}

function describeConsumerGroup(consumerGroup: string, clusterCode) {
    return {
        type: consumerGroupTypes.GET_CONSUMER_GROUP_DESCRIPTION,
        payload: GET(`/admin/consumer-groups/descriptions/${consumerGroup}`, {
            headers: { clusterCode },
            params: { includeAuthorizedOperations: true },
        }),
        meta: { context: 'Consumer Groups' },
    };
}

function deleteConsumerGroup(consumerGroup, clusterCode) {
    return {
        type: consumerGroupTypes.DELETE_CONSUMER_GROUP,
        payload: DELETE(`/admin/consumer-groups/${consumerGroup}`, {
            headers: { clusterCode },
        }),
        meta: { context: 'Consumer Groups', consumerGroup },
    };
}

function removeConsumerGroupMember(consumerGroup, memberId, clusterCode) {
    return {
        type: consumerGroupTypes.DELETE_MEMBER,
        payload: DELETE(
            `/admin/consumer-groups/${consumerGroup}/members/${memberId}`,
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Consumer Group Member', consumerGroup, memberId },
    };
}
const consumerGroupActions = {
    listAllConsumerGroups,
    describeConsumerGroups,
    describeConsumerGroup,
    deleteConsumerGroup,
    removeConsumerGroupMember,
};

export default consumerGroupActions;
