import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.deadletterqueue.topic.replication.factor',
    displayedName: 'errors.deadletterqueue.topic.replication.factor',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Replication factor used to create the dead letter queue topic when
            it doesn’t already exist.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'SHORT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-deadletterqueue-topic-replication-factor`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '3',
    options: undefined,
    validValues: undefined,
    displayedDefault: '3',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
