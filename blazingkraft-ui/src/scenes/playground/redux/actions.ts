import { ContentType, SchemaType } from 'common/types/schema_registry';
import { POST } from 'rest/RestCalls';

function validateSchemaDefinition(schemaType: SchemaType, schema, promiseId) {
    return POST('/playground/validation/schemas/definition', {
        schemaType,
        schema,
    })
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
    content,
    contentType: ContentType,
    promiseId,
) {
    return POST('/playground/validation/schemas/content', {
        schemaType,
        schema,
        content,
        contentType,
    })
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

function validateOpenAPIDefinition(schemaType: SchemaType, schema, promiseId) {
    return POST('/playground/validation/openapi/definition', {
        schemaType,
        schema,
    })
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

function validateOpenAPIContent(
    schemaType: SchemaType,
    schema,
    content,
    contentType: ContentType,
    promiseId,
) {
    return POST('/playground/validation/openapi/content', {
        schemaType,
        schema,
        content,
        contentType,
    })
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

function convertContent(
    content,
    providedType: ContentType,
    desiredType: ContentType,
    promiseId,
) {
    return POST('/playground/conversions', {
        content,
        providedType,
        desiredType,
    }).then(res => {
        return res ? { ...res, promiseId } : undefined;
    });
}

const playgroundActions = {
    validateSchemaDefinition,
    validateSchemaContent,
    validateOpenAPIDefinition,
    validateOpenAPIContent,
    convertContent,
};

export default playgroundActions;
