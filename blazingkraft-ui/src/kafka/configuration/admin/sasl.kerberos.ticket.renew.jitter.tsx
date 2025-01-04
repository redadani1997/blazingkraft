import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.kerberos.ticket.renew.jitter',
    displayedName: 'sasl.kerberos.ticket.renew.jitter',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Percentage of random jitter added to the renewal time.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.kerberos.ticket.renew.jitter`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0.05',
    options: undefined,
    validValues: undefined,
    displayedDefault: '0.05',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
