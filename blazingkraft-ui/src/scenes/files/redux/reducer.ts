import { ReduxAction } from 'redux_config/.';
import { FilesReducerState } from '.';
import filesTypes from './types';

const initialState: FilesReducerState = {
    isCreateFilePending: false,
    isDeleteFilePending: false,
    isGetFilesPending: false,
    files: [],
};

function filesReducer(
    state = initialState,
    action: ReduxAction,
): FilesReducerState {
    switch (action.type) {
        // GET_FILES
        case filesTypes.GET_FILES_PENDING:
            return {
                ...state,
                isGetFilesPending: true,
            };
        case filesTypes.GET_FILES_FULFILLED: {
            return {
                ...state,
                isGetFilesPending: false,
                files: action.payload,
            };
        }
        case filesTypes.GET_FILES_REJECTED:
            return {
                ...state,
                files: [],
                isGetFilesPending: false,
            };

        // CREATE_FILE
        case filesTypes.CREATE_FILE_PENDING:
            return {
                ...state,
                isCreateFilePending: true,
            };
        case filesTypes.CREATE_FILE_FULFILLED: {
            return {
                ...state,
                isCreateFilePending: false,
            };
        }
        case filesTypes.CREATE_FILE_REJECTED:
            return {
                ...state,
                isCreateFilePending: false,
            };

        // DELETE_FILE
        case filesTypes.DELETE_FILE_PENDING:
            return {
                ...state,
                isDeleteFilePending: true,
            };
        case filesTypes.DELETE_FILE_FULFILLED: {
            return {
                ...state,
                isDeleteFilePending: false,
            };
        }
        case filesTypes.DELETE_FILE_REJECTED:
            return {
                ...state,
                isDeleteFilePending: false,
            };

        default:
            return state;
    }
}

export default filesReducer;
