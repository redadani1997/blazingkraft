import { KafkaPrincipal } from 'common/types/delegation_token';
import { POST, PUT } from 'rest/RestCalls';
import delegationTokenTypes from './types';

function describeDelegationTokens(clusterCode) {
    return {
        type: delegationTokenTypes.DESCRIBE_DELEGATION_TOKENS,
        payload: POST(
            '/admin/delegation-tokens/describe',
            { owners: null },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Delegation Tokens' },
    };
}

function renewDelegationToken(hmac, renewTimePeriodMs, clusterCode) {
    return {
        type: delegationTokenTypes.RENEW_DELEGATION_TOKEN,
        payload: PUT(
            '/admin/delegation-tokens/renew',
            { hmac, renewTimePeriodMs },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Delegation Tokens' },
    };
}

function expireDelegationToken(hmac, expiryTimePeriodMs, clusterCode) {
    return {
        type: delegationTokenTypes.EXPIRE_DELEGATION_TOKEN,
        payload: PUT(
            '/admin/delegation-tokens/expire',
            { hmac, expiryTimePeriodMs },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Delegation Tokens' },
    };
}
function createDelegationToken(
    owner: KafkaPrincipal,
    renewers: KafkaPrincipal[],
    maxLifeTimeMs,
    clusterCode,
) {
    return {
        type: delegationTokenTypes.CREATE_DELEGATION_TOKEN,
        payload: POST(
            '/admin/delegation-tokens/create',
            { owner, renewers, maxLifeTimeMs },
            {
                headers: { clusterCode },
            },
        ),
        meta: { context: 'Delegation Tokens' },
    };
}

const delegationTokenActions = {
    createDelegationToken,
    describeDelegationTokens,
    renewDelegationToken,
    expireDelegationToken,
};

export default delegationTokenActions;
