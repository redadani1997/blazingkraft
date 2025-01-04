import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.kerberos.kinit.cmd',
    displayedName: 'sasl.kerberos.kinit.cmd',
    errorMessage: 'Please enter a valid value',
    documentation: <Text size="md">Kerberos kinit command path.</Text>,
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.kerberos.kinit.cmd`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '/usr/bin/kinit',
    options: undefined,
    validValues: undefined,
    displayedDefault: '/usr/bin/kinit',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
