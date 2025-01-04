import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'schema.registry.ssl.keystore.certificate.chain',
    displayedName: 'schema.registry.ssl.keystore.certificate.chain',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Certificate chain in the format specified by 'ssl.keystore.type'.
            Default SSL engine factory supports only PEM format with a list of
            X.509 certificates
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'PASSWORD',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/schema-registry/installation/config.html#`}
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
