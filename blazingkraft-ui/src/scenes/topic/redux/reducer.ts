import { TopicDescription } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { TopicReducerState } from '.';
import topicTypes from './types';

const initialState: TopicReducerState = {
    isCreateTopicPending: false,
    isDeleteTopicPending: false,
    isDeleteTopicRecordsPending: false,
    isGetTopicConfigurationPending: false,
    isGetTopicDetailsPending: false,
    isAlterTopicConfigurationPending: false,
    isIncreaseTopicPartitionsPending: false,
    topicDetails: {
        topicDescription: null,
        earliestOffsetInfos: [],
        latestOffsetInfos: [],
        partitionsDetails: [],
    },
    topicConfiguration: {
        topicConfiguration: new Map(),
    },
    isGetAllTopicsDescriptionsPendingByCluster: new Map(),
    topicsDescriptionsByCluster: new Map(),
    baseTopicsDescriptionsByCluster: new Map(),
};

function handleFavoriteTopics(
    topicsDescriptions: TopicDescription[],
    favoriteTopics: string[],
    initialLoad,
): TopicDescription[] {
    if (initialLoad && favoriteTopics.length === 0) {
        return topicsDescriptions;
    }
    const favoriteTopicsSet = new Set(favoriteTopics);
    const nonFavoriteTopicsDescriptions = topicsDescriptions
        .filter(
            topicDescription => !favoriteTopicsSet.has(topicDescription.name),
        )
        .map(topicDescription => ({ ...topicDescription, isFavorite: false }));

    const favoriteTopicsDescriptions = topicsDescriptions
        .filter(topicDescription =>
            favoriteTopicsSet.has(topicDescription.name),
        )
        .map(topicDescription => ({ ...topicDescription, isFavorite: true }))
        .sort((a, b) => {
            if (a?.name < b?.name) {
                return -1;
            }
            if (a?.name > b?.name) {
                return 1;
            }
            return 0;
        });

    return [...favoriteTopicsDescriptions, ...nonFavoriteTopicsDescriptions];
}

