import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'transaction.boundary.interval.ms',
    displayedName: 'transaction.boundary.interval.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            If ‘transaction.boundary’ is set to ‘interval’, determines the
            interval for producer transaction commits by connector tasks. If
            unset, defaults to the value of the worker-level
            ‘offset.flush.interval.ms’ property. It has no effect if a different
            transaction.boundary is specified.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#transaction-boundary-interval-ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: 'null',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
