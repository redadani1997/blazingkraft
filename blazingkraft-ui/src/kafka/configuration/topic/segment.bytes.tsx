import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'segment.bytes',
    displayedName: 'segment.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This configuration controls the segment file size for the log.
            Retention and cleaning is always done a file at a time so a larger
            segment size means fewer files but less granular control over
            retention.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_segment.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '1073741824',
    options: undefined,
    validValues: '[14,...]',
    displayedDefault: '1073741824',
    validate: target => {
        return target >= 14.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
