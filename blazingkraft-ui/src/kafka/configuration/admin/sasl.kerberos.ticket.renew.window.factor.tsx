import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.kerberos.ticket.renew.window.factor',
    displayedName: 'sasl.kerberos.ticket.renew.window.factor',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Login thread will sleep until the specified window factor of time
            from last refresh to ticket's expiry has been reached, at which time
            it will try to renew the ticket.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'DOUBLE',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.kerberos.ticket.renew.window.factor`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0.8',
    options: undefined,
    validValues: undefined,
    displayedDefault: '0.8',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
