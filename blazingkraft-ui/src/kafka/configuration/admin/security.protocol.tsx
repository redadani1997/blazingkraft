import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'security.protocol',
    displayedName: 'security.protocol',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Protocol used to communicate with brokers. Valid values are:
            PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_security.protocol`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'PLAINTEXT',
    options: [
        {
            label: 'PLAINTEXT',
            value: 'PLAINTEXT',
        },
        {
            label: 'SSL',
            value: 'SSL',
        },
        {
            label: 'SASL_PLAINTEXT',
            value: 'SASL_PLAINTEXT',
        },
        {
            label: 'SASL_SSL',
            value: 'SASL_SSL',
        },
    ],
    validValues: '[PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL]',
    displayedDefault: 'PLAINTEXT',
    validate: target => {
        if (
            target === 'PLAINTEXT' ||
            target === 'SSL' ||
            target === 'SASL_PLAINTEXT' ||
            target === 'SASL_SSL'
        ) {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
