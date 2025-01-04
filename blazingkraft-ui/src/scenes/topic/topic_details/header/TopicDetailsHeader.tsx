import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import TopicDetailsHeaderComponent from './TopicDetailsHeaderComponent';

interface TopicDetailsHeaderProps {
    refreshPageContent: () => void;
}

const TopicDetailsHeader = ({
    refreshPageContent,
}: TopicDetailsHeaderProps) => {
    // Map State To Props
    const {
        isGetTopicDetailsPending,
        isGetTopicConfigurationPending,
        topicDetails,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetTopicDetailsPending:
                store.topicReducer.isGetTopicDetailsPending,
            isGetTopicConfigurationPending:
                store.topicReducer.isGetTopicConfigurationPending,
            topicDetails: store.topicReducer.topicDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedProduce } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: ProducerPermissions.PRODUCER_PERMISSIONS.PRODUCE,
            },
        ],
    });
    const { isAuthorized: isAuthorizedConsume } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: ConsumerPermissions.CONSUMER_PERMISSIONS.CONSUME,
            },
        ],
    });
    const { isAuthorized: isAuthorizedDeleteTopic } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: TopicPermissions.TOPIC_PERMISSIONS.DELETE_TOPIC,
            },
        ],
    });
    const { isAuthorized: isAuthorizedDeleteTopicRecords } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    TopicPermissions.TOPIC_PERMISSIONS.DELETE_TOPIC_RECORDS,
            },
        ],
    });
    const { isAuthorized: isAuthorizedIncreaseTopicPartitions } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        TopicPermissions.TOPIC_PERMISSIONS
                            .INCREASE_TOPIC_PARTITIONS,
                },
            ],
        });
    const { isAuthorized: isAuthorizedAlterTopicConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        TopicPermissions.TOPIC_PERMISSIONS
                            .ALTER_TOPIC_CONFIGURATION,
                },
            ],
        });

    return (
        <TopicDetailsHeaderComponent
            isRefreshPageContentPending={
                isGetTopicDetailsPending || isGetTopicConfigurationPending
            }
            refreshPageContent={refreshPageContent}
            topicDetails={topicDetails}
            isAuthorizedConsume={isAuthorizedConsume}
            isAuthorizedProduce={isAuthorizedProduce}
            isAuthorizedDeleteTopic={isAuthorizedDeleteTopic}
            isAuthorizedDeleteTopicRecords={isAuthorizedDeleteTopicRecords}
            isAuthorizedIncreaseTopicPartitions={
                isAuthorizedIncreaseTopicPartitions
            }
            isAuthorizedAlterTopicConfiguration={
                isAuthorizedAlterTopicConfiguration
            }
        />
    );
};

export default TopicDetailsHeader;
