import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import userTypes from './types';

export interface UserCreateRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    groupCode: string;
}

export interface UserEditRequest {
    email: string;
    firstName: string;
    lastName: string;
    groupCode: string;
}

function createUser(user: UserCreateRequest) {
    return {
        type: userTypes.CREATE_USER,
        payload: POST('/management/users', user),
        meta: { email: user.email, context: 'Users' },
    };
}

function getAllUsers() {
    return {
        type: userTypes.GET_ALL_USERS,
        payload: GET('/management/users'),
        meta: { context: 'Users' },
    };
}

function getUserDetails(email: string) {
    return {
        type: userTypes.GET_USER_DETAILS,
        payload: GET(`/management/users/${email}/details`),
        meta: { context: 'Users' },
    };
}

function editUser(email: string, user: UserEditRequest) {
    return {
        type: userTypes.EDIT_USER,
        payload: PUT(`/management/users/${email}`, user),
        meta: { email: user.email, context: 'Users' },
    };
}

function editUserPassword(
    email: string,
    currentPassword: string,
    password: string,
    passwordConfirm: string,
) {
    return {
        type: userTypes.EDIT_USER_PASSWORD,
        payload: PUT(`/management/users/${email}/password`, {
            currentPassword,
            password,
            passwordConfirm,
        }),
        meta: { email, context: 'Users' },
    };
}

function editUserPasswordWithoutCurrent(
    email: string,
    password: string,
    passwordConfirm: string,
) {
    return {
        type: userTypes.EDIT_USER_PASSWORD_WITHOUT_CURRENT,
        payload: PUT(
            `/management/users/${email}/password/without-confirmation`,
            {
                password,
                passwordConfirm,
            },
        ),
        meta: { email, context: 'Users' },
    };
}

function deleteUser(email: string) {
    return {
        type: userTypes.DELETE_USER,
        payload: DELETE(`/management/users/${email}`),
        meta: { email, context: 'Users' },
    };
}

const userActions = {
    createUser,
    getAllUsers,
    getUserDetails,
    editUser,
    deleteUser,
    editUserPassword,
    editUserPasswordWithoutCurrent,
};

export default userActions;
