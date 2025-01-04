import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'metadata.max.idle.ms',
    displayedName: 'metadata.max.idle.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Controls how long the producer will cache metadata for a topic
            that's idle. If the elapsed time since a topic was last produced to
            exceeds the metadata idle duration, then the topic's metadata is
            forgotten and the next access to it will force a metadata fetch
            request.
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
                href={`https://kafka.apache.org/documentation/#producerconfigs_metadata.max.idle.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '300000',
    options: undefined,
    validValues: '[5000,...]',
    displayedDefault: '300000',
    validate: target => {
        return target >= 5000.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
