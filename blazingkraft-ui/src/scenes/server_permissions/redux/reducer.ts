import { ReduxAction } from 'redux_config/.';
import { ServerPermissionsReducerState } from '.';
import serverPermissionsTypes from './types';

const initialState: ServerPermissionsReducerState = {
    isEditServerPermissionsPending: false,
    isGetServerPermissionsPending: false,
};

function serverPermissionsReducer(
    state = initialState,
    action: ReduxAction,
): ServerPermissionsReducerState {
    switch (action.type) {
        // GET_SERVER_PERMISSIONS
        case serverPermissionsTypes.GET_SERVER_PERMISSIONS_PENDING:
            return {
                ...state,
                isGetServerPermissionsPending: true,
            };
        case serverPermissionsTypes.GET_SERVER_PERMISSIONS_FULFILLED: {
            return {
                ...state,
                isGetServerPermissionsPending: false,
            };
        }
        case serverPermissionsTypes.GET_SERVER_PERMISSIONS_REJECTED:
            return {
                ...state,
                isGetServerPermissionsPending: false,
            };

        // EDIT_SERVER_PERMISSIONS
        case serverPermissionsTypes.EDIT_SERVER_PERMISSIONS_PENDING:
            return {
                ...state,
                isEditServerPermissionsPending: true,
            };
        case serverPermissionsTypes.EDIT_SERVER_PERMISSIONS_FULFILLED:
            return {
                ...state,
                isEditServerPermissionsPending: false,
            };
        case serverPermissionsTypes.EDIT_SERVER_PERMISSIONS_REJECTED:
            return {
                ...state,
                isEditServerPermissionsPending: false,
            };

        default:
            return state;
    }
}

export default serverPermissionsReducer;
