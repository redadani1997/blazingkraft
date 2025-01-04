import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { AdminConfiguration } from 'kafka/configuration/AdminConfiguration';
import {
    DELETE,
    DOWNLOAD_GET,
    GET,
    POST,
    POST_FORM,
    PUT,
} from 'rest/RestCalls';
import clusterTypes from './types';

function testClusterClientConnectivity(commonConfiguration: Map<string, any>) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            AdminConfiguration.configurations,
            commonConfiguration,
        );
    const loadingId = notifyLoading({
        title: 'Cluster Client Connectivity',
        message: 'Testing cluster client connectivity in progress...',
    });
    return {
        type: clusterTypes.TEST_CLUSTER_CLIENT_CONNECTIVITY,
        payload: POST('/admin/clusters/connectivity/client', {
            commonConfiguration: CommonUtils.mapToObject(
                cleanedConfigurationValues,
            ),
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Cluster Client Connectivity',
                    message: 'Cluster Client Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Cluster Client Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'Cluster Client Connectivity',
            ignoreNotification: true,
        },
    };
}

function testClusterJmxConnectivity(jmxUrl: string, jmxEnvironment: string) {
    const loadingId = notifyLoading({
        title: 'Cluster JMX Connectivity',
        message: 'Testing cluster jmx connectivity in progress...',
    });
    return {
        type: clusterTypes.TEST_CLUSTER_JMX_CONNECTIVITY,
        payload: POST('/admin/clusters/connectivity/jmx', {
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Cluster JMX Connectivity',
                    message: 'Cluster JMX Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Cluster JMX Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'Cluster JMX Connectivity',
            ignoreNotification: true,
        },
    };
}

function createCluster(
    name,
    code,
    color,
    schemaRegistryCode,
    commonConfiguration: Map<string, any>,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            AdminConfiguration.configurations,
            commonConfiguration,
        );
    return {
        type: clusterTypes.CREATE_CLUSTER,
        payload: POST('/admin/clusters', {
            name,
            code,
            color,
            schemaRegistryCode,
            commonConfiguration: Object.fromEntries(cleanedConfigurationValues),
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { clusterCode: code, context: 'Cluster Creation' },
    };
}

function getAllClusters() {
    return {
        type: clusterTypes.GET_ALL_CLUSTERS,
        payload: GET('/admin/clusters'),
        meta: { context: 'Clusters' },
    };
}

function getClusterMeta(clusterCode) {
    return {
        type: clusterTypes.GET_CLUSTER_META,
        payload: GET(`/admin/clusters/${clusterCode}/meta`),
        meta: { context: 'Clusters' },
    };
}

function getClusterDetails(clusterCode) {
    return {
        type: clusterTypes.GET_CLUSTER_DETAILS,
        payload: GET(`/admin/clusters/${clusterCode}/details`),
        meta: { context: 'Cluster Configuration' },
    };
}

function deleteCluster(clusterCode) {
    return {
        type: clusterTypes.DELETE_CLUSTER,
        payload: DELETE(`/admin/clusters/${clusterCode}/delete`),
        meta: { context: 'Cluster Deletion', clusterCode },
    };
}

function editCluster(
    code,
    color,
    schemaRegistryCode,
    commonConfiguration: Map<string, any>,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            AdminConfiguration.configurations,
            commonConfiguration,
        );
    return {
        type: clusterTypes.EDIT_CLUSTER,
        payload: PUT(`/admin/clusters/${code}/edit`, {
            color,
            schemaRegistryCode,
            commonConfiguration: Object.fromEntries(cleanedConfigurationValues),
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { clusterCode: code, context: 'Cluster Edit' },
    };
}

function exportCluster(clusterCode) {
    return {
        type: clusterTypes.EXPORT_CLUSTER,
        payload: DOWNLOAD_GET(`/admin/clusters/${clusterCode}/export`),
        meta: { context: 'Cluster Export', clusterCode },
    };
}

function importCluster(zipFile) {
    return {
        type: clusterTypes.IMPORT_CLUSTER,
        payload: POST_FORM(`/admin/clusters/import`, {
            zipFile,
        }),
        meta: { context: 'Cluster Import' },
    };
}

function describeCluster(clusterCode) {
    return {
        type: clusterTypes.DESCRIBE_CLUSTER,
        payload: GET(`/admin/clusters/description`, {
            headers: { clusterCode },
        }),
        meta: {
            clusterCode,
            context: 'Cluster Description',
            ignoreNotification: true,
            concurrencyIdentifier: clusterCode,
        },
    };
}

function monitorCluster(clusterCode) {
    return {
        type: clusterTypes.MONITOR_CLUSTER,
        payload: GET(`/admin/clusters/monitoring`, {
            headers: { clusterCode },
        }),
        meta: {
            clusterCode,
            context: 'Cluster Monitoring',
        },
    };
}

function getClusterBrokersDetails(clusterCode) {
    return {
        type: clusterTypes.GET_CLUSTER_BROKERS_DETAILS,
        payload: GET(`/admin/clusters/brokers/details`, {
            headers: { clusterCode },
        }),
        meta: {
            clusterCode,
            context: 'Cluster Brokers Details',
        },
    };
}

function getClusterBrokerConfiguration(brokerId, clusterCode) {
    return {
        type: clusterTypes.GET_CLUSTER_BROKER_CONFIGURATION,
        payload: GET(`/admin/clusters/brokers/${brokerId}/configuration`, {
            headers: { clusterCode },
        }),
        meta: {
            clusterCode,
            context: 'Cluster Broker Configuration',
        },
    };
}

const clusterActions = {
    testClusterClientConnectivity,
    testClusterJmxConnectivity,
    createCluster,
    getAllClusters,
    getClusterMeta,
    deleteCluster,
    editCluster,
    exportCluster,
    importCluster,
    getClusterDetails,
    describeCluster,
    monitorCluster,
    getClusterBrokersDetails,
    getClusterBrokerConfiguration,
};

export default clusterActions;
