import { CommonUtils } from 'common/utils/CommonUtils';
import { GET, PUT } from 'rest/RestCalls';
import serverPermissionsTypes from './types';

export interface ServerPermissionsRequest {
    clusterPermissions: Map<string, string[]>;
    kafkaConnectPermissions: Map<string, string[]>;
    schemaRegistryPermissions: Map<string, string[]>;
    ksqlDbPermissions: Map<string, string[]>;
    managementPermissions: string[];
    playgroundPermissions: string[];
}

function getServerPermissions() {
    return {
        type: serverPermissionsTypes.GET_SERVER_PERMISSIONS,
        payload: GET(`/management/server-permissions`),
        meta: { context: 'Server Permissions' },
    };
}

function editServerPermissions(serverPermissions: ServerPermissionsRequest) {
    return {
        type: serverPermissionsTypes.EDIT_SERVER_PERMISSIONS,
        payload: PUT(`/management/server-permissions`, {
            clusterPermissions: CommonUtils.mapToObject(
                serverPermissions.clusterPermissions,
            ),
            kafkaConnectPermissions: CommonUtils.mapToObject(
                serverPermissions.kafkaConnectPermissions,
            ),
            schemaRegistryPermissions: CommonUtils.mapToObject(
                serverPermissions.schemaRegistryPermissions,
            ),
            ksqlDbPermissions: CommonUtils.mapToObject(
                serverPermissions.ksqlDbPermissions,
            ),
            managementPermissions: serverPermissions.managementPermissions,
            playgroundPermissions: serverPermissions.playgroundPermissions,
        }),
        meta: { context: 'Server Permissions' },
    };
}

const serverPermissionsActions = {
    getServerPermissions,
    editServerPermissions,
};

export default serverPermissionsActions;
