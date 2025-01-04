import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'connections.max.idle.ms',
    displayedName: 'connections.max.idle.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Close idle connections after the number of milliseconds specified by
            this config.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_connections.max.idle.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '300000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '300000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
