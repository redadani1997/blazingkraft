import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'metadata.max.age.ms',
    displayedName: 'metadata.max.age.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The period of time in milliseconds after which we force a refresh of
            metadata even if we haven't seen any partition leadership changes to
            proactively discover any new brokers or partitions.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_metadata.max.age.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '300000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '300000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
