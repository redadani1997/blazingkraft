import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'tasks.max',
    displayedName: 'tasks.max',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Maximum number of tasks to use for this connector.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#tasks-max`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '1',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '1',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
