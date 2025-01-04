import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'socket.connection.setup.timeout.max.ms',
    displayedName: 'socket.connection.setup.timeout.max.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of time the client will wait for the socket
            connection to be established. The connection setup timeout will
            increase exponentially for each consecutive connection failure up to
            this maximum. To avoid connection storms, a randomization factor of
            0.2 will be applied to the timeout resulting in a random range
            between 20% below and 20% above the computed value.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_socket.connection.setup.timeout.max.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '30000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '30000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
