import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { KafkaConnectReducerState } from '.';
import kafkaConnectTypes from './types';

const initialState: KafkaConnectReducerState = {
    kafkaConnects: [],
    kafkaConnectDetails: null,
    kafkaConnectsDescriptions: new Map(),
    isGetAllKafkaConnectsPending: false,
    isCreateKafkaConnectPending: false,
    kafkaConnectMonitoring: {},
    isTestKafkaConnectClientConnectivityPending: false,
    isTestKafkaConnectJmxConnectivityPending: false,
    isDeleteKafkaConnectPending: false,
    isEditKafkaConnectPending: false,
    isGetKafkaConnectDetailsPending: false,
    isMonitorKafkaConnectPending: false,
    isGetKafkaConnectsDescriptionsPending: new Map(),
};

function kafkaConnectReducer(
    state = initialState,
    action: ReduxAction,
): KafkaConnectReducerState {
    switch (action.type) {
        // TEST_KAFKA_CONNECT_CLIENT_CONNECTIVITY
        case kafkaConnectTypes.TEST_KAFKA_CONNECT_CLIENT_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestKafkaConnectClientConnectivityPending: true,
            };
        case kafkaConnectTypes.TEST_KAFKA_CONNECT_CLIENT_CONNECTIVITY_FULFILLED:
        case kafkaConnectTypes.TEST_KAFKA_CONNECT_CLIENT_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestKafkaConnectClientConnectivityPending: false,
            };

        // TEST_KAFKA_CONNECT_JMX_CONNECTIVITY
        case kafkaConnectTypes.TEST_KAFKA_CONNECT_JMX_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestKafkaConnectJmxConnectivityPending: true,
            };
        case kafkaConnectTypes.TEST_KAFKA_CONNECT_JMX_CONNECTIVITY_FULFILLED:
        case kafkaConnectTypes.TEST_KAFKA_CONNECT_JMX_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestKafkaConnectJmxConnectivityPending: false,
            };

        // CREATE_KAFKA_CONNECT
        case kafkaConnectTypes.CREATE_KAFKA_CONNECT_PENDING:
            return {
                ...state,
                isCreateKafkaConnectPending: true,
            };
        case kafkaConnectTypes.CREATE_KAFKA_CONNECT_FULFILLED:
        case kafkaConnectTypes.CREATE_KAFKA_CONNECT_REJECTED:
            return {
                ...state,
                isCreateKafkaConnectPending: false,
            };

        // GET_ALL_KAFKA_CONNECTS
        case kafkaConnectTypes.GET_ALL_KAFKA_CONNECTS_PENDING:
            return {
                ...state,
                isGetAllKafkaConnectsPending: true,
            };
        case kafkaConnectTypes.GET_ALL_KAFKA_CONNECTS_FULFILLED:
            return {
                ...state,
                kafkaConnects: action.payload,
                isGetAllKafkaConnectsPending: false,
            };
        case kafkaConnectTypes.GET_ALL_KAFKA_CONNECTS_REJECTED:
            return {
                ...state,
                isGetAllKafkaConnectsPending: false,
                kafkaConnects: [],
            };

        // GET_KAFKA_CONNECT_DETAILS
        case kafkaConnectTypes.GET_KAFKA_CONNECT_DETAILS_PENDING:
            return {
                ...state,
                isGetKafkaConnectDetailsPending: true,
            };
        case kafkaConnectTypes.GET_KAFKA_CONNECT_DETAILS_FULFILLED:
            return {
                ...state,
                kafkaConnectDetails: action.payload,
                isGetKafkaConnectDetailsPending: false,
            };
        case kafkaConnectTypes.GET_KAFKA_CONNECT_DETAILS_REJECTED:
            return {
                ...state,
                isGetKafkaConnectDetailsPending: false,
                kafkaConnectDetails: null,
            };

        // DELETE_KAFKA_CONNECT
        case kafkaConnectTypes.DELETE_KAFKA_CONNECT_PENDING:
            return {
                ...state,
                isDeleteKafkaConnectPending: true,
            };
        case kafkaConnectTypes.DELETE_KAFKA_CONNECT_FULFILLED:
        case kafkaConnectTypes.DELETE_KAFKA_CONNECT_REJECTED:
            return {
                ...state,
                isDeleteKafkaConnectPending: false,
            };

        // EDIT_KAFKA_CONNECT
        case kafkaConnectTypes.EDIT_KAFKA_CONNECT_PENDING:
            return {
                ...state,
                isEditKafkaConnectPending: true,
            };
        case kafkaConnectTypes.EDIT_KAFKA_CONNECT_FULFILLED:
        case kafkaConnectTypes.EDIT_KAFKA_CONNECT_REJECTED:
            return {
                ...state,
                isEditKafkaConnectPending: false,
            };

        // DESCRIBE_KAFKA_CONNECT
        case kafkaConnectTypes.DESCRIBE_KAFKA_CONNECT_PENDING: {
            const newPendingMap = new Map(
                state.isGetKafkaConnectsDescriptionsPending,
            );
            newPendingMap.set(action.meta.kafkaConnectCode, true);
            return {
                ...state,
                isGetKafkaConnectsDescriptionsPending: newPendingMap,
            };
        }
        case kafkaConnectTypes.DESCRIBE_KAFKA_CONNECT_FULFILLED: {
            const newPendingMap = new Map(
                state.isGetKafkaConnectsDescriptionsPending,
            );
            const newDescMap = new Map(state.kafkaConnectsDescriptions);

            newPendingMap.set(action.meta.kafkaConnectCode, false);
            newDescMap.set(action.meta.kafkaConnectCode, {
                ...action.payload,
                succeeded: true,
            });
            return {
                ...state,
                isGetKafkaConnectsDescriptionsPending: newPendingMap,
                kafkaConnectsDescriptions: newDescMap,
            };
        }
        case kafkaConnectTypes.DESCRIBE_KAFKA_CONNECT_REJECTED: {
            const newPendingMap = new Map(
                state.isGetKafkaConnectsDescriptionsPending,
            );
            const newDescMap = new Map(state.kafkaConnectsDescriptions);

            newPendingMap.set(action.meta.kafkaConnectCode, false);
            newDescMap.set(action.meta.kafkaConnectCode, {
                succeeded: false,
                errorMessage: CommonUtils.getRestErrorMessage(action.payload),
            });
            return {
                ...state,
                isGetKafkaConnectsDescriptionsPending: newPendingMap,
                kafkaConnectsDescriptions: newDescMap,
            };
        }

        // MONITOR_KAFKA_CONNECT
        case kafkaConnectTypes.MONITOR_KAFKA_CONNECT_PENDING:
            return {
                ...state,
                isMonitorKafkaConnectPending: true,
            };
        case kafkaConnectTypes.MONITOR_KAFKA_CONNECT_FULFILLED:
            return {
                ...state,
                kafkaConnectMonitoring: action.payload,
                isMonitorKafkaConnectPending: false,
            };
        case kafkaConnectTypes.MONITOR_KAFKA_CONNECT_REJECTED:
            return {
                ...state,
                kafkaConnectMonitoring: {},
                isMonitorKafkaConnectPending: false,
            };

        default:
            return state;
    }
}

export default kafkaConnectReducer;
