import { ReduxAction } from 'redux_config/.';
import { DelegationTokenReducerState } from '.';
import delegationTokenTypes from './types';

const initialState: DelegationTokenReducerState = {
    delegationTokens: [],
    isDescribeDelegationTokensPending: false,
    isCreateDelegationTokenPending: false,
    isRenewDelegationTokenPending: false,
    isExpireDelegationTokenPending: false,
};

function delegationTokenReducer(
    state = initialState,
    action: ReduxAction,
): DelegationTokenReducerState {
    switch (action.type) {
        // DESCRIBE_DELEGATION_TOKENS
        case delegationTokenTypes.DESCRIBE_DELEGATION_TOKENS_PENDING:
            return {
                ...state,
                isDescribeDelegationTokensPending: true,
            };
        case delegationTokenTypes.DESCRIBE_DELEGATION_TOKENS_FULFILLED:
            return {
                ...state,
                delegationTokens: action.payload,
                isDescribeDelegationTokensPending: false,
            };
        case delegationTokenTypes.DESCRIBE_DELEGATION_TOKENS_REJECTED:
            return {
                ...state,
                delegationTokens: [],
                isDescribeDelegationTokensPending: false,
            };

        // CREATE_DELEGATION_TOKEN
        case delegationTokenTypes.CREATE_DELEGATION_TOKEN_PENDING:
            return {
                ...state,
                isCreateDelegationTokenPending: true,
            };
        case delegationTokenTypes.CREATE_DELEGATION_TOKEN_FULFILLED:
            return {
                ...state,
                isCreateDelegationTokenPending: false,
            };
        case delegationTokenTypes.CREATE_DELEGATION_TOKEN_REJECTED:
            return {
                ...state,
                isCreateDelegationTokenPending: false,
            };

        // EXPIRE_DELEGATION_TOKEN
        case delegationTokenTypes.EXPIRE_DELEGATION_TOKEN_PENDING:
            return {
                ...state,
                isExpireDelegationTokenPending: true,
            };
        case delegationTokenTypes.EXPIRE_DELEGATION_TOKEN_FULFILLED:
            return {
                ...state,
                isExpireDelegationTokenPending: false,
            };
        case delegationTokenTypes.EXPIRE_DELEGATION_TOKEN_REJECTED:
            return {
                ...state,
                isExpireDelegationTokenPending: false,
            };

        // RENEW_DELEGATION_TOKEN
        case delegationTokenTypes.RENEW_DELEGATION_TOKEN_PENDING:
            return {
                ...state,
                isRenewDelegationTokenPending: true,
            };
        case delegationTokenTypes.RENEW_DELEGATION_TOKEN_FULFILLED:
            return {
                ...state,
                isRenewDelegationTokenPending: false,
            };
        case delegationTokenTypes.RENEW_DELEGATION_TOKEN_REJECTED:
            return {
                ...state,
                isRenewDelegationTokenPending: false,
            };
        default:
            return state;
    }
}

export default delegationTokenReducer;
