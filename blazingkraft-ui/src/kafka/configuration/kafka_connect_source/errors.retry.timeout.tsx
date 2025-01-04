import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.retry.timeout',
    displayedName: 'errors.retry.timeout',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum duration in milliseconds that a failed operation will be
            reattempted. The default is 0, which means no retries will be
            attempted. Use -1 for infinite retries.
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
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#errors-retry-timeout`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0',
    options: undefined,
    validValues: undefined,
    displayedDefault: '0',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
