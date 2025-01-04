import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'preallocate',
    displayedName: 'preallocate',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            True if we should preallocate the file on disk when creating a new
            log segment.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#topicconfigs_preallocate`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'false',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'false',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
