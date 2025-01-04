import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'auto.commit.interval.ms',
    displayedName: 'auto.commit.interval.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The frequency in milliseconds that the consumer offsets are
            auto-committed to Kafka if <Code>enable.auto.commit</Code> is set to{' '}
            <Code>true</Code>.
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
                href={`https://kafka.apache.org/documentation/#consumerconfigs_auto.commit.interval.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '5000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '5000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
