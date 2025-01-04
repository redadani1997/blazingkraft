import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'compression.type',
    displayedName: 'compression.type',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Specify the final compression type for a given topic. This
            configuration accepts the standard compression codecs ('gzip',
            'snappy', 'lz4', 'zstd'). It additionally accepts 'uncompressed'
            which is equivalent to no compression; and 'producer' which means
            retain the original compression codec set by the producer.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#topicconfigs_compression.type`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'producer',
    options: [
        {
            label: 'uncompressed',
            value: 'uncompressed',
        },
        {
            label: 'zstd',
            value: 'zstd',
        },
        {
            label: 'lz4',
            value: 'lz4',
        },
        {
            label: 'snappy',
            value: 'snappy',
        },
        {
            label: 'gzip',
            value: 'gzip',
        },
        {
            label: 'producer',
            value: 'producer',
        },
    ],
    validValues: '[uncompressed, zstd, lz4, snappy, gzip, producer]',
    displayedDefault: 'producer',
    validate: target => {
        if (
            target === 'uncompressed' ||
            target === 'zstd' ||
            target === 'lz4' ||
            target === 'snappy' ||
            target === 'gzip' ||
            target === 'producer'
        ) {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
