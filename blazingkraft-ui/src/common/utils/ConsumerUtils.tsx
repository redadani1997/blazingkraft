import { Text } from '@mantine/core';
import { ConsumerDeserializer } from 'common/types/consumer';
import { AvroSchemaRegistryDeserializerConfiguration } from 'kafka/configuration/AvroSchemaRegistryDeserializerConfiguration';
import { JsonSchemaRegistryDeserializerConfiguration } from 'kafka/configuration/JsonSchemaRegistryDeserializerConfiguration';
import { ProtobufSchemaRegistryDeserializerConfiguration } from 'kafka/configuration/ProtobufSchemaRegistryDeserializerConfiguration';
import { KafkaConfiguration } from 'kafka/index';
import { BlazingConsumerDisplayField } from 'scenes/consumer/blazing_consumer/body/blazing_consumer_records/BlazingConsumerRecordsComponent';
import { CommonUtils } from './CommonUtils';
import KafkaConfigurationUtils from './KafkaConfigurationUtils';

const CONSUMER_DESERIALIZER_LABEL_BY_VALUE: {
    [key in ConsumerDeserializer]: string;
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
const CONSUMER_DESERIALIZER_PER_REQUEST_OPTION: {
    label: string;
    value: ConsumerDeserializer;
    group?: string;
} = {
    label: 'Per Request',
    value: 'PER_REQUEST',
    group: 'Important',
};

const CONSUMER_DESERIALIZER_COMMON_OPTIONS: {
    label: string;
    value: ConsumerDeserializer;
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
];

const CONSUMER_DESERIALIZER_SCHEMA_OPTIONS: {
    label: string;
    value: ConsumerDeserializer;
    group?: string;
}[] = [
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

const CONSUMER_DESERIALIZER_SCHEMA_REGISTRY_OPTIONS: {
    label: string;
    value: ConsumerDeserializer;
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

function schemaRegistryDeserializerConfiguration(
    deserializer: ConsumerDeserializer,
    isKey: boolean,
    isReadOnly: boolean,
): KafkaConfiguration[] {
    let compuedConfigurations: KafkaConfiguration[] = [];
    if (deserializer === 'AVRO_SCHEMA_REGISTRY') {
        compuedConfigurations =
            AvroSchemaRegistryDeserializerConfiguration.configurations;
    } else if (deserializer === 'JSON_SCHEMA_REGISTRY') {
        compuedConfigurations =
            JsonSchemaRegistryDeserializerConfiguration.configurations;
    } else if (deserializer === 'PROTOBUF_SCHEMA_REGISTRY') {
        compuedConfigurations =
            ProtobufSchemaRegistryDeserializerConfiguration.configurations;
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

function computeInitialDeserializerConfiguration(
    deserializer: ConsumerDeserializer,
    isKey: boolean,
    isReadonly: boolean,
) {
    const initialDeserializerConfiguration = new Map<string, any>();

    const configurations: KafkaConfiguration[] =
        schemaRegistryDeserializerConfiguration(
            deserializer,
            isKey,
            isReadonly,
        );

    configurations.forEach(configuration => {
        initialDeserializerConfiguration.set(
            configuration.name,
            configuration.default,
        );
    });

    return initialDeserializerConfiguration;
}

function isSchemaEditorDeserializer(deserializer: ConsumerDeserializer) {
    return (
        deserializer === 'JSON_SCHEMA' ||
        deserializer === 'AVRO_SCHEMA' ||
        deserializer === 'PROTOBUF_SCHEMA'
    );
}

function isTextEditorDeserializer(deserializer: ConsumerDeserializer) {
    return (
        deserializer === 'STRING' ||
        deserializer === 'DOUBLE' ||
        deserializer === 'LONG' ||
        deserializer === 'NULL' ||
        deserializer === 'BASE64'
    );
}

function isJsonEditorDeserializer(deserializer: ConsumerDeserializer) {
    return (
        deserializer === 'JSON' ||
        deserializer === 'JSON_SCHEMA' ||
        deserializer === 'AVRO_SCHEMA' ||
        deserializer === 'PROTOBUF_SCHEMA' ||
        deserializer === 'JSON_SCHEMA_REGISTRY' ||
        deserializer === 'AVRO_SCHEMA_REGISTRY' ||
        deserializer === 'PROTOBUF_SCHEMA_REGISTRY'
    );
}

function hasSchemaRegistryDeserializer(
    keyDeserializer: ConsumerDeserializer,
    valueDeserializer: ConsumerDeserializer,
) {
    return (
        keyDeserializer === 'JSON_SCHEMA_REGISTRY' ||
        keyDeserializer === 'AVRO_SCHEMA_REGISTRY' ||
        keyDeserializer === 'PROTOBUF_SCHEMA_REGISTRY' ||
        valueDeserializer === 'JSON_SCHEMA_REGISTRY' ||
        valueDeserializer === 'AVRO_SCHEMA_REGISTRY' ||
        valueDeserializer === 'PROTOBUF_SCHEMA_REGISTRY'
    );
}

function hasSchemaDeserializer(
    keyDeserializer: ConsumerDeserializer,
    valueDeserializer: ConsumerDeserializer,
) {
    return (
        keyDeserializer === 'JSON_SCHEMA' ||
        keyDeserializer === 'AVRO_SCHEMA' ||
        keyDeserializer === 'PROTOBUF_SCHEMA' ||
        valueDeserializer === 'JSON_SCHEMA' ||
        valueDeserializer === 'AVRO_SCHEMA' ||
        valueDeserializer === 'PROTOBUF_SCHEMA'
    );
}

function isSchemaRegistryDeserializer(
    deserializer: ConsumerDeserializer,
): boolean {
    return (
        deserializer === 'AVRO_SCHEMA_REGISTRY' ||
        deserializer === 'PROTOBUF_SCHEMA_REGISTRY' ||
        deserializer === 'JSON_SCHEMA_REGISTRY'
    );
}

function editorLanguageByDeserializer(deserializer: ConsumerDeserializer) {
    if (deserializer === 'AVRO_SCHEMA_REGISTRY') {
        return 'json';
    } else if (deserializer === 'JSON_SCHEMA_REGISTRY') {
        return 'json';
    } else if (deserializer === 'PROTOBUF_SCHEMA_REGISTRY') {
        return 'proto';
    } else if (deserializer === 'AVRO_SCHEMA') {
        return 'json';
    } else if (deserializer === 'JSON_SCHEMA') {
        return 'json';
    } else if (deserializer === 'PROTOBUF_SCHEMA') {
        return 'proto';
    } else if (deserializer === 'JSON') {
        return 'json';
    } else if (deserializer === 'STRING') {
        return 'text';
    } else if (deserializer === 'DOUBLE') {
        return 'text';
    } else if (deserializer === 'LONG') {
        return 'text';
    } else if (deserializer === 'NULL') {
        return 'text';
    } else if (deserializer === 'BASE64') {
        return 'text';
    } else {
        return 'text';
    }
}

export type TextSearchFilterType =
    | 'DISABLED'
    | 'CONTAINS'
    | 'STARTS_WITH'
    | 'ENDS_WITH'
    | 'EQUALS'
    | 'REGEX'
    | 'NOT_CONTAINS'
    | 'NOT_STARTS_WITH'
    | 'NOT_ENDS_WITH'
    | 'NOT_EQUALS'
    | 'NOT_REGEX';

const TextSearchFilterTypeOptions: {
    label: string;
    value: TextSearchFilterType;
}[] = [
    {
        label: 'Disabled',
        value: 'DISABLED',
    },
    {
        label: 'Contains',
        value: 'CONTAINS',
    },
    {
        label: 'Equals',
        value: 'EQUALS',
    },
    {
        label: 'Starts With',
        value: 'STARTS_WITH',
    },
    {
        label: 'Ends With',
        value: 'ENDS_WITH',
    },
    {
        label: 'Regex',

        value: 'REGEX',
    },
    {
        label: 'Not Contains',
        value: 'NOT_CONTAINS',
    },
    {
        label: 'Not Equals',
        value: 'NOT_EQUALS',
    },
    {
        label: 'Not Starts With',
        value: 'NOT_STARTS_WITH',
    },
    {
        label: 'Not Ends With',
        value: 'NOT_ENDS_WITH',
    },
    {
        label: 'Not Regex',
        value: 'NOT_REGEX',
    },
];
const TEXT_SEARCH_FILTER_TYPE_LABEL_BY_VALUE = {
    DISABLED: 'Disabled',
    CONTAINS: 'Contains',
    EQUALS: 'Equals',
    STARTS_WITH: 'Starts With',
    ENDS_WITH: 'Ends With',
    REGEX: 'Regex',
    NOT_CONTAINS: 'Not Contains',
    NOT_EQUALS: 'Not Equals',
    NOT_STARTS_WITH: 'Not Starts With',
    NOT_ENDS_WITH: 'Not Ends With',
    NOT_REGEX: 'Not Regex',
};

const POLL_TIMEOUT_MS_CONFIGURATION: KafkaConfiguration = {
    displayedName: 'Poll Timeout (ms)',
    name: 'Poll Timeout (ms)',
    documentation: <Text size="md">This is a custom configuration</Text>,
    type: 'LONG',
    required: true,
    default: 1000,
    displayedDefault: 1000,
    validValues: null,
    documentationProps: null,
    importance: 'HIGH',
    validate: () => true,
    errorMessage: null,
    isSelectable: false,
    disabledForever: false,
    disabled: false,
    disabledMessage: null,
    options: null,
    proTip: null,
    numericUnit: null,
    group: null,
    order: null,
    orderInGroup: null,
    width: null,
    dependents: null,
    isFileConfig: false,
    readOnly: false,
    sensitive: false,
    source: null,
};

export interface IBlazingKRaftConsumerConfigurationStorage {
    kafkaKeySchema?: string;
    kafkaValueSchema?: string;
    keyDeserializer?: ConsumerDeserializer;
    keyDeserializerConfiguration?: {
        [key: string]: any;
    };
    valueDeserializer?: ConsumerDeserializer;
    valueDeserializerConfiguration?: {
        [key: string]: any;
    };
}

function storeBlazingKRaftConsumerConfigurationStorage(
    storage: IBlazingKRaftConsumerConfigurationStorage,
    setStorage: (storage: string) => void,
) {
    const jsonString = CommonUtils.beautifyJson(storage);
    setStorage(jsonString);
}

function retrieveBlazingKRaftConsumerConfigurationStorage(
    getStorage: () => string,
): IBlazingKRaftConsumerConfigurationStorage {
    try {
        const jsonString = getStorage();

        const json = CommonUtils.stringToObject(jsonString);
        if (json === null) {
            return null;
        }
        return {
            ...json,
            keyDeserializerConfiguration: CommonUtils.objectToMap(
                json.keyDeserializerConfiguration,
            ),
            valueDeserializerConfiguration: CommonUtils.objectToMap(
                json.valueDeserializerConfiguration,
            ),
        };
    } catch (err) {
        return null;
    }
}

export interface IBlazingKRaftConsumerSettingsStorage {
    displayedFields: BlazingConsumerDisplayField[];
    timezone: string;
    timeFormat: string;
    resultsSize: number;
}

function storeBlazingKRaftConsumerSettingsStorage(
    storage: IBlazingKRaftConsumerSettingsStorage,
    setStorage: (storage: string) => void,
) {
    const jsonString = CommonUtils.beautifyJson(storage);
    setStorage(jsonString);
}

function retrieveBlazingKRaftConsumerSettingsStorage(
    getStorage: () => string,
): IBlazingKRaftConsumerSettingsStorage {
    try {
        const jsonString = getStorage();

        return CommonUtils.stringToObject(jsonString);
    } catch (err) {
        return null;
    }
}

const MAX_RESULTS_SIZE = 1000;

const DEFAULT_RESULTS_SIZE = 300;

const ConsumerUtils = {
    CONSUMER_DESERIALIZER_COMMON_OPTIONS,
    CONSUMER_DESERIALIZER_SCHEMA_REGISTRY_OPTIONS,
    CONSUMER_DESERIALIZER_SCHEMA_OPTIONS,
    CONSUMER_DESERIALIZER_LABEL_BY_VALUE,
    CONSUMER_DESERIALIZER_PER_REQUEST_OPTION,
    schemaRegistryDeserializerConfiguration,
    isTextEditorDeserializer,
    isJsonEditorDeserializer,
    isSchemaEditorDeserializer,
    editorLanguageByDeserializer,
    computeInitialDeserializerConfiguration,
    isSchemaRegistryDeserializer,
    hasSchemaRegistryDeserializer,
    hasSchemaDeserializer,
    TextSearchFilterTypeOptions,
    TEXT_SEARCH_FILTER_TYPE_LABEL_BY_VALUE,
    POLL_TIMEOUT_MS_CONFIGURATION,
    storeBlazingKRaftConsumerConfigurationStorage,
    retrieveBlazingKRaftConsumerConfigurationStorage,
    storeBlazingKRaftConsumerSettingsStorage,
    retrieveBlazingKRaftConsumerSettingsStorage,
    MAX_RESULTS_SIZE,
    DEFAULT_RESULTS_SIZE,
};

export { ConsumerUtils };
