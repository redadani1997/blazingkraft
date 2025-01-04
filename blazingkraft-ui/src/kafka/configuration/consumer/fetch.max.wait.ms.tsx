import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'fetch.max.wait.ms',
    displayedName: 'fetch.max.wait.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of time the server will block before answering
            the fetch request if there isn't sufficient data to immediately
            satisfy the requirement given by fetch.min.bytes.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_fetch.max.wait.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '500',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '500',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
