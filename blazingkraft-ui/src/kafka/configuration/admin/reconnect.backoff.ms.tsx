import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'reconnect.backoff.ms',
    displayedName: 'reconnect.backoff.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The base amount of time to wait before attempting to reconnect to a
            given host. This avoids repeatedly connecting to a host in a tight
            loop. This backoff applies to all connection attempts by the client
            to a broker.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_reconnect.backoff.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    overriddenDefault: true,
    default: '2000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '50',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
