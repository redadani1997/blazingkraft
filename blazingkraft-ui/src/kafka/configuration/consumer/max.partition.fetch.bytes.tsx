import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.partition.fetch.bytes',
    displayedName: 'max.partition.fetch.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of data per-partition the server will return.
            Records are fetched in batches by the consumer. If the first record
            batch in the first non-empty partition of the fetch is larger than
            this limit, the batch will still be returned to ensure that the
            consumer can make progress. The maximum record batch size accepted
            by the broker is defined via <Code>message.max.bytes</Code> (broker
            config) or <Code>max.message.bytes</Code> (topic config). See
            fetch.max.bytes for limiting the consumer request size.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_max.partition.fetch.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '1048576',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '1048576',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
