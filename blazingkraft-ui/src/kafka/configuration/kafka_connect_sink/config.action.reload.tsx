import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'config.action.reload',
    displayedName: 'config.action.reload',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The action that Connect should take on the connector when changes in
            external configuration providers result in a change in the
            connector’s configuration properties. A value of ‘none’ indicates
            that Connect will do nothing. A value of ‘restart’ indicates that
            Connect should restart/reload the connector with the updated
            configuration properties.The restart may actually be scheduled in
            the future if the external configuration provider indicates that a
            configuration value will expire in the future.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#config-action-reload`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'restart',
    options: [
        {
            label: 'none',
            value: 'none',
        },
        {
            label: 'restart',
            value: 'restart',
        },
    ],
    validValues: '[none, restart]',
    displayedDefault: 'restart',
    validate: target => {
        if (target === 'none' || target === 'restart') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
