import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { ClusterDashboardPermissions } from 'common/permissions/cluster/ClusterDashboardPermissions';
import { ConsumerGroupPermissions } from 'common/permissions/cluster/ConsumerGroupPermissions';
import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { StreamPermissions } from 'common/permissions/cluster/StreamPermissions';
import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import { useMemo } from 'react';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllClustersBodyLinkComponent from './AllClustersBodyLinkComponent';

interface AllClustersBodyLinkProps {
    code: string;
    name: string;
}

const AllClustersBodyLink = ({ code, name }: AllClustersBodyLinkProps) => {
    // Authorization
    const { isAuthorized: isAuthorizedClusterDashboardFeature } =
        useAuthorization({
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ClusterDashboardPermissions
                            .CLUSTER_DASHBOARD_PERMISSIONS
                            .CLUSTER_DASHBOARD_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedTopicFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    TopicPermissions.TOPIC_PERMISSIONS.TOPIC_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedProducerFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    ProducerPermissions.PRODUCER_PERMISSIONS
                        .PRODUCER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedConsumerFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    ConsumerPermissions.CONSUMER_PERMISSIONS
                        .CONSUMER_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedConsumerGroupFeature } = useAuthorization(
        {
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ConsumerGroupPermissions.CONSUMER_GROUP_PERMISSIONS
                            .CONSUMER_GROUP_FEATURE_ENABLED,
                },
            ],
        },
    );
    const { isAuthorized: isAuthorizedAclFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: AclPermissions.ACL_PERMISSIONS.ACL_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedDelegationTokenFeature } =
        useAuthorization({
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS
                            .DELEGATION_TOKEN_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedQuotaFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    QuotaPermissions.QUOTA_PERMISSIONS.QUOTA_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedStreamsFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    StreamPermissions.STREAM_PERMISSIONS.STREAM_FEATURE_ENABLED,
            },
        ],
    });

    const goto = useMemo(() => {
        if (isAuthorizedTopicFeature) {
            return `/clusters/${code}/topics`;
        }
        if (isAuthorizedClusterDashboardFeature) {
            return `/clusters/${code}/dashboard`;
        }
        if (isAuthorizedProducerFeature) {
            return `/clusters/${code}/producer/blazing_producer`;
        }
        if (isAuthorizedConsumerFeature) {
            return `/clusters/${code}/consumer/blazing_consumer`;
        }
        if (isAuthorizedConsumerGroupFeature) {
            return `/clusters/${code}/consumer_groups`;
        }
        if (isAuthorizedAclFeature) {
            return `/clusters/${code}/acls`;
        }
        if (isAuthorizedDelegationTokenFeature) {
            return `/clusters/${code}/delegation_tokens`;
        }
        if (isAuthorizedQuotaFeature) {
            return `/clusters/${code}/quotas`;
        }
        if (isAuthorizedStreamsFeature) {
            return `/clusters/${code}/streams`;
        }
        return null;
    }, [
        code,
        isAuthorizedAclFeature,
        isAuthorizedClusterDashboardFeature,
        isAuthorizedConsumerFeature,
        isAuthorizedConsumerGroupFeature,
        isAuthorizedDelegationTokenFeature,
        isAuthorizedProducerFeature,
        isAuthorizedQuotaFeature,
        isAuthorizedStreamsFeature,
        isAuthorizedTopicFeature,
    ]);

    return <AllClustersBodyLinkComponent goto={goto} name={name} />;
};

export default AllClustersBodyLink;
