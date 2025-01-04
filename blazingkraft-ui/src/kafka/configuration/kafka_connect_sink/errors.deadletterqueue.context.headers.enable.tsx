import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.deadletterqueue.context.headers.enable',
    displayedName: 'errors.deadletterqueue.context.headers.enable',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            If true, add headers containing error context to the messages
            written to the dead letter queue. To avoid clashing with headers
            from the original record, all error context header keys, all error
            context header keys will start with <Code>__connect.errors</Code>.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-deadletterqueue-context-headers-enable`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'false',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'false',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
