import { ICommonPermissions } from 'common/types/server_permissions';
import { RequiredPermission } from 'scenes/common/authorization';
import { CommonValidationUtils } from './CommonValidationUtils';

export interface IsAuthorizedParams {
    requiredPermissions: RequiredPermission[];
    serverPermissions: ICommonPermissions | null;
    userPermissions: ICommonPermissions | null;
    isBlazingAdmin: boolean;
    clusterCode: string;
    kafkaConnectCode: string;
    schemaRegistryCode: string;
    ksqlDbCode: string;
}

function isAuthorized({
    requiredPermissions,
    serverPermissions,
    userPermissions,
    isBlazingAdmin,
    clusterCode,
    kafkaConnectCode,
    schemaRegistryCode,
    ksqlDbCode,
}: IsAuthorizedParams): boolean {
    return (
        hasServerPermissions(
            requiredPermissions,
            serverPermissions,
            isBlazingAdmin,
            clusterCode,
            kafkaConnectCode,
            schemaRegistryCode,
            ksqlDbCode,
        ) &&
        hasUserPermissions(
            requiredPermissions,
            userPermissions,
            isBlazingAdmin,
            clusterCode,
            kafkaConnectCode,
            schemaRegistryCode,
            ksqlDbCode,
        )
    );
}

function hasServerPermissions(
    requiredPermissions: RequiredPermission[],
    serverPermissions: ICommonPermissions | null,
    isBlazingAdmin: boolean,
    clusterCode,
    kafkaConnectCode,
    schemaRegistryCode,
    ksqlDbCode,
): boolean {
    if (isBlazingAdmin) {
        return true;
    }

    if (CommonValidationUtils.isFalsy(serverPermissions)) {
        return false;
    }

    const {
        clusterPermissions,
        kafkaConnectPermissions,
        schemaRegistryPermissions,
        ksqlDbPermissions,
        managementPermissions,
        playgroundPermissions,
    } = serverPermissions;

    return hasEveryPermissions(
        requiredPermissions,
        clusterPermissions,
        kafkaConnectPermissions,
        schemaRegistryPermissions,
        ksqlDbPermissions,
        managementPermissions,
        playgroundPermissions,
        clusterCode,
        kafkaConnectCode,
        schemaRegistryCode,
        ksqlDbCode,
    );
}

function hasUserPermissions(
    requiredPermissions: RequiredPermission[],
    userPermissions: ICommonPermissions | null,
    isBlazingAdmin: boolean,
    clusterCode,
    kafkaConnectCode,
    schemaRegistryCode,
    ksqlDbCode,
): boolean {
    if (isBlazingAdmin || CommonValidationUtils.isFalsy(userPermissions)) {
        return true;
    }

    const {
        clusterPermissions,
        kafkaConnectPermissions,
        schemaRegistryPermissions,
        ksqlDbPermissions,
        managementPermissions,
        playgroundPermissions,
    } = userPermissions;

    return hasEveryPermissions(
        requiredPermissions,
        clusterPermissions,
        kafkaConnectPermissions,
        schemaRegistryPermissions,
        ksqlDbPermissions,
        managementPermissions,
        playgroundPermissions,
        clusterCode,
        kafkaConnectCode,
        schemaRegistryCode,
        ksqlDbCode,
    );
}

function hasEveryPermissions(
    requiredPermissions: RequiredPermission[],
    clusterPermissions,
    kafkaConnectPermissions,
    schemaRegistryPermissions,
    ksqlDbPermissions,
    managementPermissions,
    playgroundPermissions,
    clusterCode,
    kafkaConnectCode,
    schemaRegistryCode,
    ksqlDbCode,
): boolean {
    return requiredPermissions.every(requiredPermission => {
        return hasPermission(
            requiredPermission,
            clusterPermissions,
            kafkaConnectPermissions,
            schemaRegistryPermissions,
            ksqlDbPermissions,
            managementPermissions,
            playgroundPermissions,
            clusterCode,
            kafkaConnectCode,
            schemaRegistryCode,
            ksqlDbCode,
        );
    });
}

function hasPermission(
    requiredPermission: RequiredPermission,
    clusterPermissions,
    kafkaConnectPermissions,
    schemaRegistryPermissions,
    ksqlDbPermissions,
    managementPermissions,
    playgroundPermissions,
    clusterCode,
    kafkaConnectCode,
    schemaRegistryCode,
    ksqlDbCode,
) {
    const { authorizationType, permission } = requiredPermission;
    switch (authorizationType) {
        case 'CLUSTER':
            return codeHasPermission(
                clusterPermissions,
                permission,
                clusterCode,
            );
        case 'KAFKA_CONNECT':
            return codeHasPermission(
                kafkaConnectPermissions,
                permission,
                kafkaConnectCode,
            );
        case 'SCHEMA_REGISTRY':
            return codeHasPermission(
                schemaRegistryPermissions,
                permission,
                schemaRegistryCode,
            );
        case 'KSQLDB':
            return codeHasPermission(ksqlDbPermissions, permission, ksqlDbCode);
        case 'MANAGEMENT':
            return normalHasPermission(managementPermissions, permission);
        case 'PLAYGROUND':
            return normalHasPermission(playgroundPermissions, permission);
        default:
            return false;
    }
}

function codeHasPermission(
    codePermissions: Map<string, string[]>,
    requiredPermission: string,
    code: string,
): boolean {
    if (CommonValidationUtils.isFalsyString(code)) {
        return false;
    }
    if (!(codePermissions instanceof Map)) {
        return false;
    }
    const permissions: string[] = codePermissions.get(code);
    if (CommonValidationUtils.isFalsyArray(permissions)) {
        return false;
    }
    return permissions.includes(requiredPermission);
}

function normalHasPermission(
    normalPermissions: string[],
    requiredPermission: string,
): boolean {
    if (CommonValidationUtils.isFalsyArray(normalPermissions)) {
        return false;
    }
    return normalPermissions.includes(requiredPermission);
}

const AuthorizationUtils = {
    isAuthorized,
};

export { AuthorizationUtils };
