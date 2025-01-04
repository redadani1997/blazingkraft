import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.tolerance',
    displayedName: 'errors.tolerance',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Behavior for tolerating errors during connector operation. ‘none’ is
            the default value and signals that any error will result in an
            immediate connector task failure; ‘all’ changes the behavior to skip
            over problematic records.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-tolerance`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'none',
    options: [
        {
            label: 'none',
            value: 'none',
        },
        {
            label: 'all',
            value: 'all',
        },
    ],
    validValues: '[none, all]',
    displayedDefault: 'none',
    validate: target => {
        if (target === 'none' || target === 'all') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
