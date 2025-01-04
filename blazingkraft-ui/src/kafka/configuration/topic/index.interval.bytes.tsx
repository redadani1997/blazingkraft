import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'index.interval.bytes',
    displayedName: 'index.interval.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This setting controls how frequently Kafka adds an index entry to
            its offset index. The default setting ensures that we index a
            message roughly every 4096 bytes. More indexing allows reads to jump
            closer to the exact position in the log but makes the index larger.
            You probably don't need to change this.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_index.interval.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '4096',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '4096',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
