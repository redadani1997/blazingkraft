import { CommonUtils } from 'common/utils/CommonUtils';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import groupTypes from './types';

export interface GroupRequest {
    code: string;
    name: string;
    description: string;
    clusterPermissions: Map<string, string[]>;
    kafkaConnectPermissions: Map<string, string[]>;
    schemaRegistryPermissions: Map<string, string[]>;
    ksqlDbPermissions: Map<string, string[]>;
    managementPermissions: string[];
    playgroundPermissions: string[];
}

function createGroup(group: GroupRequest) {
    return {
        type: groupTypes.CREATE_GROUP,
        payload: POST('/management/groups', {
            code: group.code,
            name: group.name,
            description: group.description,
            clusterPermissions: CommonUtils.mapToObject(
                group.clusterPermissions,
            ),
            kafkaConnectPermissions: CommonUtils.mapToObject(
                group.kafkaConnectPermissions,
            ),
            schemaRegistryPermissions: CommonUtils.mapToObject(
                group.schemaRegistryPermissions,
            ),
            ksqlDbPermissions: CommonUtils.mapToObject(group.ksqlDbPermissions),
            managementPermissions: group.managementPermissions,
            playgroundPermissions: group.playgroundPermissions,
        }),
        meta: { name: group.name, context: 'Groups' },
    };
}

function getAllGroups() {
    return {
        type: groupTypes.GET_ALL_GROUPS,
        payload: GET('/management/groups'),
        meta: { context: 'Groups' },
    };
}

function getGroupDetails(groupCode: string) {
    return {
        type: groupTypes.GET_GROUP_DETAILS,
        payload: GET(`/management/groups/${groupCode}/details`),
        meta: { context: 'Groups' },
    };
}

function editGroup(groupCode: string, group: GroupRequest) {
    return {
        type: groupTypes.EDIT_GROUP,
        payload: PUT(`/management/groups/${groupCode}`, {
            code: group.code,
            name: group.name,
            description: group.description,
            clusterPermissions: CommonUtils.mapToObject(
                group.clusterPermissions,
            ),
            kafkaConnectPermissions: CommonUtils.mapToObject(
                group.kafkaConnectPermissions,
            ),
            schemaRegistryPermissions: CommonUtils.mapToObject(
                group.schemaRegistryPermissions,
            ),
            ksqlDbPermissions: CommonUtils.mapToObject(group.ksqlDbPermissions),
            managementPermissions: group.managementPermissions,
            playgroundPermissions: group.playgroundPermissions,
        }),
        meta: { name: group.name, context: 'Groups' },
    };
}

function deleteGroup(groupCode: string, groupName: string) {
    return {
        type: groupTypes.DELETE_GROUP,
        payload: DELETE(`/management/groups/${groupCode}`),
        meta: { name: groupName, context: 'Groups' },
    };
}

function deleteGroupWithUsers(groupCode: string, groupName: string) {
    return {
        type: groupTypes.DELETE_GROUP,
        payload: DELETE(`/management/groups/${groupCode}/with-users`),
        meta: { name: groupName, context: 'Groups' },
    };
}

const groupActions = {
    createGroup,
    getAllGroups,
    getGroupDetails,
    editGroup,
    deleteGroup,
    deleteGroupWithUsers,
};

export default groupActions;
