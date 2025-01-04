import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import kafkaConnectTypes from './types';

function testKafkaConnectClientConnectivity(
    url,
    basicAuthEnabled,
    basicAuthUsername,
    basicAuthPassword,
) {
    const loadingId = notifyLoading({
        title: 'Kafka Connect Client Connectivity',
        message: 'Testing Kafka Connect connectivity in progress...',
    });
    return {
        type: kafkaConnectTypes.TEST_KAFKA_CONNECT_CLIENT_CONNECTIVITY,
        payload: POST('/kafka-connects/servers/connectivity/client', {
            url,
            basicAuthEnabled,
            basicAuthUsername,
            basicAuthPassword,
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Kafka Connect Client Connectivity',
                    message: 'Kafka Connect Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Kafka Connect Client Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'Kafka Connect Client Connectivity',
            ignoreNotification: true,
        },
    };
}

function testKafkaConnectJmxConnectivity(
    jmxUrl: string,
    jmxEnvironment: string,
) {
    const loadingId = notifyLoading({
        title: 'Kafka Connect JMX Connectivity',
        message: 'Testing cluster jmx connectivity in progress...',
    });
    return {
        type: kafkaConnectTypes.TEST_KAFKA_CONNECT_JMX_CONNECTIVITY,
        payload: POST('/admin/clusters/connectivity/jmx', {
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Kafka Connect JMX Connectivity',
                    message: 'Kafka Connect JMX Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Kafka Connect JMX Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'Kafka Connect JMX Connectivity',
            ignoreNotification: true,
        },
    };
}

function createKafkaConnect(
    name,
    code,
    color,
    clusterCode,
    url,
    basicAuthEnabled,
    basicAuthUsername,
    basicAuthPassword,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    return {
        type: kafkaConnectTypes.CREATE_KAFKA_CONNECT,
        payload: POST('/kafka-connects/servers', {
            name,
            code,
            color,
            clusterCode,
            url,
            basicAuthEnabled,
            basicAuthUsername,
            basicAuthPassword,
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { kafkaConnectCode: code, context: 'Kafka Connect Creation' },
    };
}

function editKafkaConnect(
    code,
    color,
    clusterCode,
    url,
    basicAuthEnabled,
    basicAuthUsername,
    basicAuthPassword,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    return {
        type: kafkaConnectTypes.EDIT_KAFKA_CONNECT,
        payload: PUT(`/kafka-connects/servers/${code}/edit`, {
            color,
            clusterCode,
            url,
            basicAuthEnabled,
            basicAuthUsername,
            basicAuthPassword,
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { kafkaConnectCode: code, context: 'Kafka Connect Edit' },
    };
}

function deleteKafkaConnect(code) {
    return {
        type: kafkaConnectTypes.DELETE_KAFKA_CONNECT,
        payload: DELETE(`/kafka-connects/servers/${code}/delete`),
        meta: { kafkaConnectCode: code, context: 'Kafka Connect Deletion' },
    };
}

function getKafkaConnectDetails(code) {
    return {
        type: kafkaConnectTypes.GET_KAFKA_CONNECT_DETAILS,
        payload: GET(`/kafka-connects/servers/${code}/details`),
        meta: { kafkaConnectCode: code, context: 'Kafka Connect' },
    };
}

function getAllKafkaConnects() {
    return {
        type: kafkaConnectTypes.GET_ALL_KAFKA_CONNECTS,
        payload: GET('/kafka-connects/servers'),
        meta: { context: 'Kafka Connect' },
    };
}

function getKafkaConnectMeta(kafkaConnectCode) {
    return {
        type: kafkaConnectTypes.GET_KAFKA_CONNECT_META,
        payload: GET(`/kafka-connects/servers/meta`, {
            headers: { kafkaConnectCode },
        }),
        meta: { context: 'Kafka Connect' },
    };
}

function describeKafkaConnect(kafkaConnectCode) {
    return {
        type: kafkaConnectTypes.DESCRIBE_KAFKA_CONNECT,
        payload: GET(`/kafka-connects/servers/description`, {
            headers: { kafkaConnectCode },
        }),
        meta: {
            kafkaConnectCode,
            context: 'Kafka Connect Description',
            ignoreNotification: true,
            concurrencyIdentifier: kafkaConnectCode,
        },
    };
}

function monitorKafkaConnectServer(kafkaConnectCode) {
    return {
        type: kafkaConnectTypes.MONITOR_KAFKA_CONNECT,
        payload: GET(`/kafka-connects/servers/monitoring`, {
            headers: { kafkaConnectCode },
        }),
        meta: { kafkaConnectCode, context: 'Kafka Connect Monitoring' },
    };
}

const kafkaConnectActions = {
    describeKafkaConnect,
    testKafkaConnectClientConnectivity,
    testKafkaConnectJmxConnectivity,
    createKafkaConnect,
    editKafkaConnect,
    getAllKafkaConnects,
    getKafkaConnectMeta,
    deleteKafkaConnect,
    getKafkaConnectDetails,
    monitorKafkaConnectServer,
};

export default kafkaConnectActions;
