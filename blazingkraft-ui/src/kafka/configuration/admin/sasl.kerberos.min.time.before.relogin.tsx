import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.kerberos.min.time.before.relogin',
    displayedName: 'sasl.kerberos.min.time.before.relogin',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">Login thread sleep time between refresh attempts.</Text>
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.kerberos.min.time.before.relogin`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '60000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '60000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
