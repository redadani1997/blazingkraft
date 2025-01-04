import { ReduxAction } from 'redux_config/.';
import { UserReducerState } from '.';
import userTypes from './types';

const initialState: UserReducerState = {
    isCreateUserPending: false,
    isGetAllUsersPending: false,
    isDeleteUserPending: false,
    isEditUserPending: false,
    isEditUserPasswordPending: false,
    isEditUserPasswordWithoutCurrentPending: false,
    isGetUserDetailsPending: false,
    users: [],
    userDetails: null,
};

function userReducer(
    state = initialState,
    action: ReduxAction,
): UserReducerState {
    switch (action.type) {
        // CREATE_USER
        case userTypes.CREATE_USER_PENDING:
            return {
                ...state,
                isCreateUserPending: true,
            };
        case userTypes.CREATE_USER_FULFILLED:
            return {
                ...state,
                isCreateUserPending: false,
            };
        case userTypes.CREATE_USER_REJECTED:
            return {
                ...state,
                isCreateUserPending: false,
            };

        // GET_ALL_USERS
        case userTypes.GET_ALL_USERS_PENDING:
            return {
                ...state,
                isGetAllUsersPending: true,
            };
        case userTypes.GET_ALL_USERS_FULFILLED:
            return {
                ...state,
                isGetAllUsersPending: false,
                users: action.payload,
            };
        case userTypes.GET_ALL_USERS_REJECTED:
            return {
                ...state,
                isGetAllUsersPending: false,
                users: [],
            };

        // DELETE_USER
        case userTypes.DELETE_USER_PENDING:
            return {
                ...state,
                isDeleteUserPending: true,
            };
        case userTypes.DELETE_USER_FULFILLED:
            return {
                ...state,
                isDeleteUserPending: false,
            };
        case userTypes.DELETE_USER_REJECTED:
            return {
                ...state,
                isDeleteUserPending: false,
            };

        // EDIT_USER
        case userTypes.EDIT_USER_PENDING:
            return {
                ...state,
                isEditUserPending: true,
            };
        case userTypes.EDIT_USER_FULFILLED:
            return {
                ...state,

                isEditUserPending: false,
            };
        case userTypes.EDIT_USER_REJECTED:
            return {
                ...state,
                isEditUserPending: false,
            };

        // EDIT_USER_PASSWORD
        case userTypes.EDIT_USER_PASSWORD_PENDING:
            return {
                ...state,
                isEditUserPasswordPending: true,
            };
        case userTypes.EDIT_USER_PASSWORD_FULFILLED:
            return {
                ...state,
                isEditUserPasswordPending: false,
            };
        case userTypes.EDIT_USER_PASSWORD_REJECTED:
            return {
                ...state,
                isEditUserPasswordPending: false,
            };

        // EDIT_USER_PASSWORD_WITHOUT_CURRENT
        case userTypes.EDIT_USER_PASSWORD_WITHOUT_CURRENT_PENDING:
            return {
                ...state,
                isEditUserPasswordWithoutCurrentPending: true,
            };
        case userTypes.EDIT_USER_PASSWORD_WITHOUT_CURRENT_FULFILLED:
            return {
                ...state,
                isEditUserPasswordWithoutCurrentPending: false,
            };
        case userTypes.EDIT_USER_PASSWORD_WITHOUT_CURRENT_REJECTED:
            return {
                ...state,
                isEditUserPasswordWithoutCurrentPending: false,
            };

        // GET_USER_DETAILS
        case userTypes.GET_USER_DETAILS_PENDING:
            return {
                ...state,
                isGetUserDetailsPending: true,
            };
        case userTypes.GET_USER_DETAILS_FULFILLED:
            return {
                ...state,
                isGetUserDetailsPending: false,
                userDetails: action.payload,
            };
        case userTypes.GET_USER_DETAILS_REJECTED:
            return {
                ...state,
                isGetUserDetailsPending: false,
                userDetails: null,
            };

        default:
            return state;
    }
}

export default userReducer;
