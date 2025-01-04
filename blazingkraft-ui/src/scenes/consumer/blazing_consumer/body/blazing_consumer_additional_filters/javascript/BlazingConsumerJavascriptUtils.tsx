const CONTENT_BOILERPLATE = `function doFilter(key, value, headers, metadata) {
    // Your code goes here
    return true;
}

// type Key = JsonObject | string | null | undefined;

// type Value = JsonObject | string | null | undefined;

// type Headers = JsonObject | null | undefined;

// interface Metadata {
//     topic: string;
//     partition: number;
//     offset: number;
//     timestamp: number;
//     timestampType: 'NoTimestampType' | 'CreateTime' | 'LogAppendTime';
//     serializedKeySize: number;
//     serializedValueSize: number;
//     leaderEpoch: number;
// }

// interface JsonObject {
//     [key: string]: any;
// }
`;
const EXAMPLES = `// Example 1: Filter by key
return key === 'some key';

// Example 2: Filter by string value
return value === 'some value';

// Example 3: Filter by object value
return value.someKey === 'some value';

// Example 4: Filter by headers
return headers.someKey === 'some value';

// Example 5: Filter by metadata
return metadata.topic === 'some topic';

// Example 6: Filter by all
return key === 'some key' && value.someKey === 'some value' && headers.someKey === 'some value' && metadata.topic === 'some topic';
`;

const BlazingConsumerJavascriptUtils = { CONTENT_BOILERPLATE, EXAMPLES };

export { BlazingConsumerJavascriptUtils };
