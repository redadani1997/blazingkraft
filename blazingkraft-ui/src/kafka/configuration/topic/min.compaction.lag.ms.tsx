import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'min.compaction.lag.ms',
    displayedName: 'min.compaction.lag.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The minimum time a message will remain uncompacted in the log. Only
            applicable for logs that are being compacted.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#topicconfigs_min.compaction.lag.ms`}
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
