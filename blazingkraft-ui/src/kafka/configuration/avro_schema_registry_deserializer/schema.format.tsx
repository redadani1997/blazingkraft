import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'schema.format',
    displayedName: 'schema.format',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The schema format to use when registering or looking up schemas.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: 'null',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
