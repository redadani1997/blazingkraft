import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'metric.reporters',
    displayedName: 'metric.reporters',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A list of classes to use as metrics reporters. Implementing the{' '}
            <Code>org.apache.kafka.common.metrics.MetricsReporter</Code>{' '}
            interface allows plugging in classes that will be notified of new
            metric creation. The JmxReporter is always included to register JMX
            statistics.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_metric.reporters`}
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
