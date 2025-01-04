import {
    SubjectDescription,
    SubjectDetails,
} from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { ReduxAction } from 'redux_config/.';
import { SchemaRegistryReducerState } from '.';
import schemaRegistryTypes from './types';

const initialState: SchemaRegistryReducerState = {
    schemaRegistryDetails: null,
    topicSubjectDetails: {
        keySubjectDetails: null,
        valueSubjectDetails: null,
    },
    subjectsMeta: [],
    subjectsDescription: new Map(),
    subjectsVersions: [],
    subjectDetails: undefined,
    schemaRegistries: [],
    schemaRegistryConfig: undefined,
    schemaRegistriesDescriptions: new Map(),
    isGetSubjectsMetaPending: false,
    isGetSubjectsDescriptionPending: false,
    isCreateSchemaRegistryPending: false,
    isTestSchemaRegistryClientConnectivityPending: false,
    isTestSchemaRegistryJmxConnectivityPending: false,
    isCreateSubjectPending: false,
    isCreateSubjectVersionPending: false,
    isGetSubjectsVersionsPending: false,
    isGetSubjectDetailsPending: false,
    isDeleteSubjectPending: false,
    isDeleteSubjectVersionPending: false,
    isUpdateSubjectCompatibilityPending: false,
    isGetSchemaRegistriesPending: false,
    isGetSchemaRegistriesDescriptionsPending: new Map(),
    isGetSchemaRegistryConfigPending: false,
    isUpdateSchemaRegistryModePending: false,
    isUpdateSchemaRegsitryCompatibilityPending: false,
    isUpdateSubjectModePending: false,
    isDeleteSchemaRegistryPending: false,
    isEditSchemaRegistryPending: false,
    isGetSchemaRegistryDetailsPending: false,
    isGetTopicSubjectDetailsPending: false,
};