function topicReducer(
    state = initialState,
    action: ReduxAction,
): TopicReducerState {
    switch (action.type) {
        // CREATE_TOPIC
        case topicTypes.CREATE_TOPIC_PENDING:
            return {
                ...state,
                isCreateTopicPending: true,
            };
        case topicTypes.CREATE_TOPIC_FULFILLED: {
            const { clusterCode } = action.meta;
            const newTopicsDescriptionsByCluster = new Map(
                state.topicsDescriptionsByCluster,
            );
            newTopicsDescriptionsByCluster.delete(clusterCode);
            return {
                ...state,
                isCreateTopicPending: false,
                topicsDescriptionsByCluster: newTopicsDescriptionsByCluster,
            };
        }
        case topicTypes.CREATE_TOPIC_REJECTED:
            return {
                ...state,
                isCreateTopicPending: false,
            };

        // GET_ALL_TOPICS_DESCRIPTIONS
        case topicTypes.GET_ALL_TOPICS_DESCRIPTIONS_PENDING: {
            const { clusterCode } = action.meta;
            const newIsGetAllTopicsDescriptionsPendingByCluster = new Map(
                state.isGetAllTopicsDescriptionsPendingByCluster,
            );
            newIsGetAllTopicsDescriptionsPendingByCluster.set(
                clusterCode,
                true,
            );
            return {
                ...state,
                isGetAllTopicsDescriptionsPendingByCluster:
                    newIsGetAllTopicsDescriptionsPendingByCluster,
            };
        }
        case topicTypes.GET_ALL_TOPICS_DESCRIPTIONS_FULFILLED: {
            const { clusterCode, favoriteTopics } = action.meta;
            const newTopicsDescriptionsByCluster = new Map(
                state.topicsDescriptionsByCluster,
            );
            const newIsGetAllTopicsDescriptionsPendingByCluster = new Map(
                state.isGetAllTopicsDescriptionsPendingByCluster,
            );
            const newBaseTopicsDescriptionsByCluster = new Map(
                state.baseTopicsDescriptionsByCluster,
            );

            newIsGetAllTopicsDescriptionsPendingByCluster.set(
                clusterCode,
                false,
            );
            const topicDescriptions: TopicDescription[] = action.payload.map(
                (topicDescription: TopicDescription) => {
                    const isr = topicDescription.partitions.reduce(
                        (acc, partition) => acc + partition.isr.length,
                        0,
                    );
                    const replicas = topicDescription.partitions.reduce(
                        (acc, partition) => acc + partition.replicas.length,
                        0,
                    );
                    return {
                        ...topicDescription,
                        isr,
                        replicas,
                    };
                },
            );
            const topicDescriptionsWithFavorite = handleFavoriteTopics(
                topicDescriptions,
                favoriteTopics,
                true,
            );

            newBaseTopicsDescriptionsByCluster.set(
                clusterCode,
                topicDescriptions,
            );
            newTopicsDescriptionsByCluster.set(
                clusterCode,
                topicDescriptionsWithFavorite,
            );
            return {
                ...state,
                topicsDescriptionsByCluster: newTopicsDescriptionsByCluster,
                baseTopicsDescriptionsByCluster:
                    newBaseTopicsDescriptionsByCluster,
                isGetAllTopicsDescriptionsPendingByCluster:
                    newIsGetAllTopicsDescriptionsPendingByCluster,
            };
        }
        case topicTypes.GET_ALL_TOPICS_DESCRIPTIONS_REJECTED: {
            const { clusterCode } = action.meta;
            const newTopicsDescriptionsByCluster = new Map(
                state.topicsDescriptionsByCluster,
            );
            const newIsGetAllTopicsDescriptionsPendingByCluster = new Map(
                state.isGetAllTopicsDescriptionsPendingByCluster,
            );
            newIsGetAllTopicsDescriptionsPendingByCluster.set(
                clusterCode,
                false,
            );
            newTopicsDescriptionsByCluster.delete(clusterCode);
            return {
                ...state,
                topicsDescriptionsByCluster: newTopicsDescriptionsByCluster,
                isGetAllTopicsDescriptionsPendingByCluster:
                    newIsGetAllTopicsDescriptionsPendingByCluster,
            };
        }

        // DELETE_TOPIC
        case topicTypes.DELETE_TOPIC_PENDING:
            return {
                ...state,
                isDeleteTopicPending: true,
            };
        case topicTypes.DELETE_TOPIC_FULFILLED: {
            const { clusterCode } = action.meta;
            const newTopicsDescriptionsByCluster = new Map(
                state.topicsDescriptionsByCluster,
            );
            const newBaseTopicsDescriptionsByCluster = new Map(
                state.baseTopicsDescriptionsByCluster,
            );
            newTopicsDescriptionsByCluster.delete(clusterCode);
            newBaseTopicsDescriptionsByCluster.delete(clusterCode);
            return {
                ...state,
                isDeleteTopicPending: false,
                topicsDescriptionsByCluster: newTopicsDescriptionsByCluster,
                baseTopicsDescriptionsByCluster:
                    newBaseTopicsDescriptionsByCluster,
            };
        }
        case topicTypes.DELETE_TOPIC_REJECTED:
            return {
                ...state,
                isDeleteTopicPending: false,
            };

        // DELETE_TOPIC_RECORDS
        case topicTypes.DELETE_TOPIC_RECORDS_PENDING:
            return {
                ...state,
                isDeleteTopicRecordsPending: true,
            };
        case topicTypes.DELETE_TOPIC_RECORDS_FULFILLED:
        case topicTypes.DELETE_TOPIC_RECORDS_REJECTED:
            return {
                ...state,
                isDeleteTopicRecordsPending: false,
            };

        // GET_TOPIC_CONFIGURATION
        case topicTypes.GET_TOPIC_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetTopicConfigurationPending: true,
            };
        case topicTypes.GET_TOPIC_CONFIGURATION_FULFILLED: {
            const { topicConfiguration } = action.payload;
            const newConfiguration =
                CommonUtils.objectToMap(topicConfiguration);
            return {
                ...state,
                isGetTopicConfigurationPending: false,
                topicConfiguration: {
                    topicConfiguration: newConfiguration,
                },
            };
        }
        case topicTypes.GET_TOPIC_CONFIGURATION_REJECTED:
            return {
                ...state,
                isGetTopicConfigurationPending: false,
                topicConfiguration: {
                    topicConfiguration: new Map(),
                },
            };

        // GET_TOPIC_DETAILS
        case topicTypes.GET_TOPIC_DETAILS_PENDING:
            return {
                ...state,
                isGetTopicDetailsPending: true,
            };
        case topicTypes.GET_TOPIC_DETAILS_FULFILLED: {
            const {
                topicDescription,
                earliestOffsetInfos,
                latestOffsetInfos,
                partitionsDetails,
            } = action.payload;

            const isr = topicDescription.partitions.reduce(
                (acc, partition) => acc + partition.isr.length,
                0,
            );
            const replicas = topicDescription.partitions.reduce(
                (acc, partition) => acc + partition.replicas.length,
                0,
            );
            const computedTopicDescription: TopicDescription = {
                ...topicDescription,
                isr,
                replicas,
            };
            return {
                ...state,
                isGetTopicDetailsPending: false,
                topicDetails: {
                    topicDescription: computedTopicDescription,
                    earliestOffsetInfos,
                    latestOffsetInfos,
                    partitionsDetails,
                },
            };
        }
        case topicTypes.GET_TOPIC_DETAILS_REJECTED:
            return {
                ...state,
                isGetTopicDetailsPending: false,
                topicDetails: {
                    topicDescription: null,
                    earliestOffsetInfos: [],
                    latestOffsetInfos: [],
                    partitionsDetails: [],
                },
            };

        // ALTER_TOPIC_CONFIGURATION
        case topicTypes.ALTER_TOPIC_CONFIGURATION_PENDING:
            return {
                ...state,

                isAlterTopicConfigurationPending: true,
            };
        case topicTypes.ALTER_TOPIC_CONFIGURATION_FULFILLED:
        case topicTypes.ALTER_TOPIC_CONFIGURATION_REJECTED:
            return {
                ...state,
                isAlterTopicConfigurationPending: false,
            };

        // INCREASE_TOPIC_PARTITIONS
        case topicTypes.INCREASE_TOPIC_PARTITIONS_PENDING:
            return {
                ...state,
                isIncreaseTopicPartitionsPending: true,
            };
        case topicTypes.INCREASE_TOPIC_PARTITIONS_FULFILLED: {
            const { clusterCode } = action.meta;
            const newTopicsDescriptionsByCluster = new Map(
                state.topicsDescriptionsByCluster,
            );
            const newBaseTopicsDescriptionsByCluster = new Map(
                state.baseTopicsDescriptionsByCluster,
            );
            newTopicsDescriptionsByCluster.delete(clusterCode);
            newBaseTopicsDescriptionsByCluster.delete(clusterCode);
            return {
                ...state,
                isIncreaseTopicPartitionsPending: false,
                topicsDescriptionsByCluster: newTopicsDescriptionsByCluster,
                baseTopicsDescriptionsByCluster:
                    newBaseTopicsDescriptionsByCluster,
            };
        }
        case topicTypes.INCREASE_TOPIC_PARTITIONS_REJECTED:
            return {
                ...state,
                isIncreaseTopicPartitionsPending: false,
            };

        // ADD_FAVORITE_TOPIC
        case topicTypes.REMOVE_FAVORITE_TOPIC:
        case topicTypes.ADD_FAVORITE_TOPIC: {
            const { clusterCode } = action.meta;
            const favoriteTopics = action.payload;
            const newTopicsDescriptionsByCluster = new Map(
                state.topicsDescriptionsByCluster,
            );
            const baseTopicsDescriptionsByCluster = new Map(
                state.baseTopicsDescriptionsByCluster,
            );
            const baseTopicsDescriptions =
                baseTopicsDescriptionsByCluster.get(clusterCode);

            const topicDescriptionsWithFavorite = handleFavoriteTopics(
                baseTopicsDescriptions,
                favoriteTopics,
                false,
            );
            newTopicsDescriptionsByCluster.set(
                clusterCode,
                topicDescriptionsWithFavorite,
            );
            return {
                ...state,
                topicsDescriptionsByCluster: newTopicsDescriptionsByCluster,
            };
        }

        default:
            return state;
    }
}

export default topicReducer;
