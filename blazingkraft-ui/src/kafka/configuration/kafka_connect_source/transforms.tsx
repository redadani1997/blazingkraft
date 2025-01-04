import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'transforms',
    displayedName: 'transforms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Aliases for the transformations to be applied to records.
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
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#transforms`}
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