function schemaRegistryReducer(
    state = initialState,
    action: ReduxAction,
): SchemaRegistryReducerState {
    switch (action.type) {
        // TEST_SCHEMA_REGISTRY_CLIENT_CONNECTIVITY
        case schemaRegistryTypes.TEST_SCHEMA_REGISTRY_CLIENT_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestSchemaRegistryClientConnectivityPending: true,
            };
        case schemaRegistryTypes.TEST_SCHEMA_REGISTRY_CLIENT_CONNECTIVITY_FULFILLED:
        case schemaRegistryTypes.TEST_SCHEMA_REGISTRY_CLIENT_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestSchemaRegistryClientConnectivityPending: false,
            };

        // TEST_SCHEMA_REGISTRY_JMX_CONNECTIVITY
        case schemaRegistryTypes.TEST_SCHEMA_REGISTRY_JMX_CONNECTIVITY_PENDING:
            return {
                ...state,
                isTestSchemaRegistryJmxConnectivityPending: true,
            };
        case schemaRegistryTypes.TEST_SCHEMA_REGISTRY_JMX_CONNECTIVITY_FULFILLED:
        case schemaRegistryTypes.TEST_SCHEMA_REGISTRY_JMX_CONNECTIVITY_REJECTED:
            return {
                ...state,
                isTestSchemaRegistryJmxConnectivityPending: false,
            };

        // CREATE_SCHEMA_REGISTRY
        case schemaRegistryTypes.CREATE_SCHEMA_REGISTRY_PENDING:
            return {
                ...state,
                isCreateSchemaRegistryPending: true,
            };
        case schemaRegistryTypes.CREATE_SCHEMA_REGISTRY_FULFILLED:
        case schemaRegistryTypes.CREATE_SCHEMA_REGISTRY_REJECTED:
            return {
                ...state,
                isCreateSchemaRegistryPending: false,
            };

        // GET_SCHEMA_REGISTRIES
        case schemaRegistryTypes.GET_SCHEMA_REGISTRIES_PENDING:
            return {
                ...state,
                isGetSchemaRegistriesPending: true,
            };
        case schemaRegistryTypes.GET_SCHEMA_REGISTRIES_FULFILLED:
            return {
                ...state,
                isGetSchemaRegistriesPending: false,
                schemaRegistries: action.payload,
            };
        case schemaRegistryTypes.GET_SCHEMA_REGISTRIES_REJECTED:
            return {
                ...state,
                isGetSchemaRegistriesPending: false,
                schemaRegistries: [],
            };

        // DESCRIBE_SCHEMA_REGISTRY
        case schemaRegistryTypes.DESCRIBE_SCHEMA_REGISTRY_PENDING: {
            const newPendingMap = new Map(
                state.isGetSchemaRegistriesDescriptionsPending,
            );
            newPendingMap.set(action.meta.schemaRegistryCode, true);
            return {
                ...state,
                isGetSchemaRegistriesDescriptionsPending: newPendingMap,
            };
        }
        case schemaRegistryTypes.DESCRIBE_SCHEMA_REGISTRY_FULFILLED: {
            const newPendingMap = new Map(
                state.isGetSchemaRegistriesDescriptionsPending,
            );
            const newDescMap = new Map(state.schemaRegistriesDescriptions);

            newPendingMap.set(action.meta.schemaRegistryCode, false);
            newDescMap.set(action.meta.schemaRegistryCode, {
                ...action.payload,
                succeeded: true,
            });
            return {
                ...state,
                isGetSchemaRegistriesDescriptionsPending: newPendingMap,
                schemaRegistriesDescriptions: newDescMap,
            };
        }
        case schemaRegistryTypes.DESCRIBE_SCHEMA_REGISTRY_REJECTED: {
            const newPendingMap = new Map(
                state.isGetSchemaRegistriesDescriptionsPending,
            );
            const newDescMap = new Map(state.schemaRegistriesDescriptions);

            newPendingMap.set(action.meta.schemaRegistryCode, false);
            newDescMap.set(action.meta.schemaRegistryCode, {
                succeeded: false,
                errorMessage: CommonUtils.getRestErrorMessage(action.payload),
            });
            return {
                ...state,
                isGetSchemaRegistriesDescriptionsPending: newPendingMap,
                schemaRegistriesDescriptions: newDescMap,
            };
        }

        // GET_SUBJECTS_META
        case schemaRegistryTypes.GET_SUBJECTS_META_PENDING:
            return {
                ...state,
                isGetSubjectsMetaPending: true,
            };
        case schemaRegistryTypes.GET_SUBJECTS_META_FULFILLED:
            return {
                ...state,
                subjectsMeta: action.payload,
                isGetSubjectsMetaPending: false,
            };
        case schemaRegistryTypes.GET_SUBJECTS_META_REJECTED:
            return {
                ...state,
                isGetSubjectsMetaPending: false,
                subjectsMeta: [],
            };

        // GET_SUBJECTS_VERSIONS
        case schemaRegistryTypes.GET_SUBJECTS_VERSIONS_PENDING:
            return {
                ...state,
                isGetSubjectsVersionsPending: true,
            };
        case schemaRegistryTypes.GET_SUBJECTS_VERSIONS_FULFILLED:
            return {
                ...state,
                subjectsVersions: action.payload,
                isGetSubjectsVersionsPending: false,
            };
        case schemaRegistryTypes.GET_SUBJECTS_VERSIONS_REJECTED:
            return {
                ...state,
                isGetSubjectsVersionsPending: false,
                subjectsVersions: [],
            };

        // GET_SCHEMA_REGISTRY_CONFIG
        case schemaRegistryTypes.GET_SCHEMA_REGISTRY_CONFIG_PENDING:
            return {
                ...state,
                isGetSchemaRegistryConfigPending: true,
            };
        case schemaRegistryTypes.GET_SCHEMA_REGISTRY_CONFIG_FULFILLED:
            return {
                ...state,
                schemaRegistryConfig: action.payload,
                isGetSchemaRegistryConfigPending: false,
            };
        case schemaRegistryTypes.GET_SCHEMA_REGISTRY_CONFIG_REJECTED:
            return {
                ...state,
                isGetSchemaRegistryConfigPending: false,
                schemaRegistryConfig: undefined,
            };

        // DELETE_SUBJECT
        case schemaRegistryTypes.DELETE_SUBJECT_PENDING:
            return {
                ...state,
                isDeleteSubjectPending: true,
            };
        case schemaRegistryTypes.DELETE_SUBJECT_FULFILLED:
        case schemaRegistryTypes.DELETE_SUBJECT_REJECTED:
            return {
                ...state,
                isDeleteSubjectPending: false,
            };

        // DELETE_SCHEMA_VERSION
        case schemaRegistryTypes.DELETE_SCHEMA_VERSION_PENDING:
            return {
                ...state,
                isDeleteSubjectVersionPending: true,
            };
        case schemaRegistryTypes.DELETE_SCHEMA_VERSION_FULFILLED:
        case schemaRegistryTypes.DELETE_SCHEMA_VERSION_REJECTED:
            return {
                ...state,
                isDeleteSubjectVersionPending: false,
            };

        // UPDATE_SUBJECT_COMPATIBILITY
        case schemaRegistryTypes.UPDATE_SUBJECT_COMPATIBILITY_PENDING:
            return {
                ...state,
                isUpdateSubjectCompatibilityPending: true,
            };
        case schemaRegistryTypes.UPDATE_SUBJECT_COMPATIBILITY_FULFILLED:
            return {
                ...state,
                subjectDetails: {
                    ...state.subjectDetails,
                    compatibility: action.meta.compatibility,
                },
                isUpdateSubjectCompatibilityPending: false,
            };
        case schemaRegistryTypes.UPDATE_SUBJECT_COMPATIBILITY_REJECTED:
            return {
                ...state,
                isUpdateSubjectCompatibilityPending: false,
            };

        // UPDATE_SUBJECT_MODE
        case schemaRegistryTypes.UPDATE_SUBJECT_MODE_PENDING:
            return {
                ...state,
                isUpdateSubjectModePending: true,
            };
        case schemaRegistryTypes.UPDATE_SUBJECT_MODE_FULFILLED:
            return {
                ...state,
                subjectDetails: {
                    ...state.subjectDetails,
                    mode: action.meta.mode,
                },
                isUpdateSubjectModePending: false,
            };
        case schemaRegistryTypes.UPDATE_SUBJECT_MODE_REJECTED:
            return {
                ...state,
                isUpdateSubjectModePending: false,
            };

        // UPDATE_SCHEMA_REGISTRY_COMPATIBILITY
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY_PENDING:
            return {
                ...state,
                isUpdateSchemaRegsitryCompatibilityPending: true,
            };
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY_FULFILLED:
            return {
                ...state,
                schemaRegistryConfig: {
                    ...state.schemaRegistryConfig,
                    compatibility: action.meta.compatibility,
                },
                isUpdateSchemaRegsitryCompatibilityPending: false,
            };
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY_REJECTED:
            return {
                ...state,
                isUpdateSchemaRegsitryCompatibilityPending: false,
            };

        // UPDATE_SCHEMA_REGISTRY_MODE
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_MODE_PENDING:
            return {
                ...state,
                isUpdateSchemaRegistryModePending: true,
            };
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_MODE_FULFILLED:
            return {
                ...state,
                schemaRegistryConfig: {
                    ...state.schemaRegistryConfig,
                    mode: action.meta.mode,
                },
                isUpdateSchemaRegistryModePending: false,
            };
        case schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_MODE_REJECTED:
            return {
                ...state,
                isUpdateSchemaRegistryModePending: false,
            };

        // GET_SUBJECT_DETAILS
        case schemaRegistryTypes.GET_SUBJECT_DETAILS_PENDING:
            return {
                ...state,
                isGetSubjectDetailsPending: true,
                subjectDetails: undefined,
            };
        case schemaRegistryTypes.GET_SUBJECT_DETAILS_FULFILLED: {
            const { payload }: { payload?: SubjectDetails } = action;
            return {
                ...state,
                subjectDetails: {
                    ...payload,
                    schemasMetaData:
                        payload?.schemasMetaData?.sort(
                            (a, b) => b.version - a.version,
                        ) || [],
                },
                isGetSubjectDetailsPending: false,
            };
        }
        case schemaRegistryTypes.GET_SUBJECT_DETAILS_REJECTED:
            return {
                ...state,
                isGetSubjectDetailsPending: false,
                subjectDetails: undefined,
            };

        // GET_ALL_SUBJECTS_DESCRIPTIONS
        case schemaRegistryTypes.GET_SUBJECTS_DESCRIPTION_PENDING:
            return {
                ...state,
                isGetSubjectsDescriptionPending: true,
            };
        case schemaRegistryTypes.GET_SUBJECTS_DESCRIPTION_FULFILLED: {
            return {
                ...state,
                subjectsDescription: new Map<string, SubjectDescription>(
                    action.payload.map(
                        (subjectDescription: SubjectDescription) => {
                            return [
                                subjectDescription.subject,
                                subjectDescription,
                            ];
                        },
                    ),
                ),
                isGetSubjectsDescriptionPending: false,
            };
        }
        case schemaRegistryTypes.GET_SUBJECTS_DESCRIPTION_REJECTED:
            return {
                ...state,
                isGetSubjectsDescriptionPending: false,
                subjectsDescription: new Map(),
            };

        // CREATE_SUBJECT
        case schemaRegistryTypes.CREATE_SUBJECT_PENDING:
            return {
                ...state,
                isCreateSubjectPending: true,
            };
        case schemaRegistryTypes.CREATE_SUBJECT_FULFILLED:
        case schemaRegistryTypes.CREATE_SUBJECT_REJECTED:
            return {
                ...state,
                isCreateSubjectPending: false,
            };

        // CREATE_SUBJECT_VERSION
        case schemaRegistryTypes.CREATE_SUBJECT_VERSION_PENDING:
            return {
                ...state,
                isCreateSubjectVersionPending: true,
            };
        case schemaRegistryTypes.CREATE_SUBJECT_VERSION_FULFILLED:
        case schemaRegistryTypes.CREATE_SUBJECT_VERSION_REJECTED:
            return {
                ...state,
                isCreateSubjectVersionPending: false,
            };

        // GET_SCHEMA_REGISTRY_DETAILS
        case schemaRegistryTypes.GET_SCHEMA_REGISTRY_DETAILS_PENDING:
            return {
                ...state,
                isGetSchemaRegistryDetailsPending: true,
            };
        case schemaRegistryTypes.GET_SCHEMA_REGISTRY_DETAILS_FULFILLED: {
            return {
                ...state,
                schemaRegistryDetails: {
                    ...action.payload,
                    mainConfiguration: CommonUtils.objectToMap(
                        action.payload.mainConfiguration,
                    ),
                },
                isGetSchemaRegistryDetailsPending: false,
            };
        }
        case schemaRegistryTypes.GET_SCHEMA_REGISTRY_DETAILS_REJECTED:
            return {
                ...state,
                isGetSchemaRegistryDetailsPending: false,
                schemaRegistryDetails: null,
            };

        // DELETE_SCHEMA_REGISTRY
        case schemaRegistryTypes.DELETE_SCHEMA_REGISTRY_PENDING:
            return {
                ...state,
                isDeleteSchemaRegistryPending: true,
            };
        case schemaRegistryTypes.DELETE_SCHEMA_REGISTRY_FULFILLED:
        case schemaRegistryTypes.DELETE_SCHEMA_REGISTRY_REJECTED:
            return {
                ...state,
                isDeleteSchemaRegistryPending: false,
            };

        // EDIT_SCHEMA_REGISTRY
        case schemaRegistryTypes.EDIT_SCHEMA_REGISTRY_PENDING:
            return {
                ...state,
                isEditSchemaRegistryPending: true,
            };
        case schemaRegistryTypes.EDIT_SCHEMA_REGISTRY_FULFILLED:
        case schemaRegistryTypes.EDIT_SCHEMA_REGISTRY_REJECTED:
            return {
                ...state,
                isEditSchemaRegistryPending: false,
            };

        // GET_TOPIC_SUBJECT_DETAILS
        case schemaRegistryTypes.GET_TOPIC_SUBJECT_DETAILS_PENDING:
            return {
                ...state,
                isGetTopicSubjectDetailsPending: true,
            };
        case schemaRegistryTypes.GET_TOPIC_SUBJECT_DETAILS_FULFILLED: {
            return {
                ...state,
                topicSubjectDetails: action.payload,
                isGetTopicSubjectDetailsPending: false,
            };
        }
        case schemaRegistryTypes.GET_TOPIC_SUBJECT_DETAILS_REJECTED:
            return {
                ...state,
                isGetTopicSubjectDetailsPending: false,
                topicSubjectDetails: {
                    keySubjectDetails: null,
                    valueSubjectDetails: null,
                },
            };

        default:
            return state;
    }
}

export default schemaRegistryReducer;
