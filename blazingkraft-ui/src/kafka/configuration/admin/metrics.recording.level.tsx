import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'metrics.recording.level',
    displayedName: 'metrics.recording.level',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">The highest recording level for metrics.</Text>
    ),
    importance: 'LOW',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_metrics.recording.level`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'INFO',
    options: [
        {
            label: 'INFO',
            value: 'INFO',
        },
        {
            label: 'DEBUG',
            value: 'DEBUG',
        },
        {
            label: 'TRACE',
            value: 'TRACE',
        },
    ],
    validValues: '[INFO, DEBUG, TRACE]',
    displayedDefault: 'INFO',
    validate: target => {
        if (target === 'INFO' || target === 'DEBUG' || target === 'TRACE') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
