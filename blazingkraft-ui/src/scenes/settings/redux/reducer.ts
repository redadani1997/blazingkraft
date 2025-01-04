import { ICommonPermissions } from 'common/types/server_permissions';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { ReduxAction } from 'redux_config/.';
import clusterTypes from 'scenes/cluster/redux/types';
import kafkaConnectTypes from 'scenes/kafka_connect/redux/types';
import ksqlDbTypes from 'scenes/ksqldb/redux/types';
import schemaRegistryTypes from 'scenes/schema_registry/redux/types';
import serverPermissionsTypes from 'scenes/server_permissions/redux/types';
import { SettingsReducerState } from '.';
import settingsTypes from './types';

const initialState: SettingsReducerState = {
    features: {
        clusterFeatures: [],
        schemaRegistryFeatures: [],
        kafkaConnectFeatures: [],
        ksqlDbFeatures: [],
    },
    serverPermissions: null,
    isBlazingAdmin: false,
    userPermissions: null,
    properties: null,
    isGetConfigurationPending: true,
    isGetPropertiesPending: true,
};

function computeCommonPermissions(commonPermissions): ICommonPermissions {
    if (CommonValidationUtils.isTruthy(commonPermissions)) {
        return {
            clusterPermissions: CommonUtils.objectToMap(
                commonPermissions.clusterPermissions,
            ),
            kafkaConnectPermissions: CommonUtils.objectToMap(
                commonPermissions.kafkaConnectPermissions,
            ),
            schemaRegistryPermissions: CommonUtils.objectToMap(
                commonPermissions.schemaRegistryPermissions,
            ),
            ksqlDbPermissions: CommonUtils.objectToMap(
                commonPermissions.ksqlDbPermissions,
            ),
            managementPermissions: CommonValidationUtils.isTruthy(
                commonPermissions.managementPermissions,
            )
                ? commonPermissions.managementPermissions
                : [],
            playgroundPermissions: CommonValidationUtils.isTruthy(
                commonPermissions.playgroundPermissions,
            )
                ? commonPermissions.playgroundPermissions
                : [],
        };
    }
    return null;
}

