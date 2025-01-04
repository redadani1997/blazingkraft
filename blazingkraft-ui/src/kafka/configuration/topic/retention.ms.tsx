import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'retention.ms',
    displayedName: 'retention.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This configuration controls the maximum time we will retain a log
            before we will discard old log segments to free up space if we are
            using the "delete" retention policy. This represents an SLA on how
            soon consumers must read their data. If set to -1, no time limit is
            applied.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_retention.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '604800000',
    options: undefined,
    validValues: '[-1,...]',
    displayedDefault: '604800000',
    validate: target => {
        return target >= -1.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
