import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'socket.connection.setup.timeout.ms',
    displayedName: 'socket.connection.setup.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The amount of time the client will wait for the socket connection to
            be established. If the connection is not built before the timeout
            elapses, clients will close the socket channel.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_socket.connection.setup.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '10000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '10000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
