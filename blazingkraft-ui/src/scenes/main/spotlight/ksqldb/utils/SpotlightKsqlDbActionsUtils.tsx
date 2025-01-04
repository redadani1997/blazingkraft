import { SpotlightAction } from '@mantine/spotlight';
import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { KsqlDbDashboardPermissions } from 'common/permissions/ksqldb/KsqlDbDashboardPermissions';
import { KsqlDbEditorPermissions } from 'common/permissions/ksqldb/KsqlDbEditorPermissions';
import { KsqlDbQueryPermissions } from 'common/permissions/ksqldb/KsqlDbQueryPermissions';
import { KsqlDbStreamPermissions } from 'common/permissions/ksqldb/KsqlDbStreamPermissions';
import { KsqlDbTablePermissions } from 'common/permissions/ksqldb/KsqlDbTablePermissions';
import { KsqlDbTopicPermissions } from 'common/permissions/ksqldb/KsqlDbTopicPermissions';
import { ICommonPermissions } from 'common/types/server_permissions';
import { AuthorizationUtils } from 'common/utils/AuthorizationUtils';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsFiletypeSql, BsTable } from 'react-icons/bs';
import { GiSplashyStream } from 'react-icons/gi';
import { MdOutlineConnectWithoutContact, MdOutlineTopic } from 'react-icons/md';

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
    const isAuthorizedKsqlDbDashboardFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbDashboardPermissions.KSQLDB_DASHBOARD_PERMISSIONS
                        .KSQLDB_DASHBOARD_FEATURE_ENABLED,
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
    const isAuthorizedKsqlDbConnectorFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbConnectorPermissions.KSQLDB_CONNECTOR_PERMISSIONS
                        .KSQLDB_CONNECTOR_FEATURE_ENABLED,
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
    const isAuthorizedKsqlDbTableFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbTablePermissions.KSQLDB_TABLE_PERMISSIONS
                        .KSQLDB_TABLE_FEATURE_ENABLED,
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
    const isAuthorizedKsqlDbTopicFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbTopicPermissions.KSQLDB_TOPIC_PERMISSIONS
                        .KSQLDB_TOPIC_FEATURE_ENABLED,
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
    const isAuthorizedKsqlDbEditorFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbEditorPermissions.KSQLDB_EDITOR_PERMISSIONS
                        .KSQLDB_EDITOR_FEATURE_ENABLED,
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
    const isAuthorizedKsqlDbStreamFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbStreamPermissions.KSQLDB_STREAM_PERMISSIONS
                        .KSQLDB_STREAM_FEATURE_ENABLED,
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
    const isAuthorizedKsqlDbQueryFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbQueryPermissions.KSQLDB_QUERY_PERMISSIONS
                        .KSQLDB_QUERY_FEATURE_ENABLED,
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
    if (isAuthorizedKsqlDbDashboardFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Dashboard - '${name}'`,
            description: `Dashboard for '${name}' KsqlDb`,
            icon: <AiOutlineDashboard size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/dashboard`);
            },
        });
    }
    if (isAuthorizedKsqlDbEditorFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Editor - '${name}'`,
            description: `Editor for '${name}' KsqlDb`,
            icon: <BiNotepad size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/editor`);
            },
        });
    }
    if (isAuthorizedKsqlDbQueryFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Queries - '${name}'`,
            description: `Queries for '${name}' KsqlDb`,
            icon: <BsFiletypeSql size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/queries`);
            },
        });
    }
    if (isAuthorizedKsqlDbConnectorFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Connectors - '${name}'`,
            description: `Connectors for '${name}' KsqlDb`,
            icon: <MdOutlineConnectWithoutContact size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/connectors`);
            },
        });
    }
    if (isAuthorizedKsqlDbTableFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Tables - '${name}'`,
            description: `Tables for '${name}' KsqlDb`,
            icon: <BsTable size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/tables`);
            },
        });
    }
    if (isAuthorizedKsqlDbTopicFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Topics - '${name}'`,
            description: `Topics for '${name}' KsqlDb`,
            icon: <MdOutlineTopic size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/topics`);
            },
        });
    }
    if (isAuthorizedKsqlDbStreamFeature) {
        actions.push({
            group: 'KsqlDb',
            title: `Streams - '${name}'`,
            description: `Streams for '${name}' KsqlDb`,
            icon: <GiSplashyStream size="2rem" />,
            onTrigger: () => {
                navigate(`/ksqldbs/${code}/streams`);
            },
        });
    }
    return actions;
}
const SpotlightKsqlDbActionsUtils = {
    getActions,
};

export { SpotlightKsqlDbActionsUtils };
