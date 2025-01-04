import { GroupDetails } from 'common/types/group';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { ReduxAction } from 'redux_config/.';
import { GroupReducerState } from '.';
import groupTypes from './types';

const initialState: GroupReducerState = {
    groupDetails: null,
    groups: [],
    isGetGroupDetailsPending: false,
    isGetAllGroupsPending: false,
    isCreateGroupPending: false,
    isEditGroupPending: false,
    isDeleteGroupPending: false,
};

function computeGroupDetails(payload): GroupDetails {
    if (payload) {
        return {
            code: payload.code,
            name: payload.name,
            description: payload.description,
            usersMeta: payload.usersMeta,
            clusterPermissions: CommonUtils.objectToMap(
                payload.clusterPermissions,
            ),
            kafkaConnectPermissions: CommonUtils.objectToMap(
                payload.kafkaConnectPermissions,
            ),
            schemaRegistryPermissions: CommonUtils.objectToMap(
                payload.schemaRegistryPermissions,
            ),
            ksqlDbPermissions: CommonUtils.objectToMap(
                payload.ksqlDbPermissions,
            ),

            managementPermissions: CommonValidationUtils.isTruthy(
                payload.managementPermissions,
            )
                ? payload.managementPermissions
                : [],
            playgroundPermissions: CommonValidationUtils.isTruthy(
                payload.playgroundPermissions,
            )
                ? payload.playgroundPermissions
                : [],
        };
    }
    return null;
}

function groupReducer(
    state = initialState,
    action: ReduxAction,
): GroupReducerState {
    switch (action.type) {
        // GET_GROUP_DETAILS
        case groupTypes.GET_GROUP_DETAILS_PENDING:
            return {
                ...state,
                isGetGroupDetailsPending: true,
            };
        case groupTypes.GET_GROUP_DETAILS_FULFILLED: {
            return {
                ...state,
                isGetGroupDetailsPending: false,
                groupDetails: computeGroupDetails(action.payload),
            };
        }
        case groupTypes.GET_GROUP_DETAILS_REJECTED:
            return {
                ...state,
                isGetGroupDetailsPending: false,
                groupDetails: null,
            };

        // GET_ALL_GROUPS
        case groupTypes.GET_ALL_GROUPS_PENDING:
            return {
                ...state,
                isGetAllGroupsPending: true,
            };
        case groupTypes.GET_ALL_GROUPS_FULFILLED:
            return {
                ...state,
                isGetAllGroupsPending: false,
                groups: action.payload,
            };
        case groupTypes.GET_ALL_GROUPS_REJECTED:
            return {
                ...state,
                isGetAllGroupsPending: false,
                groups: [],
            };

        // CREATE_GROUP
        case groupTypes.CREATE_GROUP_PENDING:
            return {
                ...state,
                isCreateGroupPending: true,
            };
        case groupTypes.CREATE_GROUP_FULFILLED:
            return {
                ...state,
                isCreateGroupPending: false,
            };
        case groupTypes.CREATE_GROUP_REJECTED:
            return {
                ...state,
                isCreateGroupPending: false,
            };

        // EDIT_GROUP
        case groupTypes.EDIT_GROUP_PENDING:
            return {
                ...state,

                isEditGroupPending: true,
            };
        case groupTypes.EDIT_GROUP_FULFILLED:
            return {
                ...state,
                isEditGroupPending: false,
            };
        case groupTypes.EDIT_GROUP_REJECTED:
            return {
                ...state,
                isEditGroupPending: false,
            };

        // DELETE_GROUP
        case groupTypes.DELETE_GROUP_PENDING:
            return {
                ...state,
                isDeleteGroupPending: true,
            };
        case groupTypes.DELETE_GROUP_FULFILLED:
            return {
                ...state,
                isDeleteGroupPending: false,
            };
        case groupTypes.DELETE_GROUP_REJECTED:
            return {
                ...state,
                isDeleteGroupPending: false,
            };

        default:
            return state;
    }
}

export default groupReducer;
