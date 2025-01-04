export interface SchemaRegistryMeta {
    id: string;
    name: string;
    code: string;
    configuration: { [key: string]: any };
    jmxEnabled: boolean;
}

export interface SubjectMeta {
    subject: string;
}

export interface SubjectVersions {
    subject: string;
    versions: number[];
}

export type SchemaCompatibility =
    | 'BACKWARD'
    | 'BACKWARD_TRANSITIVE'
    | 'FORWARD'
    | 'FORWARD_TRANSITIVE'
    | 'FULL'
    | 'FULL_TRANSITIVE'
    | 'FULL_TRANSITIVE'
    | 'NONE';

export type SchemaRegistryMode =
    | 'READWRITE'
    | 'READONLY'
    | 'READONLY_OVERRIDE'
    | 'IMPORT';

export type SchemaType =
    | 'AVRO'
    | 'JSON'
    | 'PROTOBUF'
    | 'OPENAPI_JSON'
    | 'OPENAPI_YAML'
    | 'Freestyle';

export type ContentType = 'JSON' | 'YAML';

export type SubjectNameStrategy =
    | 'Topic Name Strategy'
    | 'Record Name Strategy'
    | 'Topic and Record Name Strategy'
    | 'Freestyle';

export type SubjectType = 'Key' | 'Value';

export interface SubjectDescription {
    subject: string;
    latestSchemaVersion: number;
    latestSchemaType: SchemaType;
    mode: SchemaRegistryMode;
    compatibility: SchemaCompatibility;
}

export interface SchemaReference {
    name: string;
    subject: string;
    version: number;
    lineIndex: number;
}

export interface SchemaMetaData {
    id: number;
    version: number;
    schemaType: SchemaType;
    schema: string;
    references?: SchemaReference[];
}

export interface SubjectDetails {
    schemasMetaData: SchemaMetaData[];
    mode?: SchemaRegistryMode;
    compatibility?: SchemaCompatibility;
    subject: string;
}

export interface TopicSubjectDetails {
    keySubjectDetails: SubjectDetails;
    valueSubjectDetails: SubjectDetails;
}

export interface SchemaRegistry {
    name: string;
    code: string;
    schemaRegistryUrls: string;
}

export interface SchemaRegistryDetails {
    name: string;
    code: string;
    color: string;
    schemaRegistryUrls: string;
    schemasCacheSize: string;
    mainConfiguration: Map<string, any>;
    jmxEnabled: boolean;
    jmxUrl: string | null;
    jmxEnvironment: Map<string, any> | null;
}
