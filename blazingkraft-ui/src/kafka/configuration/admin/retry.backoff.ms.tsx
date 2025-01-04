import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'retry.backoff.ms',
    displayedName: 'retry.backoff.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The amount of time to wait before attempting to retry a failed
            request. This avoids repeatedly sending requests in a tight loop
            under some failure scenarios.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_retry.backoff.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '100',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '100',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
