import { ReduxAction } from 'redux_config/.';
import { AclReducerState } from '.';
import aclTypes from './types';

const initialState: AclReducerState = {
    isCreateAclBindingPending: false,
    isDeleteAclBindingPending: false,
    isGetAclBindingsPending: false,
    aclBindings: [],
};

function aclReducer(
    state = initialState,
    action: ReduxAction,
): AclReducerState {
    switch (action.type) {
        // GET_ACL_BINDINGS
        case aclTypes.GET_ACL_BINDINGS_PENDING:
            return {
                ...state,
                isGetAclBindingsPending: true,
            };
        case aclTypes.GET_ACL_BINDINGS_FULFILLED:
            return {
                ...state,
                aclBindings: action.payload,
                isGetAclBindingsPending: false,
            };
        case aclTypes.GET_ACL_BINDINGS_REJECTED:
            return {
                ...state,
                aclBindings: [],
                isGetAclBindingsPending: false,
            };

        // CREATE_ACL_BINDING
        case aclTypes.CREATE_ACL_BINDING_PENDING:
            return {
                ...state,
                isCreateAclBindingPending: true,
            };
        case aclTypes.CREATE_ACL_BINDING_FULFILLED:
            return {
                ...state,
                isCreateAclBindingPending: false,
            };
        case aclTypes.CREATE_ACL_BINDING_REJECTED:
            return {
                ...state,
                isCreateAclBindingPending: false,
            };

        // DELETE_ACL_BINDING
        case aclTypes.DELETE_ACL_BINDING_PENDING:
            return {
                ...state,
                isDeleteAclBindingPending: true,
            };
        case aclTypes.DELETE_ACL_BINDING_FULFILLED:
            return {
                ...state,
                isDeleteAclBindingPending: false,
            };
        case aclTypes.DELETE_ACL_BINDING_REJECTED:
            return {
                ...state,
                isDeleteAclBindingPending: false,
            };
        default:
            return state;
    }
}

export default aclReducer;
