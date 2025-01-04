import {
    SchemaCompatibility,
    SchemaRegistry,
    SchemaRegistryDetails,
    SchemaRegistryMode,
    SubjectDescription,
    SubjectDetails,
    SubjectMeta,
    SubjectVersions,
    TopicSubjectDetails,
} from 'common/types/schema_registry';

export interface SchemaRegistryDescription {
    code?: string;
    subjects?: number;
    mode?: SchemaRegistryMode;
    compatibility?: SchemaCompatibility;
    errorMessage?: string;
    succeeded: boolean;
}

export interface SchemaRegistryConfig {
    compatibility: SchemaCompatibility;
    mode: SchemaRegistryMode;
}

export type SchemaRegistryReducerState = {
    isGetSchemaRegistryDetailsPending: boolean;
    isDeleteSchemaRegistryPending: boolean;
    isEditSchemaRegistryPending: boolean;
    isCreateSchemaRegistryPending: boolean;
    isGetSubjectsMetaPending: boolean;
    isGetSubjectsDescriptionPending: boolean;
    isCreateSubjectPending: boolean;
    isCreateSubjectVersionPending: boolean;
    isGetSubjectDetailsPending: boolean;
    isDeleteSubjectPending: boolean;
    isDeleteSubjectVersionPending: boolean;
    isTestSchemaRegistryClientConnectivityPending: boolean;
    isTestSchemaRegistryJmxConnectivityPending: boolean;
    isGetSubjectsVersionsPending: boolean;
    isUpdateSubjectCompatibilityPending: boolean;
    isUpdateSchemaRegsitryCompatibilityPending: boolean;
    isUpdateSubjectModePending: boolean;
    isUpdateSchemaRegistryModePending: boolean;
    isGetSchemaRegistriesPending: boolean;
    isGetSchemaRegistryConfigPending: boolean;
    isGetTopicSubjectDetailsPending: boolean;
    isGetSchemaRegistriesDescriptionsPending: Map<string, boolean>;
    subjectsMeta: SubjectMeta[];
    subjectsVersions: SubjectVersions[];
    subjectsDescription: Map<string, SubjectDescription>;
    subjectDetails: SubjectDetails | undefined;
    topicSubjectDetails: TopicSubjectDetails;
    schemaRegistries: SchemaRegistry[];
    schemaRegistriesDescriptions: Map<string, SchemaRegistryDescription>;
    schemaRegistryConfig: SchemaRegistryConfig | undefined;
    schemaRegistryDetails: SchemaRegistryDetails | null;
};

export interface SchemaValidationResponse {
    succeeded: boolean;
    errorMessages?: string[];
    schemaDefinitionSucceeded: boolean;
    schemaDefinitionErrorMessages?: string[];
    promiseId: number;
}

export interface SchemaDefinitionValidationResponse {
    succeeded: boolean;
    errorMessages?: string[];
    promiseId: number;
}

export interface SchemaCompatibilityValidationResponse {
    succeeded: boolean;
    errorMessages?: string[];
    schemaDefinitionSucceeded: boolean;
    schemaDefinitionErrorMessages?: string[];
    promiseId: number;
}
