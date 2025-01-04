import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'partitioner.ignore.keys',
    displayedName: 'partitioner.ignore.keys',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            When set to 'true' the producer won't use record keys to choose a
            partition. If 'false', producer would choose a partition based on a
            hash of the key when a key is present. Note: this setting has no
            effect if a custom partitioner is used.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_partitioner.ignore.keys`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'false',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'false',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
