import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'skip.known.types',
    displayedName: 'skip.known.types',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Whether to skip known types when resolving schema dependencies.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default: 'true',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'true',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
