import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'request.timeout.ms',
    displayedName: 'request.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The configuration controls the maximum amount of time the client
            will wait for the response of a request. If the response is not
            received before the timeout elapses the client will resend the
            request if necessary or fail the request if retries are exhausted.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_request.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    overriddenDefault: true,
    default: '20000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '30000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
