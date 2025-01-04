import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'metrics.num.samples',
    displayedName: 'metrics.num.samples',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The number of samples maintained to compute metrics.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_metrics.num.samples`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '2',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '2',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
