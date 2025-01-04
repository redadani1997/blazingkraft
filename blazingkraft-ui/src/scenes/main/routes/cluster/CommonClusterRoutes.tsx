import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { ClusterDashboardPermissions } from 'common/permissions/cluster/ClusterDashboardPermissions';
import { ConsumerGroupPermissions } from 'common/permissions/cluster/ConsumerGroupPermissions';
import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { DelegationTokenPermissions } from 'common/permissions/cluster/DelegationTokenPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { QuotaPermissions } from 'common/permissions/cluster/QuotaPermissions';
import { StreamPermissions } from 'common/permissions/cluster/StreamPermissions';
import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { Route } from 'react-router';
import AllAcls from 'scenes/acl/all_acls/AllAcls';
import AllClusters from 'scenes/cluster/all_clusters/AllClusters';
import BrokerDetails from 'scenes/cluster/broker_details/BrokerDetails';
import ClusterDashboard from 'scenes/cluster/cluster_dashboard/ClusterDashboard';
import CreateCluster from 'scenes/cluster/create_cluster/CreateCluster';
import EditCluster from 'scenes/cluster/edit_cluster/EditCluster';
import WithAuthorization from 'scenes/common/authorization/hoc/WithAuthorization';
import BlazingConsumer from 'scenes/consumer/blazing_consumer/BlazingConsumer';
import BlazingConsumerDetails from 'scenes/consumer/blazing_consumer_details/BlazingConsumerDetails';
import EditConsumerConfiguration from 'scenes/consumer/edit_consumer_configuration/EditConsumerConfiguration';
import AllConsumerGroups from 'scenes/consumer_group/all_consumer_groups/AllConsumerGroups';
import ConsumerGroupDetails from 'scenes/consumer_group/consumer_group_details/ConsumerGroupDetails';
import AllDelegationTokens from 'scenes/delegation_token/all_delegation_tokens/AllDelegationTokens';
import AllKafkaStreams from 'scenes/kafka_streams/all_kafka_streams/AllKafkaStreams';
import BlazingProducer from 'scenes/producer/blazing_producer/BlazingProducer';
import BlazingProducerDetails from 'scenes/producer/blazing_producer_details/BlazingProducerDetails';
import EditProducerConfiguration from 'scenes/producer/edit_producer_configuration/EditProducerConfiguration';
import AllQuotas from 'scenes/quota/all_quotas/AllQuotas';
import AllTopics from 'scenes/topic/all_topics/AllTopics';
import AlterTopicConfiguration from 'scenes/topic/alter_topic_configuration/AlterTopicConfiguration';
import CreateTopic from 'scenes/topic/create_topic/CreateTopic';
import TopicDetails from 'scenes/topic/topic_details/TopicDetails';
import CommonRoutesHoc from '../CommonRoutesHoc';
// const AllAcls = lazy(() =>
//     import('scenes/acl/all_acls/AllAcls').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllClusters = lazy(() =>
//     import('scenes/cluster/all_clusters/AllClusters').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const BrokerDetails = lazy(() =>
//     import('scenes/cluster/broker_details/BrokerDetails').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const ClusterDashboard = lazy(() =>
//     import('scenes/cluster/cluster_dashboard/ClusterDashboard').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateCluster = lazy(() =>
//     import('scenes/cluster/create_cluster/CreateCluster').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditCluster = lazy(() =>
//     import('scenes/cluster/edit_cluster/EditCluster').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const BlazingConsumer = lazy(() =>
//     import('scenes/consumer/blazing_consumer/BlazingConsumer').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const BlazingConsumerDetails = lazy(() =>
//     import(
//         'scenes/consumer/blazing_consumer_details/BlazingConsumerDetails'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditConsumerConfiguration = lazy(() =>
//     import(
//         'scenes/consumer/edit_consumer_configuration/EditConsumerConfiguration'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllConsumerGroups = lazy(() =>
//     import('scenes/consumer_group/all_consumer_groups/AllConsumerGroups').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const ConsumerGroupDetails = lazy(() =>
//     import(
//         'scenes/consumer_group/consumer_group_details/ConsumerGroupDetails'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllDelegationTokens = lazy(() =>
//     import(
//         'scenes/delegation_token/all_delegation_tokens/AllDelegationTokens'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllKafkaStreams = lazy(() =>
//     import('scenes/kafka_streams/all_kafka_streams/AllKafkaStreams').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const BlazingProducer = lazy(() =>
//     import('scenes/producer/blazing_producer/BlazingProducer').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const BlazingProducerDetails = lazy(() =>
//     import(
//         'scenes/producer/blazing_producer_details/BlazingProducerDetails'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const EditProducerConfiguration = lazy(() =>
//     import(
//         'scenes/producer/edit_producer_configuration/EditProducerConfiguration'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllQuotas = lazy(() =>
//     import('scenes/quota/all_quotas/AllQuotas').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AllTopics = lazy(() =>
//     import('scenes/topic/all_topics/AllTopics').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const AlterTopicConfiguration = lazy(() =>
//     import(
//         'scenes/topic/alter_topic_configuration/AlterTopicConfiguration'
//     ).catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const CreateTopic = lazy(() =>
//     import('scenes/topic/create_topic/CreateTopic').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const TopicDetails = lazy(() =>
//     import('scenes/topic/topic_details/TopicDetails').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );

