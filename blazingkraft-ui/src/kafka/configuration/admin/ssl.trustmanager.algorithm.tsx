import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.trustmanager.algorithm',
    displayedName: 'ssl.trustmanager.algorithm',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The algorithm used by trust manager factory for SSL connections.
            Default value is the trust manager factory algorithm configured for
            the Java Virtual Machine.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.trustmanager.algorithm`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'PKIX',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'PKIX',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
