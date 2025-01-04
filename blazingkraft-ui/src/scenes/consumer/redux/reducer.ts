import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { ConsumerReducerState } from '.';
import consumerTypes from './types';

const initialState: ConsumerReducerState = {
    consumerCompleteConfiguration: undefined,
    consumerConfiguration: undefined,
    isGetConsumerCompleteConfigurationPending: false,
    isGetConsumerConfigurationPending: false,
    isEditConsumerConfigurationPending: false,
    isExportConsumerRecordsPending: false,
};

function consumerReducer(
    state = initialState,
    action: ReduxAction,
): ConsumerReducerState {
    switch (action.type) {
        // EDIT_CONSUMER_CONFIGURATION
        case consumerTypes.EDIT_CONSUMER_CONFIGURATION_PENDING:
            return {
                ...state,
                isEditConsumerConfigurationPending: true,
            };
        case consumerTypes.EDIT_CONSUMER_CONFIGURATION_FULFILLED:
        case consumerTypes.EDIT_CONSUMER_CONFIGURATION_REJECTED:
            return {
                ...state,
                isEditConsumerConfigurationPending: false,
            };
        // GET_CONSUMER_CONFIGURATION
        case consumerTypes.GET_CONSUMER_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetConsumerConfigurationPending: true,
            };
        case consumerTypes.GET_CONSUMER_CONFIGURATION_FULFILLED:
            return {
                ...state,
                isGetConsumerConfigurationPending: false,
                consumerConfiguration: {
                    ...action.payload,
                    valueDeserializerConfiguration: CommonUtils.objectToMap(
                        action.payload.valueDeserializerConfiguration || {},
                    ),
                    keyDeserializerConfiguration: CommonUtils.objectToMap(
                        action.payload.keyDeserializerConfiguration || {},
                    ),
                },
            };
        case consumerTypes.GET_CONSUMER_CONFIGURATION_REJECTED:
            return {
                ...state,
                isGetConsumerConfigurationPending: false,
                consumerConfiguration: undefined,
            };

        // GET_CONSUMER_COMPLETE_CONFIGURATION
        case consumerTypes.GET_CONSUMER_COMPLETE_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetConsumerCompleteConfigurationPending: true,
            };
        case consumerTypes.GET_CONSUMER_COMPLETE_CONFIGURATION_FULFILLED:
            return {
                ...state,
                isGetConsumerCompleteConfigurationPending: false,
                consumerCompleteConfiguration: {
                    ...action.payload,
                    valueDeserializerConfiguration: CommonUtils.objectToMap(
                        action.payload.valueDeserializerConfiguration || {},
                    ),
                    keyDeserializerConfiguration: CommonUtils.objectToMap(
                        action.payload.keyDeserializerConfiguration,
                    ),
                    commonConfiguration: CommonUtils.objectToMap(
                        action.payload.commonConfiguration || {},
                    ),
                    mainConfiguration: CommonUtils.objectToMap(
                        action.payload.mainConfiguration || {},
                    ),
                },
            };
        case consumerTypes.GET_CONSUMER_COMPLETE_CONFIGURATION_REJECTED:
            return {
                ...state,
                isGetConsumerCompleteConfigurationPending: false,
                consumerCompleteConfiguration: undefined,
            };

        // EXPORT_CONSUMER_RECORDS
        case consumerTypes.EXPORT_CONSUMER_RECORDS_PENDING:
            return {
                ...state,
                isExportConsumerRecordsPending: true,
            };
        case consumerTypes.EXPORT_CONSUMER_RECORDS_FULFILLED:
        case consumerTypes.EXPORT_CONSUMER_RECORDS_REJECTED:
            return {
                ...state,
                isExportConsumerRecordsPending: false,
            };

        default:
            return state;
    }
}

export default consumerReducer;
