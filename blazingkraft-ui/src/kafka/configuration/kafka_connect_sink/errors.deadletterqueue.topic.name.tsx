import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.deadletterqueue.topic.name',
    displayedName: 'errors.deadletterqueue.topic.name',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The name of the topic to be used as the dead letter queue (DLQ) for
            messages that result in an error when processed by this sink
            connector, or its transformations or converters. The topic name is
            blank by default, which means that no messages are to be recorded in
            the DLQ.
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
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-deadletterqueue-topic-name`}
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
