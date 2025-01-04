import {
    ITopicConfiguration,
    ITopicDetails,
    TopicDescription,
} from 'common/types/topic';

export type TopicReducerState = {
    isCreateTopicPending: boolean;
    isGetAllTopicsDescriptionsPendingByCluster: Map<string, boolean>;
    isDeleteTopicPending: boolean;
    isDeleteTopicRecordsPending: boolean;
    isGetTopicDetailsPending: boolean;
    isGetTopicConfigurationPending: boolean;
    isAlterTopicConfigurationPending: boolean;
    isIncreaseTopicPartitionsPending: boolean;
    topicDetails: ITopicDetails;
    topicConfiguration: ITopicConfiguration;
    topicsDescriptionsByCluster: Map<string, TopicDescription[]>;
    baseTopicsDescriptionsByCluster: Map<string, TopicDescription[]>;
};
