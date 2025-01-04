import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { ClusterReducerState } from '.';
import clusterTypes from './types';

const initialState: ClusterReducerState = {
    clusters: [],
    clusterDetails: null,
    clustersDescriptions: new Map(),
    clusterMonitoring: {},
    clusterBrokersDetails: [],
    clusterBrokerConfiguration: {
        configuration: [],
    },
    isGetAllClustersPending: false,
    isCreateClusterPending: false,
    isTestClusterClientConnectivityPending: false,
    isTestClusterJmxConnectivityPending: false,
    isDeleteClusterPending: false,
    isEditClusterPending: false,
    isExportClusterPending: false,
    isImportClusterPending: false,
    isGetClusterDetailsPending: false,
    isGetClustersDescriptionsPending: new Map(),
    isMonitorClusterPending: false,
    isGetClusterBrokersDetailsPending: false,
    isGetClusterBrokerConfiguration: false,
};

function clusterReducer(
    state = initialState,
    action: ReduxAction,
): ClusterReducerState {
    switch (action.type) {
        // TEST_CLUSTER_CLIENT_CONNECTIVITY
        case clusterTypes.TEST_CLUSTER_CLIENT_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestClusterClientConnectivityPending: true,
            };
        case clusterTypes.TEST_CLUSTER_CLIENT_CONNECTIVITY_FULFILLED:
        case clusterTypes.TEST_CLUSTER_CLIENT_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestClusterClientConnectivityPending: false,
            };

        // TEST_CLUSTER_JMX_CONNECTIVITY
        case clusterTypes.TEST_CLUSTER_JMX_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestClusterJmxConnectivityPending: true,
            };
        case clusterTypes.TEST_CLUSTER_JMX_CONNECTIVITY_FULFILLED:
        case clusterTypes.TEST_CLUSTER_JMX_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestClusterJmxConnectivityPending: false,
            };

        // CREATE_CLUSTER
        case clusterTypes.CREATE_CLUSTER_PENDING:
            return {
                ...state,
                isCreateClusterPending: true,
            };
        case clusterTypes.CREATE_CLUSTER_FULFILLED:
        case clusterTypes.CREATE_CLUSTER_REJECTED:
            return {
                ...state,
                isCreateClusterPending: false,
            };

        // GET_ALL_CLUSTERS
        case clusterTypes.GET_ALL_CLUSTERS_PENDING:
            return {
                ...state,
                isGetAllClustersPending: true,
            };
        case clusterTypes.GET_ALL_CLUSTERS_FULFILLED:
            return {
                ...state,
                clusters: action.payload,
                isGetAllClustersPending: false,
            };
        case clusterTypes.GET_ALL_CLUSTERS_REJECTED:
            return {
                ...state,
                isGetAllClustersPending: false,
                clusters: [],
            };

        // DELETE_CLUSTER
        case clusterTypes.DELETE_CLUSTER_PENDING:
            return {
                ...state,
                isDeleteClusterPending: true,
            };
        case clusterTypes.DELETE_CLUSTER_FULFILLED:
        case clusterTypes.DELETE_CLUSTER_REJECTED:
            return {
                ...state,
                isDeleteClusterPending: false,
            };

        // EDIT_CLUSTER
        case clusterTypes.EDIT_CLUSTER_PENDING:
            return {
                ...state,
                isEditClusterPending: true,
            };
        case clusterTypes.EDIT_CLUSTER_FULFILLED:
        case clusterTypes.EDIT_CLUSTER_REJECTED:
            return {
                ...state,
                isEditClusterPending: false,
            };

        // GET_CLUSTER_DETAILS
        case clusterTypes.GET_CLUSTER_DETAILS_PENDING:
            return {
                ...state,
                isGetClusterDetailsPending: true,
            };
        case clusterTypes.GET_CLUSTER_DETAILS_FULFILLED:
            return {
                ...state,
                clusterDetails: {
                    ...action.payload,
                    commonConfiguration: CommonUtils.objectToMap(
                        action.payload.commonConfiguration,
                    ),
                },
                isGetClusterDetailsPending: false,
            };
        case clusterTypes.GET_CLUSTER_DETAILS_REJECTED:
            return {
                ...state,
                isGetClusterDetailsPending: false,
                clusterDetails: null,
            };

        // DESCRIBE_CLUSTER
        case clusterTypes.DESCRIBE_CLUSTER_PENDING: {
            const newPendingMap = new Map(
                state.isGetClustersDescriptionsPending,
            );
            newPendingMap.set(action.meta.clusterCode, true);
            return {
                ...state,
                isGetClustersDescriptionsPending: newPendingMap,
            };
        }
        case clusterTypes.DESCRIBE_CLUSTER_FULFILLED: {
            const newPendingMap = new Map(
                state.isGetClustersDescriptionsPending,
            );
            const newDescMap = new Map(state.clustersDescriptions);

            newPendingMap.set(action.meta.clusterCode, false);
            newDescMap.set(action.meta.clusterCode, {
                ...action.payload,
                succeeded: true,
            });
            return {
                ...state,
                isGetClustersDescriptionsPending: newPendingMap,
                clustersDescriptions: newDescMap,
            };
        }
        case clusterTypes.DESCRIBE_CLUSTER_REJECTED: {
            const newPendingMap = new Map(
                state.isGetClustersDescriptionsPending,
            );
            const newDescMap = new Map(state.clustersDescriptions);

            newPendingMap.set(action.meta.clusterCode, false);
            newDescMap.set(action.meta.clusterCode, {
                succeeded: false,
                errorMessage: CommonUtils.getRestErrorMessage(action.payload),
                kafkaVersion: null,
                topics: null,
                totalBytesWritten: null,
                brokers: null,
            });
            return {
                ...state,
                isGetClustersDescriptionsPending: newPendingMap,
                clustersDescriptions: newDescMap,
            };
        }

        // MONITOR_CLUSTER
        case clusterTypes.MONITOR_CLUSTER_PENDING:
            return {
                ...state,
                isMonitorClusterPending: true,
            };
        case clusterTypes.MONITOR_CLUSTER_FULFILLED:
            return {
                ...state,
                clusterMonitoring: action.payload,
                isMonitorClusterPending: false,
            };
        case clusterTypes.MONITOR_CLUSTER_REJECTED:
            return {
                ...state,
                clusterMonitoring: {},
                isMonitorClusterPending: false,
            };

        // GET_CLUSTER_BROKERS_DETAILS
        case clusterTypes.GET_CLUSTER_BROKERS_DETAILS_PENDING:
            return {
                ...state,
                isGetClusterBrokersDetailsPending: true,
            };
        case clusterTypes.GET_CLUSTER_BROKERS_DETAILS_FULFILLED:
            return {
                ...state,
                clusterBrokersDetails: action.payload,
                isGetClusterBrokersDetailsPending: false,
            };
        case clusterTypes.GET_CLUSTER_BROKERS_DETAILS_REJECTED:
            return {
                ...state,
                clusterBrokersDetails: [],
                isGetClusterBrokersDetailsPending: false,
            };

        // GET_CLUSTER_BROKER_CONFIGURATION
        case clusterTypes.GET_CLUSTER_BROKER_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetClusterBrokerConfiguration: true,
            };
        case clusterTypes.GET_CLUSTER_BROKER_CONFIGURATION_FULFILLED:
            return {
                ...state,
                clusterBrokerConfiguration: {
                    configuration: action.payload?.configuration || [],
                },
                isGetClusterBrokerConfiguration: false,
            };
        case clusterTypes.GET_CLUSTER_BROKER_CONFIGURATION_REJECTED:
            return {
                ...state,
                clusterBrokerConfiguration: {
                    configuration: [],
                },
                isGetClusterBrokerConfiguration: false,
            };

        // EXPORT_CLUSTER
        case clusterTypes.EXPORT_CLUSTER_PENDING:
            return {
                ...state,
                isExportClusterPending: true,
            };
        case clusterTypes.EXPORT_CLUSTER_FULFILLED:
        case clusterTypes.EXPORT_CLUSTER_REJECTED:
            return {
                ...state,
                isExportClusterPending: false,
            };

        // IMPORT_CLUSTER
        case clusterTypes.IMPORT_CLUSTER_PENDING:
            return {
                ...state,
                isImportClusterPending: true,
            };
        case clusterTypes.IMPORT_CLUSTER_FULFILLED:
        case clusterTypes.IMPORT_CLUSTER_REJECTED:
            return {
                ...state,
                isImportClusterPending: false,
            };

        default:
            return state;
    }
}

export default clusterReducer;
