import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'enable.idempotence',
    displayedName: 'enable.idempotence',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            When set to 'true', the producer will ensure that exactly one copy
            of each message is written in the stream. If 'false', producer
            retries due to broker failures, etc., may write duplicates of the
            retried message in the stream. Note that enabling idempotence
            requires <Code>max.in.flight.requests.per.connection</Code> to be
            less than or equal to 5 (with message ordering preserved for any
            allowable value), <Code>retries</Code> to be greater than 0, and{' '}
            <Code>acks</Code> must be 'all'. Idempotence is enabled by default
            if no conflicting configurations are set. If conflicting
            configurations are set and idempotence is not explicitly enabled,
            idempotence is disabled. If idempotence is explicitly enabled and
            conflicting configurations are set, a <Code>ConfigException</Code>{' '}
            is thrown.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence`}
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
