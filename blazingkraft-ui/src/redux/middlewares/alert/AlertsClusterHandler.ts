import { notifySuccess } from 'common/notifications/Notifications';
import aclTypes from 'scenes/acl/redux/types';
import clusterTypes from 'scenes/cluster/redux/types';
import consumerTypes from 'scenes/consumer/redux/types';
import consumerGroupTypes from 'scenes/consumer_group/redux/types';
import delegationTokenTypes from 'scenes/delegation_token/redux/types';
import offsetTypes from 'scenes/offset/redux/types';
import producerTypes from 'scenes/producer/redux/types';
import quotaTypes from 'scenes/quota/redux/types';
import topicTypes from 'scenes/topic/redux/types';

function handle(action): boolean {
    switch (action.type) {
        case clusterTypes.CREATE_CLUSTER_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Cluster '${action.meta.clusterCode}' created Successfully`,
            });
            return true;
        }
        case clusterTypes.IMPORT_CLUSTER_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Cluster '${action.payload.code}' created Successfully`,
            });
            return true;
        }
        case clusterTypes.EXPORT_CLUSTER_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Cluster '${action.meta.clusterCode}' exported Successfully`,
            });
            return true;
        }
        case clusterTypes.DELETE_CLUSTER_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Cluster '${action.meta.clusterCode}' deleted Successfully`,
            });
            return true;
        }
        case clusterTypes.EDIT_CLUSTER_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Cluster '${action.meta.clusterCode}' edited Successfully`,
            });
            return true;
        }
        case consumerTypes.EDIT_CONSUMER_CONFIGURATION_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Consumer Configuration for Cluster '${action.meta.clusterCode}' edited Successfully`,
            });
            return true;
        }
        case consumerTypes.EXPORT_CONSUMER_RECORDS_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Consumer Records exported Successfully`,
            });
            return true;
        }
        case producerTypes.EDIT_PRODUCER_CONFIGURATION_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Producer Configuration for Cluster '${action.meta.clusterCode}' edited Successfully`,
            });
            return true;
        }
        case producerTypes.IMPORT_BLAZING_RECORDS_FULFILLED: {
            const { context, async } = action.meta;
            const records = action.payload?.length || 0;

            notifySuccess({
                title: context,
                message: async
                    ? `Asynchnously Imported Records`
                    : `Successfully Imported '${records}' Records`,
            });
            return true;
        }
        case consumerGroupTypes.DELETE_CONSUMER_GROUP_FULFILLED: {
            const { context, consumerGroup } = action.meta;
            notifySuccess({
                title: context,
                message: `Consumer Group '${consumerGroup}' deleted Successfully.`,
            });
            return true;
        }
        case offsetTypes.ALTER_CONSUMER_GROUP_OFFSETS_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Consumer Group's Offsets altered Successfully.`,
            });
            return true;
        }
        case offsetTypes.DELETE_CONSUMER_GROUP_OFFSETS_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Consumer Group's Offsets cleared Successfully.`,
            });
            return true;
        }
        case consumerGroupTypes.DELETE_MEMBER_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Consumer Group's Member deleted Successfully.`,
            });
            return true;
        }
        case aclTypes.CREATE_ACL_BINDING_FULFILLED: {
            const { context, principal } = action.meta;
            notifySuccess({
                title: context,
                message: `ACL Binding created Successfully for Principal '${principal}'.`,
            });
            return true;
        }
        case aclTypes.DELETE_ACL_BINDING_FULFILLED: {
            const { context, principal } = action.meta;
            notifySuccess({
                title: context,
                message: `ACL Binding deleted Successfully for Principal '${principal}'.`,
            });
            return true;
        }
        case delegationTokenTypes.CREATE_DELEGATION_TOKEN_FULFILLED: {
            const tokenId = action.payload?.tokenInformation?.tokenId;
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Delegation Token with Token Id '${tokenId}' created Successfully.`,
            });
            return true;
        }
        case delegationTokenTypes.EXPIRE_DELEGATION_TOKEN_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Delegation Token expired Successfully.`,
            });
            return true;
        }
        case delegationTokenTypes.RENEW_DELEGATION_TOKEN_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Delegation Token renewed Successfully.`,
            });
            return true;
        }
        case quotaTypes.ALTER_QUOTA_FULFILLED: {
            const { context } = action.meta;
            notifySuccess({
                title: context,
                message: `Quotas altered Successfully.`,
            });
            return true;
        }
        case topicTypes.CREATE_TOPIC_FULFILLED: {
            const { context, topicName } = action.meta;
            notifySuccess({
                title: context,
                message: `Topic '${topicName}' created Successfully.`,
            });
            return true;
        }
        case topicTypes.DELETE_TOPIC_FULFILLED: {
            const { context, topicName } = action.meta;
            notifySuccess({
                title: context,
                message: `Topic '${topicName}' deleted Successfully.`,
            });
            return true;
        }
        case topicTypes.DELETE_TOPIC_RECORDS_FULFILLED: {
            const { context, topicName } = action.meta;
            notifySuccess({
                title: context,
                message: `Records for Topic '${topicName}' deleted Successfully.`,
            });
            return true;
        }
        case topicTypes.INCREASE_TOPIC_PARTITIONS_FULFILLED: {
            const { context, topicName, increaseTo } = action.meta;
            notifySuccess({
                title: context,
                message: `Partitions Successfully increased to '${increaseTo}' for Topic '${topicName}' .`,
            });
            return true;
        }
        case topicTypes.ALTER_TOPIC_CONFIGURATION_FULFILLED: {
            const { context, topicName } = action.meta;
            notifySuccess({
                title: context,
                message: `Configuration for Topic '${topicName}' altered Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsClusterHandler = {
    handle,
};

export { AlertsClusterHandler };
