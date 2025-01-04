import { AclPermissions } from './cluster/AclPermissions';
import { ClusterDashboardPermissions } from './cluster/ClusterDashboardPermissions';
import { ConsumerGroupPermissions } from './cluster/ConsumerGroupPermissions';
import { ConsumerPermissions } from './cluster/ConsumerPermissions';
import { DelegationTokenPermissions } from './cluster/DelegationTokenPermissions';
import { OffsetPermissions } from './cluster/OffsetPermissions';
import { ProducerPermissions } from './cluster/ProducerPermissions';
import { QuotaPermissions } from './cluster/QuotaPermissions';
import { StreamPermissions } from './cluster/StreamPermissions';
import { TopicPermissions } from './cluster/TopicPermissions';

const ALL_PERMISSIONS = [
    ...ClusterDashboardPermissions.CLUSTER_DASHBOARD_PERMISSIONS_LIST,
    ...TopicPermissions.TOPIC_PERMISSIONS_LIST,
    ...ProducerPermissions.PRODUCER_PERMISSIONS_LIST,
    ...ConsumerPermissions.CONSUMER_PERMISSIONS_LIST,
    ...ConsumerGroupPermissions.CONSUMER_GROUP_PERMISSIONS_LIST,
    ...QuotaPermissions.QUOTA_PERMISSIONS_LIST,
    ...AclPermissions.ACL_PERMISSIONS_LIST,
    ...DelegationTokenPermissions.DELEGATION_TOKEN_PERMISSIONS_LIST,
    ...OffsetPermissions.OFFSET_PERMISSIONS_LIST,
    ...StreamPermissions.STREAM_PERMISSIONS_LIST,
] as const;

const ClusterPermissions = {
    ALL_PERMISSIONS,
};

export default ClusterPermissions;
