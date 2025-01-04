import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'interceptor.classes',
    displayedName: 'interceptor.classes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A list of classes to use as interceptors. Implementing the{' '}
            <Code>org.apache.kafka.clients.consumer.ConsumerInterceptor</Code>{' '}
            interface allows you to intercept (and possibly mutate) records
            received by the consumer. By default, there are no interceptors.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LIST',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_interceptor.classes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '',
    options: undefined,
    validValues: 'non-null string',
    displayedDefault: '[]',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
