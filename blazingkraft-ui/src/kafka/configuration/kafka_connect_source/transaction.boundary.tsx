import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'transaction.boundary',
    displayedName: 'transaction.boundary',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Permitted values are: poll, interval, connector. If set to ‘poll’, a
            new producer transaction will be started and committed for every
            batch of records that each task from this connector provides to
            Connect. If set to ‘connector’, relies on connector-defined
            transaction boundaries; note that not all connectors are capable of
            defining their own transaction boundaries, and in that case,
            attempts to instantiate a connector with this value will fail.
            Finally, if set to ‘interval’, commits transactions only after a
            user-defined time interval has passed.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#transaction-boundary`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'POLL',
    options: [
        {
            label: 'INTERVAL',
            value: 'INTERVAL',
        },
        {
            label: 'POLL',
            value: 'POLL',
        },
        {
            label: 'CONNECTOR',
            value: 'CONNECTOR',
        },
    ],
    validValues: '[INTERVAL, POLL, CONNECTOR]',
    displayedDefault: 'POLL',
    validate: target => {
        if (
            target === 'INTERVAL' ||
            target === 'POLL' ||
            target === 'CONNECTOR'
        ) {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
