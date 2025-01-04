import { SpotlightAction } from '@mantine/spotlight';
import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { KafkaConnectDashboardPermissions } from 'common/permissions/kafka_connect/KafkaConnectDashboardPermissions';
import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { ICommonPermissions } from 'common/types/server_permissions';
import { AuthorizationUtils } from 'common/utils/AuthorizationUtils';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsPlug } from 'react-icons/bs';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';

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
    const isAuthorizedKafkaConnectFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKafkaConnectPermissions
                        .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                        .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
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

    if (!isAuthorizedKafkaConnectFeature) {
        return [];
    }

    const isAuthorizedKafkaConnectDashboardFeature =
        AuthorizationUtils.isAuthorized({
            requiredPermissions: [
                {
                    authorizationType: 'KAFKA_CONNECT',
                    permission:
                        KafkaConnectDashboardPermissions
                            .KAFKA_CONNECT_DASHBOARD_PERMISSIONS
                            .KAFKA_CONNECT_DASHBOARD_FEATURE_ENABLED,
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
    const isAuthorizedPluginFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    PluginPermissions.PLUGIN_PERMISSIONS.PLUGIN_FEATURE_ENABLED,
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
    const isAuthorizedConnectorFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS
                        .CONNECTOR_FEATURE_ENABLED,
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
    if (isAuthorizedKafkaConnectDashboardFeature) {
        actions.push({
            group: 'Kafka Connect',
            title: `Dashboard - '${name}'`,
            description: `Dashboard for '${name}' Kafka Connect`,
            icon: <AiOutlineDashboard size="2rem" />,
            onTrigger: () => {
                navigate(`/kafka_connects/${code}/dashboard`);
            },
        });
    }
    if (isAuthorizedPluginFeature) {
        actions.push({
            group: 'Kafka Connect',
            title: `Plugins - '${name}'`,
            description: `Plugins for '${name}' Kafka Connect`,
            icon: <BsPlug size="2rem" />,
            onTrigger: () => {
                navigate(`/kafka_connects/${code}/plugins`);
            },
        });
    }
    if (isAuthorizedConnectorFeature) {
        actions.push({
            group: 'Kafka Connect',
            title: `Connectors - '${name}'`,
            description: `Connectors for '${name}' Kafka Connect`,
            icon: <MdOutlineConnectWithoutContact size="2rem" />,
            onTrigger: () => {
                navigate(`/kafka_connects/${code}/connectors`);
            },
        });
    }
    return actions;
}
const SpotlightKafkaConnectActionsUtils = {
    getActions,
};

export { SpotlightKafkaConnectActionsUtils };
