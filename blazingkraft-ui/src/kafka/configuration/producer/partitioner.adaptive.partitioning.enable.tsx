import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'partitioner.adaptive.partitioning.enable',
    displayedName: 'partitioner.adaptive.partitioning.enable',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            When set to 'true', the producer will try to adapt to broker
            performance and produce more messages to partitions hosted on faster
            brokers. If 'false', producer will try to distribute messages
            uniformly. Note: this setting has no effect if a custom partitioner
            is used
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_partitioner.adaptive.partitioning.enable`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'true',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'true',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
