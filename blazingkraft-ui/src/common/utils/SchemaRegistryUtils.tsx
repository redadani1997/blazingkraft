import { Avatar, Text } from '@mantine/core';
import avrologo from 'assets/schemas/avrologo.png';
import jsonlogo from 'assets/schemas/jsonlogo.png';
import protobuflogo from 'assets/schemas/protobuflogo.png';
import {
    SchemaCompatibility,
    SchemaRegistryMode,
    SchemaType,
    SubjectNameStrategy,
    SubjectType,
} from 'common/types/schema_registry';

function schemaTypeLogoByType(schemaType: SchemaType) {
    if (schemaType === 'AVRO') {
        return avrologo;
    }
    if (schemaType === 'JSON') {
        return jsonlogo;
    }
    if (schemaType === 'PROTOBUF') {
        return protobuflogo;
    }
}

function schemaTypeLabelByType(schemaType: SchemaType) {
    return (
        <div className="flex items-center">
            <Avatar
                src={schemaTypeLogoByType(schemaType)}
                className="w-8 h-8"
            />
            <Text className="pl-3">{schemaType}</Text>
        </div>
    );
}

const SCHEMA_TYPES_OPTIONS = [
    {
        label: 'AVRO',
        value: 'AVRO',
    },
    {
        label: 'JSON',
        value: 'JSON',
    },
    {
        label: 'PROTOBUF',
        value: 'PROTOBUF',
    },
];

const SUBJECT_STRATEGIES_OPTIONS: {
    label: SubjectNameStrategy;
    value: SubjectNameStrategy;
}[] = [
    {
        label: 'Topic Name Strategy',
        value: 'Topic Name Strategy',
    },
    {
        label: 'Record Name Strategy',
        value: 'Record Name Strategy',
    },
    {
        label: 'Topic and Record Name Strategy',
        value: 'Topic and Record Name Strategy',
    },
    {
        label: 'Freestyle',
        value: 'Freestyle',
    },
];
const SUBJECT_TYPES_OPTIONS: {
    label: SubjectType;
    value: SubjectType;
}[] = [
    {
        label: 'Key',
        value: 'Key',
    },
    {
        label: 'Value',
        value: 'Value',
    },
];

const SCHEMA_COMPATIBILITY_OPTIONS: {
    label: SchemaCompatibility;
    value: SchemaCompatibility;
}[] = [
    {
        label: 'BACKWARD',
        value: 'BACKWARD',
    },
    {
        label: 'BACKWARD_TRANSITIVE',
        value: 'BACKWARD_TRANSITIVE',
    },
    {
        label: 'FORWARD',
        value: 'FORWARD',
    },
    {
        label: 'FORWARD_TRANSITIVE',
        value: 'FORWARD_TRANSITIVE',
    },
    {
        label: 'FULL',
        value: 'FULL',
    },
    {
        label: 'FULL_TRANSITIVE',
        value: 'FULL_TRANSITIVE',
    },
    {
        label: 'NONE',
        value: 'NONE',
    },
];

const SCHEMA_REGISTRY_MODE_OPTIONS: {
    label: SchemaRegistryMode;
    value: SchemaRegistryMode;
}[] = [
    {
        label: 'IMPORT',
        value: 'IMPORT',
    },
    {
        label: 'READONLY',
        value: 'READONLY',
    },
    {
        label: 'READONLY_OVERRIDE',
        value: 'READONLY_OVERRIDE',
    },
    {
        label: 'READWRITE',
        value: 'READWRITE',
    },
];

export {
    schemaTypeLabelByType,
    SCHEMA_TYPES_OPTIONS,
    SUBJECT_STRATEGIES_OPTIONS,
    SUBJECT_TYPES_OPTIONS,
    SCHEMA_COMPATIBILITY_OPTIONS,
    SCHEMA_REGISTRY_MODE_OPTIONS,
};
