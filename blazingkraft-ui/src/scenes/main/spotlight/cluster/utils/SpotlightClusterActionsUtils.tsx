import { SpotlightAction } from '@mantine/spotlight';
import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { ClusterDashboardPermissions } from 'common/permissions/cluster/ClusterDashboardPermissions';
import { ConsumerGroupPermissions } from 'common/permissions/cluster/ConsumerGroupPermissions';
import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { StreamPermissions } from 'common/permissions/cluster/StreamPermissions';
import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import { ICommonPermissions } from 'common/types/server_permissions';
import { AuthorizationUtils } from 'common/utils/AuthorizationUtils';
import { AiOutlineDashboard, AiOutlineGroup } from 'react-icons/ai';
import { GiSplashyStream } from 'react-icons/gi';
import { MdOutlineTopic } from 'react-icons/md';
import { SiJsonwebtokens } from 'react-icons/si';
import {
    TbArrowBigDownLines,
    TbArrowBigUpLines,
    TbScale,
    TbShieldLock,
} from 'react-icons/tb';

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
    const isAuthorizedClusterDashboardFeature = AuthorizationUtils.isAuthorized(
        {
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ClusterDashboardPermissions
                            .CLUSTER_DASHBOARD_PERMISSIONS
                            .CLUSTER_DASHBOARD_FEATURE_ENABLED,
                },
            ],
            serverPermissions,
            userPermissions,
            isBlazingAdmin,
            clusterCode: code,
            kafkaConnectCode: code,
            schemaRegistryCode: code,
            ksqlDbCode: code,
        },
    );
    const isAuthorizedTopicFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    TopicPermissions.TOPIC_PERMISSIONS.TOPIC_FEATURE_ENABLED,
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
    const isAuthorizedProducerFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    ProducerPermissions.PRODUCER_PERMISSIONS
                        .PRODUCER_FEATURE_ENABLED,
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
    const isAuthorizedConsumerFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    ConsumerPermissions.CONSUMER_PERMISSIONS
                        .CONSUMER_FEATURE_ENABLED,
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
    const isAuthorizedConsumerGroupFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    ConsumerGroupPermissions.CONSUMER_GROUP_PERMISSIONS
                        .CONSUMER_GROUP_FEATURE_ENABLED,
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
    const isAuthorizedAclFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: AclPermissions.ACL_PERMISSIONS.ACL_FEATURE_ENABLED,
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
    const isAuthorizedDelegationTokenFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS
                        .DELEGATION_TOKEN_FEATURE_ENABLED,
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
    const isAuthorizedQuotaFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    QuotaPermissions.QUOTA_PERMISSIONS.QUOTA_FEATURE_ENABLED,
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
    const isAuthorizedStreamsFeature = AuthorizationUtils.isAuthorized({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    StreamPermissions.STREAM_PERMISSIONS.STREAM_FEATURE_ENABLED,
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
    if (isAuthorizedClusterDashboardFeature) {
        actions.push({
            group: 'Cluster',
            title: `Dashboard - '${name}'`,
            description: `Dashboard for '${name}' Cluster`,
            icon: <AiOutlineDashboard size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/dashboard`);
            },
        });
    }
    if (isAuthorizedTopicFeature) {
        actions.push({
            group: 'Cluster',
            title: `Topics - '${name}'`,
            description: `Topics for '${name}' Cluster`,
            icon: <MdOutlineTopic size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/topics`);
            },
        });
    }
    if (isAuthorizedProducerFeature) {
        actions.push({
            group: 'Cluster',
            title: `Producer - '${name}'`,
            description: `Producer for '${name}' Cluster`,
            icon: <TbArrowBigUpLines size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/producer/blazing_producer`);
            },
        });
    }
    if (isAuthorizedConsumerFeature) {
        actions.push({
            group: 'Cluster',
            title: `Consumer - '${name}'`,
            description: `Consumer for '${name}' Cluster`,
            icon: <TbArrowBigDownLines size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/consumer/blazing_consumer`);
            },
        });
    }
    if (isAuthorizedConsumerGroupFeature) {
        actions.push({
            group: 'Cluster',
            title: `Consumer Groups - '${name}'`,
            description: `Consumer Groups for '${name}' Cluster`,
            icon: <AiOutlineGroup size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/consumer_groups`);
            },
        });
    }
    if (isAuthorizedAclFeature) {
        actions.push({
            group: 'Cluster',
            title: `ACL - '${name}'`,
            description: `ACL for '${name}' Cluster`,
            icon: <TbShieldLock size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/acls`);
            },
        });
    }
    if (isAuthorizedDelegationTokenFeature) {
        actions.push({
            group: 'Cluster',
            title: `Delegation Tokens - '${name}'`,
            description: `Delegation Tokens for '${name}' Cluster`,
            icon: <SiJsonwebtokens size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/delegation_tokens`);
            },
        });
    }
    if (isAuthorizedQuotaFeature) {
        actions.push({
            group: 'Cluster',
            title: `Quotas - '${name}'`,
            description: `Quotas for '${name}' Cluster`,
            icon: <TbScale size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/quotas`);
            },
        });
    }
    if (isAuthorizedStreamsFeature) {
        actions.push({
            group: 'Cluster',
            title: `Streams - '${name}'`,
            description: `Streams for '${name}' Cluster`,
            icon: <GiSplashyStream size="2rem" />,
            onTrigger: () => {
                navigate(`/clusters/${code}/streams`);
            },
        });
    }
    return actions;
}
const SpotlightClusterActionsUtils = {
    getActions,
};

export { SpotlightClusterActionsUtils };
