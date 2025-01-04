// Configurations
import autoRegisterSchemas from './avro_schema_registry_serializer/auto.register.schemas';
import avroReflectionAllowNull from './avro_schema_registry_serializer/avro.reflection.allow.null';
import avroRemoveJavaProperties from './avro_schema_registry_serializer/avro.remove.java.properties';
import avroUseLogicalTypeConverters from './avro_schema_registry_serializer/avro.use.logical.type.converters';
import contextNameStrategy from './avro_schema_registry_serializer/context.name.strategy';
import idCompatibilityStrict from './avro_schema_registry_serializer/id.compatibility.strict';
import keySubjectNameStrategy from './avro_schema_registry_serializer/key.subject.name.strategy';
import latestCompatibilityStrict from './avro_schema_registry_serializer/latest.compatibility.strict';
import normalizeSchemas from './avro_schema_registry_serializer/normalize.schemas';
import schemaFormat from './avro_schema_registry_serializer/schema.format';
import schemaReflection from './avro_schema_registry_serializer/schema.reflection';
import useLatestVersion from './avro_schema_registry_serializer/use.latest.version';
import useSchemaId from './avro_schema_registry_serializer/use.schema.id';
import valueSubjectNameStrategy from './avro_schema_registry_serializer/value.subject.name.strategy';

const configurations = [
    autoRegisterSchemas,
    avroReflectionAllowNull,
    avroRemoveJavaProperties,
    avroUseLogicalTypeConverters,
    contextNameStrategy,
    idCompatibilityStrict,
    keySubjectNameStrategy,
    latestCompatibilityStrict,
    normalizeSchemas,
    schemaFormat,
    schemaReflection,
    useLatestVersion,
    useSchemaId,
    valueSubjectNameStrategy,
];

const AvroSchemaRegistrySerializerConfiguration = { configurations };

export { AvroSchemaRegistrySerializerConfiguration };
