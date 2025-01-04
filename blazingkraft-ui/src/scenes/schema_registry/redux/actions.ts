import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { SchemaReference, SchemaType } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { SchemaRegistryConfiguration } from 'kafka/configuration/SchemaRegistryConfiguration';
import { DELETE, GET, POST, PUT } from 'rest/RestCalls';
import schemaRegistryTypes from './types';

function testSchemaRegistryClientConnectivity(
    mainConfiguration: Map<string, any>,
    schemaRegistryUrls,
    schemasCacheSize,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            SchemaRegistryConfiguration.configurations,
            mainConfiguration,
        );
    const loadingId = notifyLoading({
        title: 'Schema Registry Client Connectivity',
        message: 'Testing Schema Registry connectivity in progress...',
    });
    return {
        type: schemaRegistryTypes.TEST_SCHEMA_REGISTRY_CLIENT_CONNECTIVITY,
        payload: POST('/schema_registries/connectivity/client', {
            mainConfiguration: Object.fromEntries(cleanedConfigurationValues),
            schemaRegistryUrls,
            schemasCacheSize,
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Schema Registry Client Connectivity',
                    message: 'Schema Registry Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Schema Registry Client Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'Scehema Registry Connectivity',
            ignoreNotification: true,
        },
    };
}

function testSchemaRegistryJmxConnectivity(
    jmxUrl: string,
    jmxEnvironment: string,
) {
    const loadingId = notifyLoading({
        title: 'Schema Registry JMX Connectivity',
        message: 'Testing cluster jmx connectivity in progress...',
    });
    return {
        type: schemaRegistryTypes.TEST_SCHEMA_REGISTRY_JMX_CONNECTIVITY,
        payload: POST('/admin/clusters/connectivity/jmx', {
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        })
            .then(() => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Schema Registry JMX Connectivity',
                    message: 'Schema Registry JMX Connection successful',
                });
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Schema Registry JMX Connectivity',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
        meta: {
            context: 'Schema Registry JMX Connectivity',
            ignoreNotification: true,
        },
    };
}

function createSchemaRegistry(
    schemaRegistryCode,
    schemaRegistryName,
    schemaRegistryColor,
    mainConfiguration: Map<string, any>,
    schemaRegistryUrls,
    schemasCacheSize,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            SchemaRegistryConfiguration.configurations,
            mainConfiguration,
        );
    return {
        type: schemaRegistryTypes.CREATE_SCHEMA_REGISTRY,
        payload: POST('/schema_registries', {
            mainConfiguration: Object.fromEntries(cleanedConfigurationValues),
            schemaRegistryUrls,
            schemasCacheSize,
            code: schemaRegistryCode,
            name: schemaRegistryName,
            color: schemaRegistryColor,
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { schemaRegistryCode, context: 'Schema Registry Creation' },
    };
}

function editSchemaRegistry(
    schemaRegistryCode,
    schemaRegistryColor,
    mainConfiguration: Map<string, any>,
    schemaRegistryUrls,
    schemasCacheSize,
    jmxEnabled,
    jmxUrl,
    jmxEnvironment: string,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            SchemaRegistryConfiguration.configurations,
            mainConfiguration,
        );
    return {
        type: schemaRegistryTypes.EDIT_SCHEMA_REGISTRY,
        payload: PUT(`/schema_registries/${schemaRegistryCode}/edit`, {
            mainConfiguration: Object.fromEntries(cleanedConfigurationValues),
            schemaRegistryUrls,
            schemasCacheSize,
            color: schemaRegistryColor,
            jmxEnabled,
            jmxUrl,
            jmxEnvironment: CommonUtils.stringToObject(jmxEnvironment),
        }),
        meta: { schemaRegistryCode, context: 'Schema Registry Edit' },
    };
}

function deleteSchemaRegistry(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.DELETE_SCHEMA_REGISTRY,
        payload: DELETE(`/schema_registries/${schemaRegistryCode}/delete`),
        meta: { schemaRegistryCode, context: 'Schema Registry Deletion' },
    };
}

function getSchemaRegistryDetails(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SCHEMA_REGISTRY_DETAILS,
        payload: GET(`/schema_registries/${schemaRegistryCode}/details`),
        meta: { schemaRegistryCode, context: 'Schema Registry Details' },
    };
}