const CommonClusterRoutes = [
    <Route
        key="CLUSTERS"
        path="/clusters"
        element={
            <CommonRoutesHoc activeLink={{ id: 'CLUSTERS' }}>
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_DESCRIBE_CLUSTERS,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <AllClusters />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTERS_CREATE"
        path="/clusters/create"
        element={
            <CommonRoutesHoc activeLink={{ id: 'CLUSTERS' }}>
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CREATE_CLUSTER,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateCluster />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,

    // {/* CLUSTER Dashboard Routes */}
    <Route
        key="CLUSTER_DASHBOARD"
        path="/clusters/:clusterCode/dashboard"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ClusterDashboardPermissions
                                    .CLUSTER_DASHBOARD_PERMISSIONS
                                    .CLUSTER_DASHBOARD_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ClusterDashboardPermissions
                                    .CLUSTER_DASHBOARD_PERMISSIONS
                                    .VIEW_CLUSTER_DASHBOARD,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <ClusterDashboard />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_BROKER_DETAILS"
        path="/clusters/:clusterCode/brokers/:brokerId/configuration"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ClusterDashboardPermissions
                                    .CLUSTER_DASHBOARD_PERMISSIONS
                                    .CLUSTER_DASHBOARD_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ClusterDashboardPermissions
                                    .CLUSTER_DASHBOARD_PERMISSIONS
                                    .VIEW_CLUSTER_DASHBOARD,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <BrokerDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_EDIT"
        path="/clusters/:clusterCode/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'DASHBOARD',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_EDIT_CLUSTER,
                            authorizationType: 'MANAGEMENT',
                        },
                    ]}
                    renderForbidden
                >
                    <EditCluster />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_STREAMS"
        path="/clusters/:clusterCode/streams"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'STREAMS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                StreamPermissions.STREAM_PERMISSIONS
                                    .STREAM_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                StreamPermissions.STREAM_PERMISSIONS
                                    .DESCRIBE_STREAMS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AllKafkaStreams />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_TOPICS"
        path="/clusters/:clusterCode/topics"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'TOPIC',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .TOPIC_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .DESCRIBE_TOPICS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AllTopics />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_TOPICS_DETAILS"
        path="/clusters/:clusterCode/topics/:topic"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'TOPIC',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .TOPIC_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .DESCRIBE_TOPICS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <TopicDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_TOPICS_CREATE"
        path="/clusters/:clusterCode/topics/create"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'TOPIC',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .TOPIC_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS.CREATE_TOPIC,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <CreateTopic />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_TOPICS_ALTER"
        path="/clusters/:clusterCode/topics/:topic/configuration/alter"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'TOPIC',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .TOPIC_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                TopicPermissions.TOPIC_PERMISSIONS
                                    .ALTER_TOPIC_CONFIGURATION,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AlterTopicConfiguration />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_PRODUCER"
        path="/clusters/:clusterCode/producer/blazing_producer"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'PRODUCER',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ProducerPermissions.PRODUCER_PERMISSIONS
                                    .PRODUCER_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ProducerPermissions.PRODUCER_PERMISSIONS
                                    .PRODUCE,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <BlazingProducer />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_PRODUCER_CONFIGURATION_DETAILS"
        path="/clusters/:clusterCode/producer/configuration"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'PRODUCER',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ProducerPermissions.PRODUCER_PERMISSIONS
                                    .PRODUCER_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ProducerPermissions.PRODUCER_PERMISSIONS
                                    .DESCRIBE_PRODUCER_CONFIGURATION,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <BlazingProducerDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_PRODUCER_CONFIGURATION_EDIT"
        path="/clusters/:clusterCode/producer/configuration/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'PRODUCER',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ProducerPermissions.PRODUCER_PERMISSIONS
                                    .PRODUCER_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ProducerPermissions.PRODUCER_PERMISSIONS
                                    .EDIT_PRODUCER_CONFIGURATION,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <EditProducerConfiguration />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_CONSUMER"
        path="/clusters/:clusterCode/consumer/blazing_consumer"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'CONSUMER',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConsumerPermissions.CONSUMER_PERMISSIONS
                                    .CONSUMER_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ConsumerPermissions.CONSUMER_PERMISSIONS
                                    .CONSUME,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <BlazingConsumer />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_CONSUMER_CONFIGURATION_DETAILS"
        path="/clusters/:clusterCode/consumer/configuration"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'CONSUMER',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConsumerPermissions.CONSUMER_PERMISSIONS
                                    .CONSUMER_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ConsumerPermissions.CONSUMER_PERMISSIONS
                                    .DESCRIBE_CONSUMER_CONFIGURATION,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <BlazingConsumerDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_CONSUMER_CONFIGURATION_EDIT"
        path="/clusters/:clusterCode/consumer/configuration/edit"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'CONSUMER',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConsumerPermissions.CONSUMER_PERMISSIONS
                                    .CONSUMER_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ConsumerPermissions.CONSUMER_PERMISSIONS
                                    .EDIT_CONSUMER_CONFIGURATION,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <EditConsumerConfiguration />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_CONSUMER_GROUPS"
        path="/clusters/:clusterCode/consumer_groups"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'CONSUMER_GROUP',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConsumerGroupPermissions
                                    .CONSUMER_GROUP_PERMISSIONS
                                    .CONSUMER_GROUP_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ConsumerGroupPermissions
                                    .CONSUMER_GROUP_PERMISSIONS
                                    .DESCRIBE_CONSUMER_GROUPS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AllConsumerGroups />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_CONSUMER_GROUPS_DETAILS"
        path="/clusters/:clusterCode/consumer_groups/:consumerGroup"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'CONSUMER_GROUP',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                ConsumerGroupPermissions
                                    .CONSUMER_GROUP_PERMISSIONS
                                    .CONSUMER_GROUP_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                ConsumerGroupPermissions
                                    .CONSUMER_GROUP_PERMISSIONS
                                    .DESCRIBE_CONSUMER_GROUPS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <ConsumerGroupDetails />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_ACLS"
        path="/clusters/:clusterCode/acls"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'ACL',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                AclPermissions.ACL_PERMISSIONS
                                    .ACL_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                AclPermissions.ACL_PERMISSIONS.DESCRIBE_ACLS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AllAcls />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_DELEGATION_TOKENS"
        path="/clusters/:clusterCode/delegation_tokens"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'DELEGATION_TOKEN',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                DelegationTokenPermissions
                                    .DELEGATION_TOKEN_PERMISSIONS
                                    .DELEGATION_TOKEN_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                DelegationTokenPermissions
                                    .DELEGATION_TOKEN_PERMISSIONS
                                    .DESCRIBE_DELEGATION_TOKENS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AllDelegationTokens />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="CLUSTER_QUOTAS"
        path="/clusters/:clusterCode/quotas"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'CLUSTERS',
                    type: 'QUOTAS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ManagementClusterPermissions
                                    .MANAGEMENT_CLUSTER_PERMISSIONS
                                    .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
                            authorizationType: 'MANAGEMENT',
                        },
                        {
                            permission:
                                QuotaPermissions.QUOTA_PERMISSIONS
                                    .QUOTA_FEATURE_ENABLED,
                            authorizationType: 'CLUSTER',
                        },
                        {
                            permission:
                                QuotaPermissions.QUOTA_PERMISSIONS
                                    .DESCRIBE_QUOTAS,
                            authorizationType: 'CLUSTER',
                        },
                    ]}
                    renderForbidden
                >
                    <AllQuotas />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
];

export default CommonClusterRoutes;
