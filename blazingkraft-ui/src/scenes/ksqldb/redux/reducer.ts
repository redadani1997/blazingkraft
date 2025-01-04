import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { KsqlDbReducerState } from '.';
import ksqlDbTypes from './types';

const initialState: KsqlDbReducerState = {
    ksqlDbs: [],
    ksqlDbDetails: null,
    ksqlDbsDescriptions: new Map(),
    ksqlDbMonitoring: {},
    isGetAllKsqlDbsPending: false,
    isCreateKsqlDbPending: false,
    isTestKsqlDbClientConnectivityPending: false,
    isTestKsqlDbJmxConnectivityPending: false,
    isDeleteKsqlDbPending: false,
    isEditKsqlDbPending: false,
    isGetKsqlDbDetailsPending: false,
    isMonitorKsqlDbPending: false,
    isGetKsqlDbsDescriptionsPending: new Map(),
};

function ksqlDbReducer(
    state = initialState,
    action: ReduxAction,
): KsqlDbReducerState {
    switch (action.type) {
        // TEST_KSQLDB_CLIENT_CONNECTIVITY
        case ksqlDbTypes.TEST_KSQLDB_CLIENT_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestKsqlDbClientConnectivityPending: true,
            };
        case ksqlDbTypes.TEST_KSQLDB_CLIENT_CONNECTIVITY_FULFILLED:
        case ksqlDbTypes.TEST_KSQLDB_CLIENT_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestKsqlDbClientConnectivityPending: false,
            };

        // TEST_KSQLDB_JMX_CONNECTIVITY
        case ksqlDbTypes.TEST_KSQLDB_JMX_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestKsqlDbJmxConnectivityPending: true,
            };
        case ksqlDbTypes.TEST_KSQLDB_JMX_CONNECTIVITY_FULFILLED:
        case ksqlDbTypes.TEST_KSQLDB_JMX_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestKsqlDbJmxConnectivityPending: false,
            };

        // CREATE_KSQLDB
        case ksqlDbTypes.CREATE_KSQLDB_PENDING:
            return {
                ...state,
                isCreateKsqlDbPending: true,
            };
        case ksqlDbTypes.CREATE_KSQLDB_FULFILLED:
        case ksqlDbTypes.CREATE_KSQLDB_REJECTED:
            return {
                ...state,
                isCreateKsqlDbPending: false,
            };

        // GET_ALL_KSQLDBS
        case ksqlDbTypes.GET_ALL_KSQLDBS_PENDING:
            return {
                ...state,
                isGetAllKsqlDbsPending: true,
            };
        case ksqlDbTypes.GET_ALL_KSQLDBS_FULFILLED:
            return {
                ...state,
                ksqlDbs: action.payload,
                isGetAllKsqlDbsPending: false,
            };
        case ksqlDbTypes.GET_ALL_KSQLDBS_REJECTED:
            return {
                ...state,
                isGetAllKsqlDbsPending: false,
                ksqlDbs: [],
            };

        // GET_KSQLDB_DETAILS
        case ksqlDbTypes.GET_KSQLDB_DETAILS_PENDING:
            return {
                ...state,
                isGetKsqlDbDetailsPending: true,
            };
        case ksqlDbTypes.GET_KSQLDB_DETAILS_FULFILLED:
            return {
                ...state,
                ksqlDbDetails: action.payload,
                isGetKsqlDbDetailsPending: false,
            };
        case ksqlDbTypes.GET_KSQLDB_DETAILS_REJECTED:
            return {
                ...state,
                isGetKsqlDbDetailsPending: false,
                ksqlDbDetails: null,
            };

        // DELETE_KSQLDB
        case ksqlDbTypes.DELETE_KSQLDB_PENDING:
            return {
                ...state,
                isDeleteKsqlDbPending: true,
            };
        case ksqlDbTypes.DELETE_KSQLDB_FULFILLED:
        case ksqlDbTypes.DELETE_KSQLDB_REJECTED:
            return {
                ...state,
                isDeleteKsqlDbPending: false,
            };

        // EDIT_KSQLDB
        case ksqlDbTypes.EDIT_KSQLDB_PENDING:
            return {
                ...state,
                isEditKsqlDbPending: true,
            };
        case ksqlDbTypes.EDIT_KSQLDB_FULFILLED:
        case ksqlDbTypes.EDIT_KSQLDB_REJECTED:
            return {
                ...state,
                isEditKsqlDbPending: false,
            };

        // GET_KSQLDB_DESCRIPTION
        case ksqlDbTypes.GET_KSQLDB_DESCRIPTION_PENDING: {
            const newPendingMap = new Map(
                state.isGetKsqlDbsDescriptionsPending,
            );
            newPendingMap.set(action.meta.ksqlDbCode, true);
            return {
                ...state,
                isGetKsqlDbsDescriptionsPending: newPendingMap,
            };
        }
        case ksqlDbTypes.GET_KSQLDB_DESCRIPTION_FULFILLED: {
            const newPendingMap = new Map(
                state.isGetKsqlDbsDescriptionsPending,
            );
            const newDescMap = new Map(state.ksqlDbsDescriptions);
            newDescMap.set(action.meta.ksqlDbCode, {
                ...action.payload,
                succeeded: true,
            });
            newPendingMap.set(action.meta.ksqlDbCode, false);
            return {
                ...state,
                isGetKsqlDbsDescriptionsPending: newPendingMap,
                ksqlDbsDescriptions: newDescMap,
            };
        }
        case ksqlDbTypes.GET_KSQLDB_DESCRIPTION_REJECTED: {
            const newPendingMap = new Map(
                state.isGetKsqlDbsDescriptionsPending,
            );
            const newDescMap = new Map(state.ksqlDbsDescriptions);
            newDescMap.set(action.meta.ksqlDbCode, {
                succeeded: false,
                errorMessage: CommonUtils.getRestErrorMessage(action.payload),
            });
            newPendingMap.set(action.meta.ksqlDbCode, false);
            return {
                ...state,
                isGetKsqlDbsDescriptionsPending: newPendingMap,
                ksqlDbsDescriptions: newDescMap,
            };
        }

        // MONITOR_KSQLDB
        case ksqlDbTypes.MONITOR_KSQLDB_PENDING:
            return {
                ...state,
                isMonitorKsqlDbPending: true,
            };
        case ksqlDbTypes.MONITOR_KSQLDB_FULFILLED:
            return {
                ...state,
                ksqlDbMonitoring: action.payload,
                isMonitorKsqlDbPending: false,
            };
        case ksqlDbTypes.MONITOR_KSQLDB_REJECTED:
            return {
                ...state,
                ksqlDbMonitoring: {},
                isMonitorKsqlDbPending: false,
            };

        default:
            return state;
    }
}

export default ksqlDbReducer;
