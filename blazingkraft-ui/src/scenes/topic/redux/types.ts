const topicTypes = {
    GET_ALL_TOPICS_LISTINGS: 'GET_ALL_TOPICS_LISTINGS',
    GET_ALL_TOPICS_LISTINGS_PENDING: 'GET_ALL_TOPICS_LISTINGS_PENDING',
    GET_ALL_TOPICS_LISTINGS_FULFILLED: 'GET_ALL_TOPICS_LISTINGS_FULFILLED',
    GET_ALL_TOPICS_LISTINGS_REJECTED: 'GET_ALL_TOPICS_LISTINGS_REJECTED',

    GET_ALL_TOPICS_DESCRIPTIONS: 'GET_ALL_TOPICS_DESCRIPTIONS',
    GET_ALL_TOPICS_DESCRIPTIONS_PENDING: 'GET_ALL_TOPICS_DESCRIPTIONS_PENDING',
    GET_ALL_TOPICS_DESCRIPTIONS_FULFILLED:
        'GET_ALL_TOPICS_DESCRIPTIONS_FULFILLED',
    GET_ALL_TOPICS_DESCRIPTIONS_REJECTED:
        'GET_ALL_TOPICS_DESCRIPTIONS_REJECTED',

    CREATE_TOPIC: 'CREATE_TOPIC',
    CREATE_TOPIC_PENDING: 'CREATE_TOPIC_PENDING',
    CREATE_TOPIC_FULFILLED: 'CREATE_TOPIC_FULFILLED',
    CREATE_TOPIC_REJECTED: 'CREATE_TOPIC_REJECTED',

    DELETE_TOPIC: 'DELETE_TOPIC',
    DELETE_TOPIC_PENDING: 'DELETE_TOPIC_PENDING',
    DELETE_TOPIC_FULFILLED: 'DELETE_TOPIC_FULFILLED',
    DELETE_TOPIC_REJECTED: 'DELETE_TOPIC_REJECTED',

    DELETE_TOPIC_RECORDS: 'DELETE_TOPIC_RECORDS',
    DELETE_TOPIC_RECORDS_PENDING: 'DELETE_TOPIC_RECORDS_PENDING',
    DELETE_TOPIC_RECORDS_FULFILLED: 'DELETE_TOPIC_RECORDS_FULFILLED',
    DELETE_TOPIC_RECORDS_REJECTED: 'DELETE_TOPIC_RECORDS_REJECTED',

    GET_TOPIC_DETAILS: 'GET_TOPIC_DETAILS',
    GET_TOPIC_DETAILS_PENDING: 'GET_TOPIC_DETAILS_PENDING',
    GET_TOPIC_DETAILS_FULFILLED: 'GET_TOPIC_DETAILS_FULFILLED',
    GET_TOPIC_DETAILS_REJECTED: 'GET_TOPIC_DETAILS_REJECTED',

    GET_TOPIC_CONFIGURATION: 'GET_TOPIC_CONFIGURATION',
    GET_TOPIC_CONFIGURATION_PENDING: 'GET_TOPIC_CONFIGURATION_PENDING',
    GET_TOPIC_CONFIGURATION_FULFILLED: 'GET_TOPIC_CONFIGURATION_FULFILLED',
    GET_TOPIC_CONFIGURATION_REJECTED: 'GET_TOPIC_CONFIGURATION_REJECTED',

    ALTER_TOPIC_CONFIGURATION: 'ALTER_TOPIC_CONFIGURATION',
    ALTER_TOPIC_CONFIGURATION_PENDING: 'ALTER_TOPIC_CONFIGURATION_PENDING',
    ALTER_TOPIC_CONFIGURATION_FULFILLED: 'ALTER_TOPIC_CONFIGURATION_FULFILLED',
    ALTER_TOPIC_CONFIGURATION_REJECTED: 'ALTER_TOPIC_CONFIGURATION_REJECTED',

    INCREASE_TOPIC_PARTITIONS: 'INCREASE_TOPIC_PARTITIONS',
    INCREASE_TOPIC_PARTITIONS_PENDING: 'INCREASE_TOPIC_PARTITIONS_PENDING',
    INCREASE_TOPIC_PARTITIONS_FULFILLED: 'INCREASE_TOPIC_PARTITIONS_FULFILLED',
    INCREASE_TOPIC_PARTITIONS_REJECTED: 'INCREASE_TOPIC_PARTITIONS_REJECTED',

    ADD_FAVORITE_TOPIC: 'ADD_FAVORITE_TOPIC',
    REMOVE_FAVORITE_TOPIC: 'REMOVE_FAVORITE_TOPIC',
};

export default topicTypes;
