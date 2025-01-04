import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'proxy.host',
    displayedName: 'proxy.host',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The hostname, or address, of the proxy server that will be used to
            connect to the schema registry instances.
        </Text>
    ),
    importance: 'LOW',
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
    default: '',
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
