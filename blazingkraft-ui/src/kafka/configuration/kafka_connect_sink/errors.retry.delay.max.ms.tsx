import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.retry.delay.max.ms',
    displayedName: 'errors.retry.delay.max.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum duration in milliseconds between consecutive retry
            attempts. Jitter will be added to the delay once this limit is
            reached to prevent thundering herd issues.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-retry-delay-max-ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '60000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '60000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