function getSchemaRegistries() {
    return {
        type: schemaRegistryTypes.GET_SCHEMA_REGISTRIES,
        payload: GET('/schema_registries'),
        meta: { context: 'Schema Registries' },
    };
}

function getSchemaRegistryConfig(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SCHEMA_REGISTRY_CONFIG,
        payload: GET('/schema_registries/config', {
            headers: { schemaRegistryCode },
        }),
        meta: { context: 'Schema Registries Configuration' },
    };
}

function describeSchemaRegistry(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.DESCRIBE_SCHEMA_REGISTRY,
        payload: GET(`/schema_registries/description`, {
            headers: { schemaRegistryCode },
        }),
        meta: {
            schemaRegistryCode,
            context: 'Schema Registry Description',
            ignoreNotification: true,
            concurrencyIdentifier: schemaRegistryCode,
        },
    };
}

function getSubjectsMeta(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SUBJECTS_META,
        payload: GET('/schema_registries/subjects/meta', {
            headers: { schemaRegistryCode },
            params: { lookupDeletedSubject: false },
        }),
        meta: { schemaRegistryCode, context: 'Subjects' },
    };
}

function getSubjectsVersions(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SUBJECTS_VERSIONS,
        payload: GET('/schema_registries/subjects/versions', {
            headers: { schemaRegistryCode },
            params: { lookupDeletedSubject: true },
        }),
        meta: { schemaRegistryCode, context: 'Subjects Versions' },
    };
}

function getSubjectsDescription(subjects: string[], schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SUBJECTS_DESCRIPTION,
        payload: POST(
            '/schema_registries/subjects/descriptions',
            { subjects },
            {
                headers: { schemaRegistryCode },
            },
        ),
        meta: {
            schemaRegistryCode,
            context: 'Subjects',
            concurrencyIdentifier: schemaRegistryCode,
        },
    };
}

function getSchemaRegistryMeta(schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SCHEMA_REGISTRY_META,
        payload: GET(`/schema_registries/${schemaRegistryCode}/meta`),
    };
}

function createSubject(
    subject,
    schemaType,
    schema,
    compatibility,
    references,
    schemaRegistryCode,
) {
    return {
        type: schemaRegistryTypes.CREATE_SUBJECT,
        payload: POST(
            '/schema_registries/subjects',
            {
                subject,
                schemaType,
                schema,
                compatibility,
                references,
            },
            { headers: { schemaRegistryCode } },
        ),
        meta: { subject, context: 'Subject Creation' },
    };
}

function createSubjectVersion(
    subject,
    schemaType,
    schema,
    schemaReferences,
    schemaRegistryCode,
) {
    return {
        type: schemaRegistryTypes.CREATE_SUBJECT_VERSION,
        payload: POST(
            `/schema_registries/subjects/${subject}/versions`,
            {
                schemaType,
                schema,
                schemaReferences,
            },
            { headers: { schemaRegistryCode } },
        ),
        meta: { subject, context: 'Subject Version Creation' },
    };
}

function getSubjectDetails(subject, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_SUBJECT_DETAILS,
        payload: GET(`/schema_registries/subjects/${subject}/details`, {
            headers: { schemaRegistryCode },
        }),
        meta: { subject, context: 'Subject Details' },
    };
}

function getTopicSubjectDetails(topic, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.GET_TOPIC_SUBJECT_DETAILS,
        payload: GET(`/schema_registries/subjects/topic/${topic}`, {
            headers: { schemaRegistryCode },
        }),
        meta: { topic, context: 'Topic Subject Details' },
    };
}

function deleteSubject(subject, permanent, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.DELETE_SUBJECT,
        payload: DELETE(`/schema_registries/subjects/${subject}`, {
            headers: { schemaRegistryCode },
            params: { permanent },
        }),
        meta: { subject, context: 'Subject Deletion' },
    };
}

function deleteSchemaVersion(subject, version, permanent, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.DELETE_SCHEMA_VERSION,
        payload: DELETE(
            `/schema_registries/subjects/${subject}/versions/${version}`,
            {
                headers: { schemaRegistryCode },
                params: { permanent },
            },
        ),
        meta: { subject, version, context: 'Schema Version Deletion' },
    };
}

