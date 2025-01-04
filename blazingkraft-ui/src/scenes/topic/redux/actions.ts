import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { TopicConfiguration } from 'kafka/configuration/TopicConfiguration';
import { ReduxStore } from 'redux_config/reducers';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import topicTypes from './types';

function createTopic(
    name,
    numPartitions: number,
    replicationFactor: number,
    configurationValues: Map<string, any>,
    clusterCode,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            TopicConfiguration.configurations,
            configurationValues,
        );
    return {
        type: topicTypes.CREATE_TOPIC,
        payload: POST(
            '/admin/topics',
            {
                name,
                numPartitions,
                replicationFactor,
                configuration: Object.fromEntries(cleanedConfigurationValues),
            },
            { headers: { clusterCode } },
        ),
        meta: { clusterCode, topicName: name, context: 'Topic Creation' },
    };
}

function getFavoriteTopics() {
    try {
        const favoriteTopics = localStorage.getItem(
            'Blazing KRaft Favorite Topics',
        );
        if (!favoriteTopics) {
            return [];
        }
        const parsed = JSON.parse(favoriteTopics);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;
    } catch (err) {
        return [];
    }
}

function getAllTopicsDescriptions(reload, clusterCode) {
    return (dispatch, getStore) => {
        const store: ReduxStore = getStore();
        const hasDescriptions =
            store.topicReducer.topicsDescriptionsByCluster.has(clusterCode);
        if (!reload && hasDescriptions) {
            return;
        }
        const favoriteTopics = getFavoriteTopics();

        return dispatch({
            type: topicTypes.GET_ALL_TOPICS_DESCRIPTIONS,
            payload: GET('/admin/topics/descriptions', {
                headers: { clusterCode },
            }),
            meta: {
                context: 'Topics',
                clusterCode,
                concurrencyIdentifier: clusterCode,
                favoriteTopics,
            },
        });
    };
}

function setFavoriteTopics(favoriteTopics) {
    try {
        localStorage.setItem(
            'Blazing KRaft Favorite Topics',
            CommonUtils.beautifyJson(favoriteTopics),
        );
    } catch (err) {
        // no-op
    }
}

function addFavoriteTopic(topic, clusterCode) {
    const favoriteTopics = getFavoriteTopics();
    if (!favoriteTopics.includes(topic)) {
        favoriteTopics.push(topic);
    }
    setFavoriteTopics(favoriteTopics);
    return {
        type: topicTypes.ADD_FAVORITE_TOPIC,
        payload: favoriteTopics,
        meta: {
            clusterCode,
        },
    };
}

function removeFavoriteTopic(topic, clusterCode) {
    let favoriteTopics = getFavoriteTopics();
    if (favoriteTopics.includes(topic)) {
        favoriteTopics = favoriteTopics.filter(
            topicName => topicName !== topic,
        );
    }
    setFavoriteTopics(favoriteTopics);
    return {
        type: topicTypes.REMOVE_FAVORITE_TOPIC,
        payload: favoriteTopics,
        meta: {
            clusterCode,
        },
    };
}

function deleteTopic(topicName, clusterCode) {
    return {
        type: topicTypes.DELETE_TOPIC,
        payload: DELETE(`/admin/topics/${topicName}`, {
            headers: { clusterCode },
        }),
        meta: { topicName, clusterCode, context: 'Topic Deletion' },
    };
}

function deleteTopicRecords(
    topicName,
    partitionsOffset: { partition: number; offset: number }[],
    clusterCode,
) {
    return {
        type: topicTypes.DELETE_TOPIC_RECORDS,
        payload: PUT(
            `/admin/topics/${topicName}/records`,
            {
                partitionsOffset,
            },
            {
                headers: { clusterCode },
            },
        ),
        meta: {
            topicName,
            clusterCode,
            context: 'Topic Records Deletion',
        },
    };
}

function increaseTopicPartitions(topicName, increaseTo: number, clusterCode) {
    return {
        type: topicTypes.INCREASE_TOPIC_PARTITIONS,
        payload: PUT(
            `/admin/topics/${topicName}/partitions`,
            {
                increaseTo,
            },
            {
                headers: { clusterCode },
            },
        ),
        meta: {
            topicName,
            increaseTo,
            clusterCode,
            context: 'Topic Partitions Increase',
        },
    };
}

function getTopicDetails(topicName, clusterCode) {
    return {
        type: topicTypes.GET_TOPIC_DETAILS,
        payload: GET(`/admin/topics/${topicName}/details`, {
            headers: { clusterCode },
        }),
        meta: { topicName, context: 'Topic Details' },
    };
}

function getTopicConfiguration(topicName, clusterCode) {
    return {
        type: topicTypes.GET_TOPIC_CONFIGURATION,
        payload: GET(`/admin/topics/${topicName}/configuration`, {
            headers: { clusterCode },
        }),
        meta: { topicName, context: 'Topic Configuration' },
    };
}

function alterTopicConfiguration(
    topicName,
    configurationValues: Map<string, string>,
    clusterCode,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            TopicConfiguration.configurations,
            configurationValues,
        );
    return {
        type: topicTypes.ALTER_TOPIC_CONFIGURATION,
        payload: PUT(
            `/admin/topics/${topicName}/configuration`,
            {
                configuration: CommonUtils.mapToObject(
                    cleanedConfigurationValues,
                ),
            },
            {
                headers: { clusterCode },
            },
        ),
        meta: { topicName, clusterCode, context: 'Topic Configuration' },
    };
}

const topicActions = {
    createTopic,
    getAllTopicsDescriptions,
    deleteTopic,
    deleteTopicRecords,
    increaseTopicPartitions,
    getTopicDetails,
    getTopicConfiguration,
    alterTopicConfiguration,
    addFavoriteTopic,
    removeFavoriteTopic,
};

export default topicActions;
