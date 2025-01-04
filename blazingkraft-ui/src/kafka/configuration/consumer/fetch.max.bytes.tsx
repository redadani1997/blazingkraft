import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'fetch.max.bytes',
    displayedName: 'fetch.max.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of data the server should return for a fetch
            request. Records are fetched in batches by the consumer, and if the
            first record batch in the first non-empty partition of the fetch is
            larger than this value, the record batch will still be returned to
            ensure that the consumer can make progress. As such, this is not a
            absolute maximum. The maximum record batch size accepted by the
            broker is defined via <Code>message.max.bytes</Code> (broker config)
            or <Code>max.message.bytes</Code> (topic config). Note that the
            consumer performs multiple fetches in parallel.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_fetch.max.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '52428800',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '52428800',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
