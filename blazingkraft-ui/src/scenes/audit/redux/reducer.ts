import { ReduxAction } from 'redux_config/index';
import { AuditLogReducerState } from '.';
import auditLogTypes from './types';

const initialState: AuditLogReducerState = {
    auditLog: {
        data: [],
        paging: {
            page: 0,
            size: 100,
            totalElements: 0,
        },
    },
    isSearchAuditLogPending: false,
};

function auditLogReducer(
    state = initialState,
    action: ReduxAction,
): AuditLogReducerState {
    switch (action.type) {
        // SEARCH_AUDIT_LOG
        case auditLogTypes.SEARCH_AUDIT_LOG_PENDING:
            return {
                ...state,
                isSearchAuditLogPending: true,
            };
        case auditLogTypes.SEARCH_AUDIT_LOG_FULFILLED:
            return {
                ...state,
                auditLog: action.payload || initialState.auditLog,
                isSearchAuditLogPending: false,
            };
        case auditLogTypes.SEARCH_AUDIT_LOG_REJECTED:
            return {
                ...state,
                auditLog: initialState.auditLog,
                isSearchAuditLogPending: false,
            };

        // CLEAR_AUDIT_LOG
        case auditLogTypes.CLEAR_AUDIT_LOG:
            return initialState;

        default:
            return state;
    }
}

export default auditLogReducer;
