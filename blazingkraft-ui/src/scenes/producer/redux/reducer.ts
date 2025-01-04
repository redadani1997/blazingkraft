import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { ProducerReducerState } from '.';
import producerTypes from './types';

const initialState: ProducerReducerState = {
    producerCompleteConfiguration: undefined,
    producerConfiguration: undefined,
    isGetProducerCompleteConfigurationPending: false,
    isGetProducerConfigurationPending: false,
    isProduceBlazingRecordPending: false,
    isEditProducerConfigurationPending: false,
    isImportBlazingRecordsPending: false,
};

function producerReducer(
    state = initialState,
    action: ReduxAction,
): ProducerReducerState {
    switch (action.type) {
        // PRODUCE_BLAZING_RECORD
        case producerTypes.PRODUCE_BLAZING_RECORD_PENDING:
            return {
                ...state,
                isProduceBlazingRecordPending: true,
            };
        case producerTypes.PRODUCE_BLAZING_RECORD_FULFILLED:
        case producerTypes.PRODUCE_BLAZING_RECORD_REJECTED:
            return {
                ...state,
                isProduceBlazingRecordPending: false,
            };
        // EDIT_PRODUCER_CONFIGURATION
        case producerTypes.EDIT_PRODUCER_CONFIGURATION_PENDING:
            return {
                ...state,
                isEditProducerConfigurationPending: true,
            };
        case producerTypes.EDIT_PRODUCER_CONFIGURATION_FULFILLED:
        case producerTypes.EDIT_PRODUCER_CONFIGURATION_REJECTED:
            return {
                ...state,
                isEditProducerConfigurationPending: false,
            };

        // GET_PRODUCER_CONFIGURATION
        case producerTypes.GET_PRODUCER_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetProducerConfigurationPending: true,
            };
        case producerTypes.GET_PRODUCER_CONFIGURATION_FULFILLED:
            return {
                ...state,
                isGetProducerConfigurationPending: false,
                producerConfiguration: {
                    ...action.payload,
                    valueSerializerConfiguration: CommonUtils.objectToMap(
                        action.payload.valueSerializerConfiguration || {},
                    ),
                    keySerializerConfiguration: CommonUtils.objectToMap(
                        action.payload.keySerializerConfiguration || {},
                    ),
                },
            };
        case producerTypes.GET_PRODUCER_CONFIGURATION_REJECTED:
            return {
                ...state,
                isGetProducerConfigurationPending: false,
                producerConfiguration: undefined,
            };

        // GET_PRODUCER_COMPLETE_CONFIGURATION
        case producerTypes.GET_PRODUCER_COMPLETE_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetProducerCompleteConfigurationPending: true,
            };
        case producerTypes.GET_PRODUCER_COMPLETE_CONFIGURATION_FULFILLED:
            return {
                ...state,
                isGetProducerCompleteConfigurationPending: false,
                producerCompleteConfiguration: {
                    ...action.payload,
                    valueSerializerConfiguration: CommonUtils.objectToMap(
                        action.payload.valueSerializerConfiguration || {},
                    ),
                    keySerializerConfiguration: CommonUtils.objectToMap(
                        action.payload.keySerializerConfiguration,
                    ),
                    commonConfiguration: CommonUtils.objectToMap(
                        action.payload.commonConfiguration || {},
                    ),
                    mainConfiguration: CommonUtils.objectToMap(
                        action.payload.mainConfiguration || {},
                    ),
                },
            };
        case producerTypes.GET_PRODUCER_COMPLETE_CONFIGURATION_REJECTED:
            return {
                ...state,
                isGetProducerCompleteConfigurationPending: false,
                producerCompleteConfiguration: undefined,
            };

        // IMPORT_BLAZING_RECORDS
        case producerTypes.IMPORT_BLAZING_RECORDS_PENDING:
            return {
                ...state,
                isImportBlazingRecordsPending: true,
            };
        case producerTypes.IMPORT_BLAZING_RECORDS_FULFILLED:
        case producerTypes.IMPORT_BLAZING_RECORDS_REJECTED:
            return {
                ...state,
                isImportBlazingRecordsPending: false,
            };
        default:
            return state;
    }
}

export default producerReducer;