function updateSubjectCompatibility(
    subject,
    compatibility,
    schemaRegistryCode,
) {
    return {
        type: schemaRegistryTypes.UPDATE_SUBJECT_COMPATIBILITY,
        payload: PUT(
            `/schema_registries/subjects/${subject}/compatibility`,
            { compatibility },
            {
                headers: { schemaRegistryCode },
            },
        ),
        meta: {
            subject,
            compatibility,
            context: 'Subject Compatibility Update',
        },
    };
}

function updateSubjectMode(subject, mode, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.UPDATE_SUBJECT_MODE,
        payload: PUT(
            `/schema_registries/subjects/${subject}/mode`,
            { mode },
            {
                headers: { schemaRegistryCode },
            },
        ),
        meta: {
            subject,
            mode,
            context: 'Subject Mode Update',
        },
    };
}

function updateSchemaRegistryCompatibility(compatibility, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_COMPATIBILITY,
        payload: PUT(
            `/schema_registries/compatibility`,
            { compatibility },
            {
                headers: { schemaRegistryCode },
            },
        ),
        meta: {
            compatibility,
            schemaRegistryCode,
            context: 'Schema Registry Compatibility Update',
        },
    };
}

function updateSchemaRegistrytMode(mode, schemaRegistryCode) {
    return {
        type: schemaRegistryTypes.UPDATE_SCHEMA_REGISTRY_MODE,
        payload: PUT(
            `/schema_registries/mode`,
            { mode },
            {
                headers: { schemaRegistryCode },
            },
        ),
        meta: {
            mode,
            schemaRegistryCode,
            context: 'Schema Registry Mode Update',
        },
    };
}

function validateSchemaDefinition(
    schemaType: SchemaType,
    schema,
    schemaReferences: SchemaReference[],
    schemaRegistryCode,
    promiseId,
) {
    return POST(
        '/schema_registries/validate/definition',
        {
            schemaType,
            schema,
            schemaReferences,
        },
        { headers: { schemaRegistryCode } },
    )
        .then(res => {
            return res ? { ...res, promiseId } : undefined;
        })
        .catch(err => {
            return {
                succeeded: false,
                errorMessages: [err.message],
                promiseId,
            };
        });
}

function validateSchemaContent(
    schemaType: SchemaType,
    schema,
    schemaReferences: SchemaReference[],
    content,
    schemaRegistryCode,
    promiseId,
) {
    return POST(
        '/schema_registries/validate/content',
        {
            schemaType,
            schema,
            schemaReferences,
            content,
        },
        { headers: { schemaRegistryCode } },
    )
        .then(res => {
            return res ? { ...res, promiseId } : undefined;
        })
        .catch(err => {
            return {
                succeeded: false,
                errorMessages: [err.message],
                schemaDefinitionSucceeded: false,
                schemaDefinitionErrorMessages: [err.message],
                promiseId,
            };
        });
}

function validateSchemaCompatibility(
    subject,
    schemaType: SchemaType,
    schema,
    schemaReferences: SchemaReference[],
    schemaRegistryCode,
    promiseId,
) {
    return POST(
        '/schema_registries/validate/compatibility',
        {
            subject,
            schemaType,
            schema,
            schemaReferences,
        },
        { headers: { schemaRegistryCode } },
    )
        .then(res => {
            return res ? { ...res, promiseId } : undefined;
        })
        .catch(err => {
            return {
                succeeded: false,
                errorMessages: [err.message],
                schemaDefinitionSucceeded: false,
                schemaDefinitionErrorMessages: [err.message],
                promiseId,
            };
        });
}

const schemaRegistryActions = {
    testSchemaRegistryClientConnectivity,
    testSchemaRegistryJmxConnectivity,
    createSchemaRegistry,
    editSchemaRegistry,
    deleteSchemaRegistry,
    getSchemaRegistryDetails,
    getSchemaRegistries,
    getSchemaRegistryConfig,
    describeSchemaRegistry,
    getSchemaRegistryMeta,
    getSubjectsMeta,
    getSubjectsDescription,
    createSubject,
    getSubjectsVersions,
    getSubjectDetails,
    deleteSubject,
    deleteSchemaVersion,
    updateSubjectCompatibility,
    createSubjectVersion,
    updateSubjectMode,
    updateSchemaRegistryCompatibility,
    updateSchemaRegistrytMode,
    validateSchemaDefinition,
    validateSchemaContent,
    validateSchemaCompatibility,
    getTopicSubjectDetails,
};

export default schemaRegistryActions;
