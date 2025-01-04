import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.poll.records',
    displayedName: 'max.poll.records',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum number of records returned in a single call to poll().
            Note, that <Code>max.poll.records</Code> does not impact the
            underlying fetching behavior. The consumer will cache the records
            from each fetch request and returns them incrementally from each
            poll.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_max.poll.records`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '500',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '500',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
