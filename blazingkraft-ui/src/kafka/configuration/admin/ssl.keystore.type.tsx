import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.keystore.type',
    displayedName: 'ssl.keystore.type',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The file format of the key store file. This is optional for client.
            The values currently supported by the default
            `ssl.engine.factory.class` are [JKS, PKCS12, PEM].
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.keystore.type`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'JKS',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'JKS',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
