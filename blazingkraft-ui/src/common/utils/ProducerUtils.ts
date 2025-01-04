import { ProducerSerializer } from 'common/types/producer';
import { AvroSchemaRegistrySerializerConfiguration } from 'kafka/configuration/AvroSchemaRegistrySerializerConfiguration';
import { JsonSchemaRegistrySerializerConfiguration } from 'kafka/configuration/JsonSchemaRegistrySerializerConfiguration';
import { ProtobufSchemaRegistrySerializerConfiguration } from 'kafka/configuration/ProtobufSchemaRegistrySerializerConfiguration';
import { KafkaConfiguration } from 'kafka/index';
import { BlazingProducerDisplayField } from 'scenes/producer/blazing_producer/body/blazing_producer_records/BlazingProducerRecordsComponent';
import { CommonUtils } from './CommonUtils';
import KafkaConfigurationUtils from './KafkaConfigurationUtils';

const PRODUCER_SERIALIZER_LABEL_BY_VALUE: {
    [key in ProducerSerializer]: string;
} = {
    PER_REQUEST: 'Per Request',
    NULL: 'Null',
    STRING: 'String',
    DOUBLE: 'Double',
    LONG: 'Long',
    BASE64: 'Base64',
    JSON: 'Json',
    JSON_SCHEMA: 'Json Schema',
    JSON_SCHEMA_REGISTRY: 'Json Schema Registry',
    AVRO_SCHEMA: 'Avro Schema',
    AVRO_SCHEMA_REGISTRY: 'Avro Schema Registry',
    PROTOBUF_SCHEMA: 'Protobuf Schema',
    PROTOBUF_SCHEMA_REGISTRY: 'Protobuf Schema Registry',
};
const PRODUCER_SERIALIZER_PER_REQUEST_OPTION: {
    label: string;
    value: ProducerSerializer;
    group?: string;
} = {
    label: 'Per Request',
    value: 'PER_REQUEST',
    group: 'Important',
};

const PRODUCER_SERIALIZER_COMMON_OPTIONS: {
    label: string;
    value: ProducerSerializer;
    group?: string;
}[] = [
    {
        label: 'Null',
        value: 'NULL',
        group: 'Common',
    },
    {
        label: 'String',
        value: 'STRING',
        group: 'Common',
    },
    {
        label: 'Base64',
        value: 'BASE64',
        group: 'Common',
    },
    {
        label: 'Double',
        value: 'DOUBLE',
        group: 'Common',
    },
    {
        label: 'Long',
        value: 'LONG',
        group: 'Common',
    },
    {
        label: 'Json',
        value: 'JSON',
        group: 'Common',
    },
    {
        label: 'Json Schema',
        value: 'JSON_SCHEMA',
        group: 'Common',
    },
    {
        label: 'Avro Schema',
        value: 'AVRO_SCHEMA',
        group: 'Common',
    },
    {
        label: 'Protobuf Schema',
        value: 'PROTOBUF_SCHEMA',
        group: 'Common',
    },
];

const PRODUCER_SERIALIZER_SCHEMA_REGISTRY_OPTIONS: {
    label: string;
    value: ProducerSerializer;
    group?: string;
}[] = [
    {
        label: 'Json Schema Registry',
        value: 'JSON_SCHEMA_REGISTRY',
        group: 'Schema Registry',
    },
    {
        label: 'Avro Schema Registry',
        value: 'AVRO_SCHEMA_REGISTRY',
        group: 'Schema Registry',
    },
    {
        label: 'Protobuf Schema Registry',
        value: 'PROTOBUF_SCHEMA_REGISTRY',
        group: 'Schema Registry',
    },
];

function schemaRegistrySerializerConfiguration(
    serializer: ProducerSerializer,
    isKey: boolean,
    isReadOnly: boolean,
): KafkaConfiguration[] {
    let compuedConfigurations: KafkaConfiguration[] = [];
    if (serializer === 'AVRO_SCHEMA_REGISTRY') {
        compuedConfigurations =
            AvroSchemaRegistrySerializerConfiguration.configurations;
    } else if (serializer === 'JSON_SCHEMA_REGISTRY') {
        compuedConfigurations =
            JsonSchemaRegistrySerializerConfiguration.configurations;
    } else if (serializer === 'PROTOBUF_SCHEMA_REGISTRY') {
        compuedConfigurations =
            ProtobufSchemaRegistrySerializerConfiguration.configurations;
    }

    compuedConfigurations = compuedConfigurations.filter(
        configuration =>
            (isKey && configuration.name !== 'value.subject.name.strategy') ||
            (!isKey && configuration.name !== 'key.subject.name.strategy'),
    );

    return isReadOnly
        ? KafkaConfigurationUtils.disableConfigurations(compuedConfigurations)
        : compuedConfigurations;
}

function computeInitialSerializerConfiguration(
    serializer: ProducerSerializer,
    isKey: boolean,
    isReadonly: boolean,
) {
    const initialSerializerConfiguration = new Map<string, any>();

    const configurations: KafkaConfiguration[] =
        schemaRegistrySerializerConfiguration(serializer, isKey, isReadonly);

    configurations.forEach(configuration => {
        initialSerializerConfiguration.set(
            configuration.name,
            configuration.default,
        );
    });

    return initialSerializerConfiguration;
}

function isSchemaEditorSerializer(serializer: ProducerSerializer) {
    return (
        serializer === 'JSON_SCHEMA' ||
        serializer === 'AVRO_SCHEMA' ||
        serializer === 'PROTOBUF_SCHEMA'
    );
}

