import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'retries',
    displayedName: 'retries',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Setting a value greater than zero will cause the client to resend
            any request that fails with a potentially transient error. It is
            recommended to set the value to either zero or `MAX_VALUE` and use
            corresponding timeout parameters to control how long a client should
            retry a request.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_retries`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '2147483647',
    options: undefined,
    validValues: '[0,...,2147483647]',
    displayedDefault: '2147483647',
    validate: target => {
        return target >= 0.0 && target <= 2.147483647e9;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
