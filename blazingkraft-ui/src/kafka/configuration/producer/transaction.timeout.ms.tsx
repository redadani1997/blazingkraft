import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'transaction.timeout.ms',
    displayedName: 'transaction.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of time in ms that the transaction coordinator
            will wait for a transaction status update from the producer before
            proactively aborting the ongoing transaction.If this value is larger
            than the transaction.max.timeout.ms setting in the broker, the
            request will fail with a <Code>InvalidTxnTimeoutException</Code>{' '}
            error.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_transaction.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    overriddenDefault: true,
    default: '20000',
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
