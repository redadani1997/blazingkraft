import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'segment.index.bytes',
    displayedName: 'segment.index.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This configuration controls the size of the index that maps offsets
            to file positions. We preallocate this index file and shrink it only
            after log rolls. You generally should not need to change this
            setting.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_segment.index.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '10485760',
    options: undefined,
    validValues: '[14,...]',
    displayedDefault: '10485760',
    validate: target => {
        return target >= 14.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
