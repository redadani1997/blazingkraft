import { ReduxAction } from 'redux_config/.';
import { QuotaReducerState } from '.';
import quotaTypes from './types';

const initialState: QuotaReducerState = {
    isAlterQuotasPending: false,
    isDescribeQuotasPending: false,
    quotas: [],
};

function quotaReducer(
    state = initialState,
    action: ReduxAction,
): QuotaReducerState {
    switch (action.type) {
        // DESCRIBE_QUOTAS
        case quotaTypes.DESCRIBE_QUOTAS_PENDING:
            return {
                ...state,
                isDescribeQuotasPending: true,
            };
        case quotaTypes.DESCRIBE_QUOTAS_FULFILLED:
            return {
                ...state,
                quotas: action.payload,
                isDescribeQuotasPending: false,
            };
        case quotaTypes.DESCRIBE_QUOTAS_REJECTED:
            return {
                ...state,
                quotas: [],
                isDescribeQuotasPending: false,
            };

        // ALTER_QUOTA
        case quotaTypes.ALTER_QUOTA_PENDING:
            return {
                ...state,
                isAlterQuotasPending: true,
            };
        case quotaTypes.ALTER_QUOTA_FULFILLED:
            return {
                ...state,
                isAlterQuotasPending: false,
            };
        case quotaTypes.ALTER_QUOTA_REJECTED:
            return {
                ...state,
                isAlterQuotasPending: false,
            };
        default:
            return state;
    }
}

export default quotaReducer;
