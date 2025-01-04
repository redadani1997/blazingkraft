import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.compaction.lag.ms',
    displayedName: 'max.compaction.lag.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum time a message will remain ineligible for compaction in
            the log. Only applicable for logs that are being compacted.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_max.compaction.lag.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '9223372036854775807',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '9223372036854775807',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
