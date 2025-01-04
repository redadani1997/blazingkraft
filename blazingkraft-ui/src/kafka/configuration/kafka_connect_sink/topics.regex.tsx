import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'topics.regex',
    displayedName: 'topics.regex',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Regular expression giving topics to consume. Under the hood, the
            regex is compiled to a <Code>java.util.regex.Pattern</Code>. Only
            one of topics or topics.regex should be specified..
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
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#topics-regex`}
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
