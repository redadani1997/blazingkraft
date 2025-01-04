import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'schema.registry.ssl.cipher.suites',
    displayedName: 'schema.registry.ssl.cipher.suites',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A list of cipher suites. This is a named combination of
            authentication, encryption, MAC and key exchange algorithm used to
            negotiate the security settings for a network connection using TLS
            or SSL network protocol. By default all the available cipher suites
            are supported.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LIST',
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
