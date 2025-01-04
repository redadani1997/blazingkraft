import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'delete.retention.ms',
    displayedName: 'delete.retention.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The amount of time to retain delete tombstone markers for{' '}
            <a href="#compaction">log compacted</a> topics. This setting also
            gives a bound on the time in which a consumer must complete a read
            if they begin from offset 0 to ensure that they get a valid snapshot
            of the final stage (otherwise delete tombstones may be collected
            before they complete their scan).
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_delete.retention.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '86400000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '86400000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
