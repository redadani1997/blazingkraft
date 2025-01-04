import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'reconnect.backoff.max.ms',
    displayedName: 'reconnect.backoff.max.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of time in milliseconds to wait when reconnecting
            to a broker that has repeatedly failed to connect. If provided, the
            backoff per host will increase exponentially for each consecutive
            connection failure, up to this maximum. After calculating the
            backoff increase, 20% random jitter is added to avoid connection
            storms.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_reconnect.backoff.max.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    overriddenDefault: true,
    default: '2500',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '1000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
