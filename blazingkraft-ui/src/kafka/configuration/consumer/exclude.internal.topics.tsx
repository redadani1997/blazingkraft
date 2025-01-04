import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'exclude.internal.topics',
    displayedName: 'exclude.internal.topics',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Whether internal topics matching a subscribed pattern should be
            excluded from the subscription. It is always possible to explicitly
            subscribe to an internal topic.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_exclude.internal.topics`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'true',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'true',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
