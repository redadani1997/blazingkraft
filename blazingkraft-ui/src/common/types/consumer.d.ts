import { TopicPartition } from './topic';

export type ConsumerDeserializer =
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

export interface ConsumerConfiguration {
    keyDeserializer?: ConsumerDeserializer;
    keyDeserializerConfiguration?: Map<string, string>;
    perRequestKeyDeserializer: boolean;

    valueDeserializer?: ConsumerDeserializer;
    valueDeserializerConfiguration?: Map<string, string>;
    perRequestValueDeserializer: boolean;

    schemaRegistryCode?: string;
}

export interface ConsumerCompleteConfiguration {
    keyDeserializer?: ConsumerDeserializer;
    keyDeserializerConfiguration?: Map<string, string>;
    perRequestKeyDeserializer: boolean;

    valueDeserializer?: ConsumerDeserializer;
    valueDeserializerConfiguration?: Map<string, string>;
    perRequestValueDeserializer: boolean;

    commonConfiguration: Map<string, string>;
    mainConfiguration: Map<string, string>;

    pollTimeoutMs: number;

    schemaRegistryCode?: string;
}

export interface RecordMetadata {
    offset: number;
    timestamp: number;
    serializedKeySize: number;
    serializedValueSize: number;
    topicPartition: TopicPartition;
}

export interface BlazingConsumptionPayloadResponse {
    payload?: string;
    succeeded: boolean;
    errorMessage?: string;
}

export interface BlazingConsumptionMetadataResponse {
    topic: string;
    partition: number;
    offset: number;
    timestamp: number;
    timestampType: 'NoTimestampType' | 'CreateTime' | 'LogAppendTime';
    serializedKeySize: number;
    serializedValueSize: number;
    leaderEpoch: any;
}

export interface BlazingConsumptionResponse {
    id: number;
    metadata: BlazingConsumptionMetadataResponse;
    headers: {
        [key: string]: any;
    };
    key: BlazingConsumptionPayloadResponse;
    value: BlazingConsumptionPayloadResponse;
}
