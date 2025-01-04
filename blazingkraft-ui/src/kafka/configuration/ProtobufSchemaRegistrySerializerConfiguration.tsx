// Configurations
import autoRegisterSchemas from './protobuf_schema_registry_serializer/auto.register.schemas';
import contextNameStrategy from './protobuf_schema_registry_serializer/context.name.strategy';
import idCompatibilityStrict from './protobuf_schema_registry_serializer/id.compatibility.strict';
import keySubjectNameStrategy from './protobuf_schema_registry_serializer/key.subject.name.strategy';
import latestCompatibilityStrict from './protobuf_schema_registry_serializer/latest.compatibility.strict';
import normalizeSchemas from './protobuf_schema_registry_serializer/normalize.schemas';
import referenceLookupOnly from './protobuf_schema_registry_serializer/reference.lookup.only';
import referenceSubjectNameStrategy from './protobuf_schema_registry_serializer/reference.subject.name.strategy';
import schemaFormat from './protobuf_schema_registry_serializer/schema.format';
import schemaReflection from './protobuf_schema_registry_serializer/schema.reflection';
import skipKnownTypes from './protobuf_schema_registry_serializer/skip.known.types';
import useLatestVersion from './protobuf_schema_registry_serializer/use.latest.version';
import useSchemaId from './protobuf_schema_registry_serializer/use.schema.id';
import valueSubjectNameStrategy from './protobuf_schema_registry_serializer/value.subject.name.strategy';

const configurations = [
    autoRegisterSchemas,
    contextNameStrategy,
    idCompatibilityStrict,
    keySubjectNameStrategy,
    latestCompatibilityStrict,
    normalizeSchemas,
    referenceLookupOnly,
    referenceSubjectNameStrategy,
    schemaFormat,
    schemaReflection,
    skipKnownTypes,
    useLatestVersion,
    useSchemaId,
    valueSubjectNameStrategy,
];

const ProtobufSchemaRegistrySerializerConfiguration = { configurations };

export { ProtobufSchemaRegistrySerializerConfiguration };
