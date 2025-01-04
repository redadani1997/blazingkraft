// Configurations
import autoRegisterSchemas from './avro_schema_registry_deserializer/auto.register.schemas';
import avroReflectionAllowNull from './avro_schema_registry_deserializer/avro.reflection.allow.null';
import avroUseLogicalTypeConverters from './avro_schema_registry_deserializer/avro.use.logical.type.converters';
import contextNameStrategy from './avro_schema_registry_deserializer/context.name.strategy';
import idCompatibilityStrict from './avro_schema_registry_deserializer/id.compatibility.strict';
import keySubjectNameStrategy from './avro_schema_registry_deserializer/key.subject.name.strategy';
import latestCompatibilityStrict from './avro_schema_registry_deserializer/latest.compatibility.strict';
import normalizeSchemas from './avro_schema_registry_deserializer/normalize.schemas';
import schemaFormat from './avro_schema_registry_deserializer/schema.format';
import schemaReflection from './avro_schema_registry_deserializer/schema.reflection';
import specificAvroReader from './avro_schema_registry_deserializer/specific.avro.reader';
import useLatestVersion from './avro_schema_registry_deserializer/use.latest.version';
import useSchemaId from './avro_schema_registry_deserializer/use.schema.id';
import valueSubjectNameStrategy from './avro_schema_registry_deserializer/value.subject.name.strategy';

const configurations = [
    autoRegisterSchemas,
    avroReflectionAllowNull,
    avroUseLogicalTypeConverters,
    contextNameStrategy,
    idCompatibilityStrict,
    keySubjectNameStrategy,
    latestCompatibilityStrict,
    normalizeSchemas,
    schemaFormat,
    schemaReflection,
    specificAvroReader,
    useLatestVersion,
    useSchemaId,
    valueSubjectNameStrategy,
];

const AvroSchemaRegistryDeserializerConfiguration = { configurations };

export { AvroSchemaRegistryDeserializerConfiguration };
