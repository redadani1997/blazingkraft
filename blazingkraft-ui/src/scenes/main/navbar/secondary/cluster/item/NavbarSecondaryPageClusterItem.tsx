import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { ClusterDashboardPermissions } from 'common/permissions/cluster/ClusterDashboardPermissions';
import { ConsumerGroupPermissions } from 'common/permissions/cluster/ConsumerGroupPermissions';
import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { StreamPermissions } from 'common/permissions/cluster/StreamPermissions';
import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActiveLink, OpenedLink } from 'scenes/main/navbar';
import NavbarSecondaryPageClusterItemComponent from './NavbarSecondaryPageClusterItemComponent';

interface NavbarSecondaryPageClusterItemProps {
    code: string;
    name: string;
    color: string;
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
}

const NavbarSecondaryPageClusterItem = ({
    activeLink,
    code,
    name,
    color,
    openedLink,
    setOpenedLink,
}: NavbarSecondaryPageClusterItemProps) => {
    // Map State To Props

    // Map Dispatch To Props

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

    if (
        isAuthorizedClusterDashboardFeature ||
        isAuthorizedTopicFeature ||
        isAuthorizedProducerFeature ||
        isAuthorizedConsumerFeature ||
        isAuthorizedConsumerGroupFeature ||
        isAuthorizedAclFeature ||
        isAuthorizedDelegationTokenFeature ||
        isAuthorizedQuotaFeature ||
        isAuthorizedStreamsFeature
    ) {
        return (
            <NavbarSecondaryPageClusterItemComponent
                activeLink={activeLink}
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                code={code}
                name={name}
                color={color}
                isAuthorizedClusterDashboardFeature={
                    isAuthorizedClusterDashboardFeature
                }
                isAuthorizedTopicFeature={isAuthorizedTopicFeature}
                isAuthorizedProducerFeature={isAuthorizedProducerFeature}
                isAuthorizedConsumerFeature={isAuthorizedConsumerFeature}
                isAuthorizedConsumerGroupFeature={
                    isAuthorizedConsumerGroupFeature
                }
                isAuthorizedAclFeature={isAuthorizedAclFeature}
                isAuthorizedDelegationTokenFeature={
                    isAuthorizedDelegationTokenFeature
                }
                isAuthorizedQuotaFeature={isAuthorizedQuotaFeature}
                isAuthorizedStreamsFeature={isAuthorizedStreamsFeature}
            />
        );
    }
    return <></>;
};

export default NavbarSecondaryPageClusterItem;
