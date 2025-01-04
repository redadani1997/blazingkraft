// Configurations
import autoRegisterSchemas from './protobuf_schema_registry_deserializer/auto.register.schemas';
import contextNameStrategy from './protobuf_schema_registry_deserializer/context.name.strategy';
import deriveType from './protobuf_schema_registry_deserializer/derive.type';
import idCompatibilityStrict from './protobuf_schema_registry_deserializer/id.compatibility.strict';
import keySubjectNameStrategy from './protobuf_schema_registry_deserializer/key.subject.name.strategy';
import latestCompatibilityStrict from './protobuf_schema_registry_deserializer/latest.compatibility.strict';
import normalizeSchemas from './protobuf_schema_registry_deserializer/normalize.schemas';
import schemaFormat from './protobuf_schema_registry_deserializer/schema.format';
import schemaReflection from './protobuf_schema_registry_deserializer/schema.reflection';
import specificProtobufKeyType from './protobuf_schema_registry_deserializer/specific.protobuf.key.type';
import specificProtobufValueType from './protobuf_schema_registry_deserializer/specific.protobuf.value.type';
import useLatestVersion from './protobuf_schema_registry_deserializer/use.latest.version';
import useSchemaId from './protobuf_schema_registry_deserializer/use.schema.id';
import valueSubjectNameStrategy from './protobuf_schema_registry_deserializer/value.subject.name.strategy';

const configurations = [
    autoRegisterSchemas,
    contextNameStrategy,
    deriveType,
    idCompatibilityStrict,
    keySubjectNameStrategy,
    latestCompatibilityStrict,
    normalizeSchemas,
    schemaFormat,
    schemaReflection,
    specificProtobufKeyType,
    specificProtobufValueType,
    useLatestVersion,
    useSchemaId,
    valueSubjectNameStrategy,
];

const ProtobufSchemaRegistryDeserializerConfiguration = { configurations };

export { ProtobufSchemaRegistryDeserializerConfiguration };