function isTextEditorSerializer(serializer: ProducerSerializer) {
    return (
        serializer === 'STRING' ||
        serializer === 'DOUBLE' ||
        serializer === 'LONG' ||
        serializer === 'NULL' ||
        serializer === 'BASE64'
    );
}

function isJsonEditorSerializer(serializer: ProducerSerializer) {
    return (
        serializer === 'JSON' ||
        serializer === 'JSON_SCHEMA' ||
        serializer === 'AVRO_SCHEMA' ||
        serializer === 'PROTOBUF_SCHEMA' ||
        serializer === 'JSON_SCHEMA_REGISTRY' ||
        serializer === 'AVRO_SCHEMA_REGISTRY' ||
        serializer === 'PROTOBUF_SCHEMA_REGISTRY'
    );
}

function hasSchemaRegistrySerializer(
    keySerializer: ProducerSerializer,
    valueSerializer: ProducerSerializer,
) {
    return (
        keySerializer === 'JSON_SCHEMA_REGISTRY' ||
        keySerializer === 'AVRO_SCHEMA_REGISTRY' ||
        keySerializer === 'PROTOBUF_SCHEMA_REGISTRY' ||
        valueSerializer === 'JSON_SCHEMA_REGISTRY' ||
        valueSerializer === 'AVRO_SCHEMA_REGISTRY' ||
        valueSerializer === 'PROTOBUF_SCHEMA_REGISTRY'
    );
}

function isSchemaRegistrySerializer(serializer: ProducerSerializer): boolean {
    return (
        serializer === 'AVRO_SCHEMA_REGISTRY' ||
        serializer === 'PROTOBUF_SCHEMA_REGISTRY' ||
        serializer === 'JSON_SCHEMA_REGISTRY'
    );
}

function editorLanguageBySerializer(serializer: ProducerSerializer) {
    if (serializer === 'AVRO_SCHEMA_REGISTRY') {
        return 'json';
    } else if (serializer === 'JSON_SCHEMA_REGISTRY') {
        return 'json';
    } else if (serializer === 'PROTOBUF_SCHEMA_REGISTRY') {
        return 'proto';
    } else if (serializer === 'AVRO_SCHEMA') {
        return 'json';
    } else if (serializer === 'JSON_SCHEMA') {
        return 'json';
    } else if (serializer === 'PROTOBUF_SCHEMA') {
        return 'proto';
    } else if (serializer === 'JSON') {
        return 'json';
    } else if (serializer === 'STRING') {
        return 'text';
    } else if (serializer === 'DOUBLE') {
        return 'text';
    } else if (serializer === 'LONG') {
        return 'text';
    } else if (serializer === 'NULL') {
        return 'text';
    } else if (serializer === 'BASE64') {
        return 'text';
    } else {
        return 'text';
    }
}

export interface IBlazingKRaftProducerConfigurationStorage {
    kafkaKey: string;
    kafkaValue: string;
    kafkaHeaders: string;
    kafkaKeySchema?: string;
    kafkaValueSchema?: string;
    keySerializer?: ProducerSerializer;
    keySerializerConfiguration?: {
        [key: string]: any;
    };
    valueSerializer?: ProducerSerializer;
    valueSerializerConfiguration?: {
        [key: string]: any;
    };
}

function storeBlazingKRaftProducerConfigurationStorage(
    storage: IBlazingKRaftProducerConfigurationStorage,
    setStorage: (storage: string) => void,
) {
    const jsonString = CommonUtils.beautifyJson(storage);
    setStorage(jsonString);
}

function retrieveBlazingKRaftProducerConfigurationStorage(
    getStorage: () => string,
): IBlazingKRaftProducerConfigurationStorage {
    try {
        const jsonString = getStorage();

        const json = CommonUtils.stringToObject(jsonString);
        if (json === null) {
            return null;
        }
        return {
            ...json,
            keySerializerConfiguration: CommonUtils.objectToMap(
                json.keySerializerConfiguration,
            ),
            valueSerializerConfiguration: CommonUtils.objectToMap(
                json.valueSerializerConfiguration,
            ),
        };
    } catch (err) {
        return null;
    }
}

export interface IBlazingKRaftProducerSettingsStorage {
    displayedFields: BlazingProducerDisplayField[];
    timezone: string;
    timeFormat: string;
}

function storeBlazingKRaftProducerSettingsStorage(
    storage: IBlazingKRaftProducerSettingsStorage,
    setStorage: (storage: string) => void,
) {
    const jsonString = CommonUtils.beautifyJson(storage);
    setStorage(jsonString);
}

function retrieveBlazingKRaftProducerSettingsStorage(
    getStorage: () => string,
): IBlazingKRaftProducerSettingsStorage {
    try {
        const jsonString = getStorage();

        return CommonUtils.stringToObject(jsonString);
    } catch (err) {
        return null;
    }
}

const ProducerUtils = {
    PRODUCER_SERIALIZER_COMMON_OPTIONS,
    PRODUCER_SERIALIZER_SCHEMA_REGISTRY_OPTIONS,
    PRODUCER_SERIALIZER_PER_REQUEST_OPTION,
    PRODUCER_SERIALIZER_LABEL_BY_VALUE,
    schemaRegistrySerializerConfiguration,
    isTextEditorSerializer,
    isJsonEditorSerializer,
    isSchemaEditorSerializer,
    editorLanguageBySerializer,
    computeInitialSerializerConfiguration,
    isSchemaRegistrySerializer,
    hasSchemaRegistrySerializer,
    storeBlazingKRaftProducerConfigurationStorage,
    retrieveBlazingKRaftProducerConfigurationStorage,
    storeBlazingKRaftProducerSettingsStorage,
    retrieveBlazingKRaftProducerSettingsStorage,
};

export { ProducerUtils };
