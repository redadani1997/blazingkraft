import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'min.cleanable.dirty.ratio',
    displayedName: 'min.cleanable.dirty.ratio',
    errorMessage: 'Please enter a valid value',
    documentation: <Text size="md">min.cleanable.dirty.ratio</Text>,
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'DOUBLE',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#topicconfigs_min.cleanable.dirty.ratio`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0.5',
    options: undefined,
    validValues: '[0,...,1]',
    displayedDefault: '0.5',
    validate: target => {
        return target >= 0.0 && target <= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
