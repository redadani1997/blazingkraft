import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'schema.registry.ssl.provider',
    displayedName: 'schema.registry.ssl.provider',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The name of the security provider used for SSL connections. Default
            value is the default security provider of the JVM.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'STRING',
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
