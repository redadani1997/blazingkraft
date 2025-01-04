import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'delivery.timeout.ms',
    displayedName: 'delivery.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            An upper bound on the time to report success or failure after a call
            to <Code>send()</Code> returns. This limits the total time that a
            record will be delayed prior to sending, the time to await
            acknowledgement from the broker (if expected), and the time allowed
            for retriable send failures. The producer may report failure to send
            a record earlier than this config if either an unrecoverable error
            is encountered, the retries have been exhausted, or the record is
            added to a batch which reached an earlier delivery expiration
            deadline. The value of this config should be greater than or equal
            to the sum of <Code>request.timeout.ms</Code> and{' '}
            <Code>linger.ms</Code>.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_delivery.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '120000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '120000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
