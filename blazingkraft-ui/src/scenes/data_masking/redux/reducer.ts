import { ReduxAction } from 'redux_config/.';
import { DataMaskingReducerState } from '.';
import dataMaskingTypes from './types';

const initialState: DataMaskingReducerState = {
    dataMaskings: [],
    isGetAllDataMaskingsPending: false,
    isCreateDataMaskingPending: false,
    isDeleteDataMaskingPending: false,
    isEditDataMaskingPending: false,
};

function dataMaskingReducer(
    state = initialState,
    action: ReduxAction,
): DataMaskingReducerState {
    switch (action.type) {
        // CREATE_DATA_MASKING
        case dataMaskingTypes.CREATE_DATA_MASKING_PENDING:
            return {
                ...state,
                isCreateDataMaskingPending: true,
            };
        case dataMaskingTypes.CREATE_DATA_MASKING_FULFILLED:
        case dataMaskingTypes.CREATE_DATA_MASKING_REJECTED:
            return {
                ...state,
                isCreateDataMaskingPending: false,
            };

        // GET_ALL_DATA_MASKINGS
        case dataMaskingTypes.GET_ALL_DATA_MASKINGS_PENDING:
            return {
                ...state,
                isGetAllDataMaskingsPending: true,
            };
        case dataMaskingTypes.GET_ALL_DATA_MASKINGS_FULFILLED:
            return {
                ...state,
                dataMaskings: action.payload,
                isGetAllDataMaskingsPending: false,
            };
        case dataMaskingTypes.GET_ALL_DATA_MASKINGS_REJECTED:
            return {
                ...state,
                isGetAllDataMaskingsPending: false,
                dataMaskings: [],
            };

        // DELETE_DATA_MASKING
        case dataMaskingTypes.DELETE_DATA_MASKING_PENDING:
            return {
                ...state,
                isDeleteDataMaskingPending: true,
            };
        case dataMaskingTypes.DELETE_DATA_MASKING_FULFILLED:
        case dataMaskingTypes.DELETE_DATA_MASKING_REJECTED:
            return {
                ...state,
                isDeleteDataMaskingPending: false,
            };

        // EDIT_DATA_MASKING
        case dataMaskingTypes.EDIT_DATA_MASKING_PENDING:
            return {
                ...state,
                isEditDataMaskingPending: true,
            };
        case dataMaskingTypes.EDIT_DATA_MASKING_FULFILLED:
        case dataMaskingTypes.EDIT_DATA_MASKING_REJECTED:
            return {
                ...state,
                isEditDataMaskingPending: false,
            };

        default:
            return state;
    }
}

export default dataMaskingReducer;
