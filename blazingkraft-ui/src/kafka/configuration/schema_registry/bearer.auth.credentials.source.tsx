import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'bearer.auth.credentials.source',
    displayedName: 'bearer.auth.credentials.source',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Specify how to pick the credentials for Bearer Auth header.{' '}
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
    overriddenDefault: true,
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: 'STATIC_TOKEN',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
