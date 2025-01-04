import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'schema.registry.url',
    displayedName: 'schema.registry.url',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Comma-separated list of URLs for schema registry instances that can
            be used to register or look up schemas. If you wish to get a
            connection to a mocked schema registry for testing, you can specify
            a scope using the 'mock://' pseudo-protocol. For example,
            'mock://my-scope-name' corresponds to
            'MockSchemaRegistry.getClientForScope("my-scope-name")'.
        </Text>
    ),
    importance: 'HIGH',
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
    default: '',
    options: undefined,
    validValues: undefined,
    displayedDefault: '[]',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
