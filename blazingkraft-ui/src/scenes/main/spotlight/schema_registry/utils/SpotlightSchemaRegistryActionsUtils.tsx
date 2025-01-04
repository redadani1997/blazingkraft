import { SpotlightAction } from '@mantine/spotlight';
import { SchemaRegistryDashboardPermissions } from 'common/permissions/schema_registry/SchemaRegistryDashboardPermissions';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { ICommonPermissions } from 'common/types/server_permissions';
import { AuthorizationUtils } from 'common/utils/AuthorizationUtils';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineSubject } from 'react-icons/md';

export interface IActionsParams {
    serverPermissions: ICommonPermissions | null;
    userPermissions: ICommonPermissions | null;
    isBlazingAdmin: boolean;
    code: string;
    name: string;
    navigate: any;
}

function getActions({
    serverPermissions,
    userPermissions,
    isBlazingAdmin,
    code,
    name,
    navigate,
}: IActionsParams): SpotlightAction[] {
    // Authorization
    const isAuthorizedSchemaRegistryDashboardFeature =
        AuthorizationUtils.isAuthorized({
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SchemaRegistryDashboardPermissions
                            .SCHEMA_REGISTRY_DASHBOARD_PERMISSIONS
                            .SCHEMA_REGISTRY_DASHBOARD_FEATURE_ENABLED,
                },
            ],
            serverPermissions,
            userPermissions,
            isBlazingAdmin,
            clusterCode: code,
            kafkaConnectCode: code,
            schemaRegistryCode: code,
            ksqlDbCode: code,
        });
    const isAuthorizedSubjectFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'SCHEMA_REGISTRY',
                permission:
                    SubjectPermissions.SUBJECT_PERMISSIONS
                        .SUBJECT_FEATURE_ENABLED,
            },
        ],
        serverPermissions,
        userPermissions,
        isBlazingAdmin,
        clusterCode: code,
        kafkaConnectCode: code,
        schemaRegistryCode: code,
        ksqlDbCode: code,
    });

    const actions = [];
    if (isAuthorizedSchemaRegistryDashboardFeature) {
        actions.push({
            group: 'Schema Registry',
            title: `Dashboard - '${name}'`,
            description: `Dashboard for '${name}' Schema Registry`,
            icon: <AiOutlineDashboard size="2rem" />,
            onTrigger: () => {
                navigate(`/schema_registries/${code}/dashboard`);
            },
        });
    }
    if (isAuthorizedSubjectFeature) {
        actions.push({
            group: 'Schema Registry',
            title: `Subjects - '${name}'`,
            description: `Subjects for '${name}' Schema Registry`,
            icon: <MdOutlineSubject size="2rem" />,
            onTrigger: () => {
                navigate(`/schema_registries/${code}/subjects`);
            },
        });
    }
    return actions;
}
const SpotlightSchemaRegistryActionsUtils = {
    getActions,
};

export { SpotlightSchemaRegistryActionsUtils };
