import { TopicPartition } from './topic';

export type ProducerSerializer =
    | 'PER_REQUEST'
    | 'NULL'
    | 'STRING'
    | 'LONG'
    | 'DOUBLE'
    | 'BASE64'
    | 'JSON'
    | 'JSON_SCHEMA'
    | 'JSON_SCHEMA_REGISTRY'
    | 'AVRO_SCHEMA'
    | 'AVRO_SCHEMA_REGISTRY'
    | 'PROTOBUF_SCHEMA'
    | 'PROTOBUF_SCHEMA_REGISTRY';

export interface ProducerConfiguration {
    keySerializer?: ProducerSerializer;
    keySerializerConfiguration?: Map<string, string>;
    perRequestKeySerializer: boolean;

    valueSerializer?: ProducerSerializer;
    valueSerializerConfiguration?: Map<string, string>;
    perRequestValueSerializer: boolean;

    schemaRegistryCode?: string;
}

export interface ProducerCompleteConfiguration {
    keySerializer?: ProducerSerializer;
    keySerializerConfiguration?: Map<string, string>;
    perRequestKeySerializer: boolean;

    valueSerializer?: ProducerSerializer;
    valueSerializerConfiguration?: Map<string, string>;
    perRequestValueSerializer: boolean;

    commonConfiguration: Map<string, string>;
    mainConfiguration: Map<string, string>;

    schemaRegistryCode?: string;
}

export interface RecordMetadata {
    offset: number;
    timestamp: number;
    serializedKeySize: number;
    serializedValueSize: number;
    topicPartition: TopicPartition;
}
