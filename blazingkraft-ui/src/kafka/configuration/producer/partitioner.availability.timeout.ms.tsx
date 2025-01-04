import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'partitioner.availability.timeout.ms',
    displayedName: 'partitioner.availability.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            If a broker cannot process produce requests from a partition for{' '}
            <Code>partitioner.availability.timeout.ms</Code> time, the
            partitioner treats that partition as not available. If the value is
            0, this logic is disabled. Note: this setting has no effect if a
            custom partitioner is used or{' '}
            <Code>partitioner.adaptive.partitioning.enable</Code> is set to
            'false'
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_partitioner.availability.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '0',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
