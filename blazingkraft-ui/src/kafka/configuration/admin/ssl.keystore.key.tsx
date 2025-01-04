import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.keystore.key',
    displayedName: 'ssl.keystore.key',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Private key in the format specified by 'ssl.keystore.type'. Default
            SSL engine factory supports only PEM format with PKCS#8 keys. If the
            key is encrypted, key password must be specified using
            'ssl.key.password'
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'PASSWORD',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.keystore.key`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: 'null',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
