import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'allow.auto.create.topics',
    displayedName: 'allow.auto.create.topics',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Allow automatic topic creation on the broker when subscribing to or
            assigning a topic. A topic being subscribed to will be automatically
            created only if the broker allows for it using
            `auto.create.topics.enable` broker configuration. This configuration
            must be set to `false` when using brokers older than 0.11.0
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
                href={`https://kafka.apache.org/documentation/#consumerconfigs_allow.auto.create.topics`}
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
