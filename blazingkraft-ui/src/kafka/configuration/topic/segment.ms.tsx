import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'segment.ms',
    displayedName: 'segment.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This configuration controls the period of time after which Kafka
            will force the log to roll even if the segment file isn't full to
            ensure that retention can delete or compact old data.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_segment.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '604800000',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '604800000',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
