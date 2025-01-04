// Configurations
import autoRegisterSchemas from './json_schema_registry_serializer/auto.register.schemas';
import contextNameStrategy from './json_schema_registry_serializer/context.name.strategy';
import idCompatibilityStrict from './json_schema_registry_serializer/id.compatibility.strict';
import jsonFailInvalidSchema from './json_schema_registry_serializer/json.fail.invalid.schema';
import jsonFailUnknownProperties from './json_schema_registry_serializer/json.fail.unknown.properties';
import jsonIndentOutput from './json_schema_registry_serializer/json.indent.output';
import jsonOneofForNullables from './json_schema_registry_serializer/json.oneof.for.nullables';
import jsonSchemaSpecVersion from './json_schema_registry_serializer/json.schema.spec.version';
import jsonWriteDatesIso8601 from './json_schema_registry_serializer/json.write.dates.iso8601';
import keySubjectNameStrategy from './json_schema_registry_serializer/key.subject.name.strategy';
import latestCompatibilityStrict from './json_schema_registry_serializer/latest.compatibility.strict';
import normalizeSchemas from './json_schema_registry_serializer/normalize.schemas';
import schemaFormat from './json_schema_registry_serializer/schema.format';
import schemaReflection from './json_schema_registry_serializer/schema.reflection';
import useLatestVersion from './json_schema_registry_serializer/use.latest.version';
import useSchemaId from './json_schema_registry_serializer/use.schema.id';
import valueSubjectNameStrategy from './json_schema_registry_serializer/value.subject.name.strategy';

const configurations = [
    autoRegisterSchemas,
    contextNameStrategy,
    idCompatibilityStrict,
    jsonFailInvalidSchema,
    jsonFailUnknownProperties,
    jsonIndentOutput,
    jsonOneofForNullables,
    jsonSchemaSpecVersion,
    jsonWriteDatesIso8601,
    keySubjectNameStrategy,
    latestCompatibilityStrict,
    normalizeSchemas,
    schemaFormat,
    schemaReflection,
    useLatestVersion,
    useSchemaId,
    valueSubjectNameStrategy,
];

const JsonSchemaRegistrySerializerConfiguration = { configurations };

export { JsonSchemaRegistrySerializerConfiguration };
