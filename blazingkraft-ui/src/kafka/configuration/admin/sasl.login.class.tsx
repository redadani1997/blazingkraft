import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.login.class',
    displayedName: 'sasl.login.class',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The fully qualified name of a class that implements the Login
            interface. For brokers, login config must be prefixed with listener
            prefix and SASL mechanism name in lower-case. For example,
            listener.name.sasl_ssl.scram-sha-256.sasl.login.class=com.example.CustomScramLogin
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'CLASS',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.login.class`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: '',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
