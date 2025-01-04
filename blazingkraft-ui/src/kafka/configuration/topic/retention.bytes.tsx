import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'retention.bytes',
    displayedName: 'retention.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This configuration controls the maximum size a partition (which
            consists of log segments) can grow to before we will discard old log
            segments to free up space if we are using the "delete" retention
            policy. By default there is no size limit only a time limit. Since
            this limit is enforced at the partition level, multiply it by the
            number of partitions to compute the topic retention in bytes.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_retention.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '-1',
    options: undefined,
    validValues: undefined,
    displayedDefault: '-1',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
