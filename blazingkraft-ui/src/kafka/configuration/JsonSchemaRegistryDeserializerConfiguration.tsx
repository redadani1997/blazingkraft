// Configurations
import autoRegisterSchemas from './json_schema_registry_deserializer/auto.register.schemas';
import contextNameStrategy from './json_schema_registry_deserializer/context.name.strategy';
import idCompatibilityStrict from './json_schema_registry_deserializer/id.compatibility.strict';
import jsonFailInvalidSchema from './json_schema_registry_deserializer/json.fail.invalid.schema';
import jsonFailUnknownProperties from './json_schema_registry_deserializer/json.fail.unknown.properties';
import jsonKeyType from './json_schema_registry_deserializer/json.key.type';
import jsonValueType from './json_schema_registry_deserializer/json.value.type';
import keySubjectNameStrategy from './json_schema_registry_deserializer/key.subject.name.strategy';
import latestCompatibilityStrict from './json_schema_registry_deserializer/latest.compatibility.strict';
import normalizeSchemas from './json_schema_registry_deserializer/normalize.schemas';
import schemaFormat from './json_schema_registry_deserializer/schema.format';
import schemaReflection from './json_schema_registry_deserializer/schema.reflection';
import typeProperty from './json_schema_registry_deserializer/type.property';
import useLatestVersion from './json_schema_registry_deserializer/use.latest.version';
import useSchemaId from './json_schema_registry_deserializer/use.schema.id';
import valueSubjectNameStrategy from './json_schema_registry_deserializer/value.subject.name.strategy';

const configurations = [
    autoRegisterSchemas,
    contextNameStrategy,
    idCompatibilityStrict,
    jsonFailInvalidSchema,
    jsonFailUnknownProperties,
    jsonKeyType,
    jsonValueType,
    keySubjectNameStrategy,
    latestCompatibilityStrict,
    normalizeSchemas,
    schemaFormat,
    schemaReflection,
    typeProperty,
    useLatestVersion,
    useSchemaId,
    valueSubjectNameStrategy,
];

const JsonSchemaRegistryDeserializerConfiguration = { configurations };

export { JsonSchemaRegistryDeserializerConfiguration };