function settingsReducer(
    state = initialState,
    action: ReduxAction,
): SettingsReducerState {
    switch (action.type) {
        // GET_CONFIGURATION
        case settingsTypes.GET_CONFIGURATION_PENDING:
            return {
                ...state,
                isGetConfigurationPending: true,
            };
        case settingsTypes.GET_CONFIGURATION_FULFILLED:
            return {
                ...state,
                features: CommonValidationUtils.isTruthy(action.payload)
                    ? action.payload.features
                    : {
                          clusterFeatures: [],
                          schemaRegistryFeatures: [],
                          kafkaConnectFeatures: [],
                          ksqlDbFeatures: [],
                      },
                serverPermissions: computeCommonPermissions(
                    action.payload ? action.payload.serverPermissions : null,
                ),
                userPermissions: computeCommonPermissions(
                    action.payload ? action.payload.userPermissions : null,
                ),
                isBlazingAdmin: CommonValidationUtils.isTruthy(action.payload)
                    ? action.payload.isBlazingAdmin
                    : false,
                isGetConfigurationPending: false,
            };
        case settingsTypes.GET_CONFIGURATION_REJECTED:
            return {
                ...state,
                features: {
                    clusterFeatures: [],
                    schemaRegistryFeatures: [],
                    kafkaConnectFeatures: [],
                    ksqlDbFeatures: [],
                },
                serverPermissions: null,
                isBlazingAdmin: false,
                userPermissions: null,
                isGetConfigurationPending: false,
            };

        //GET_SERVER_PERMISSIONS_FULFILLED
        case serverPermissionsTypes.GET_SERVER_PERMISSIONS_FULFILLED:
            return {
                ...state,
                serverPermissions: computeCommonPermissions(action.payload),
            };

        // GET_PROPERTIES
        case settingsTypes.GET_PROPERTIES_PENDING:
            return {
                ...state,
                isGetPropertiesPending: true,
            };
        case settingsTypes.GET_PROPERTIES_FULFILLED:
            return {
                ...state,
                properties: action.payload,
                isGetPropertiesPending: false,
            };
        case settingsTypes.GET_PROPERTIES_REJECTED:
            return {
                ...state,
                properties: null,
                isGetPropertiesPending: true,
            };

        // CREATE_CLUSTER and IMPORT_CLUSTER
        case clusterTypes.IMPORT_CLUSTER_FULFILLED:
        case clusterTypes.CREATE_CLUSTER_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    clusterFeatures: [
                        ...state.features.clusterFeatures,
                        {
                            name: action.payload.name,
                            code: action.payload.code,
                            color: action.payload.color,
                            jmxEnabled: action.payload.jmxEnabled,
                            schemaRegistryCode:
                                action.payload.schemaRegistryCode,
                            schemaRegistryName:
                                action.payload.schemaRegistryName,
                        },
                    ],
                },
            };
        }
        // EDIT_CLUSTER
        case clusterTypes.EDIT_CLUSTER_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    clusterFeatures: state.features.clusterFeatures.map(
                        feature => {
                            if (feature.code === action.payload.code) {
                                return {
                                    ...feature,
                                    name: action.payload.name,
                                    color: action.payload.color,
                                    jmxEnabled: action.payload.jmxEnabled,
                                    schemaRegistryCode:
                                        action.payload.schemaRegistryCode,
                                    schemaRegistryName:
                                        action.payload.schemaRegistryName,
                                };
                            }
                            return feature;
                        },
                    ),
                },
            };
        }
        // DELETE_CLUSTER
        case clusterTypes.DELETE_CLUSTER_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    clusterFeatures: state.features.clusterFeatures.filter(
                        feature => feature.code !== action.meta.clusterCode,
                    ),
                },
            };
        }
        // CREATE_SCHEMA_REGISTRY
        case schemaRegistryTypes.CREATE_SCHEMA_REGISTRY_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    schemaRegistryFeatures: [
                        ...state.features.schemaRegistryFeatures,
                        {
                            name: action.payload.name,
                            code: action.payload.code,
                            color: action.payload.color,
                            jmxEnabled: action.payload.jmxEnabled,
                        },
                    ],
                },
            };
        }
        // EDIT_SCHEMA_REGISTRY
        case schemaRegistryTypes.EDIT_SCHEMA_REGISTRY_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    schemaRegistryFeatures:
                        state.features.schemaRegistryFeatures.map(feature => {
                            if (feature.code === action.payload.code) {
                                return {
                                    ...feature,
                                    name: action.payload.name,
                                    color: action.payload.color,
                                    jmxEnabled: action.payload.jmxEnabled,
                                };
                            }
                            return feature;
                        }),
                },
            };
        }
        // DELETE_SCHEMA_REGISTRY
        case schemaRegistryTypes.DELETE_SCHEMA_REGISTRY_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    schemaRegistryFeatures:
                        state.features.schemaRegistryFeatures.filter(
                            feature =>
                                feature.code !== action.meta.schemaRegistryCode,
                        ),
                },
            };
        }
        // CREATE_KAFKA_CONNECT
        case kafkaConnectTypes.CREATE_KAFKA_CONNECT_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    kafkaConnectFeatures: [
                        ...state.features.kafkaConnectFeatures,
                        {
                            name: action.payload.name,
                            code: action.payload.code,
                            color: action.payload.color,
                            jmxEnabled: action.payload.jmxEnabled,
                            clusterCode: action.payload.clusterCode,
                            clusterName: action.payload.clusterName,
                        },
                    ],
                },
            };
        }
        // EDIT_KAFKA_CONNECT
        case kafkaConnectTypes.EDIT_KAFKA_CONNECT_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    kafkaConnectFeatures:
                        state.features.kafkaConnectFeatures.map(feature => {
                            if (feature.code === action.payload.code) {
                                return {
                                    ...feature,
                                    name: action.payload.name,
                                    color: action.payload.color,
                                    jmxEnabled: action.payload.jmxEnabled,
                                    clusterCode: action.payload.clusterCode,
                                    clusterName: action.payload.clusterName,
                                };
                            }
                            return feature;
                        }),
                },
            };
        }
        // DELETE_KAFKA_CONNECT
        case kafkaConnectTypes.DELETE_KAFKA_CONNECT_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    kafkaConnectFeatures:
                        state.features.kafkaConnectFeatures.filter(
                            feature =>
                                feature.code !== action.meta.kafkaConnectCode,
                        ),
                },
            };
        }
        // CREATE_KSQLDB
        case ksqlDbTypes.CREATE_KSQLDB_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    ksqlDbFeatures: [
                        ...state.features.ksqlDbFeatures,
                        {
                            name: action.payload.name,
                            code: action.payload.code,
                            color: action.payload.color,
                            jmxEnabled: action.payload.jmxEnabled,
                        },
                    ],
                },
            };
        }
        // EDIT_KSQLDB
        case ksqlDbTypes.EDIT_KSQLDB_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    ksqlDbFeatures: state.features.ksqlDbFeatures.map(
                        feature => {
                            if (feature.code === action.payload.code) {
                                return {
                                    ...feature,
                                    name: action.payload.name,
                                    color: action.payload.color,
                                    jmxEnabled: action.payload.jmxEnabled,
                                };
                            }
                            return feature;
                        },
                    ),
                },
            };
        }
        // DELETE_KSQLDB
        case ksqlDbTypes.DELETE_KSQLDB_FULFILLED: {
            if (!state.features) {
                return state;
            }
            return {
                ...state,
                features: {
                    ...state.features,
                    ksqlDbFeatures: state.features.ksqlDbFeatures.filter(
                        feature => feature.code !== action.meta.ksqlDbCode,
                    ),
                },
            };
        }

        default:
            return state;
    }
}

export default settingsReducer;
