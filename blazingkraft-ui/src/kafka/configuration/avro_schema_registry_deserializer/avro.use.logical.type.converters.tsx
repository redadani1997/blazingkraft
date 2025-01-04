import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'avro.use.logical.type.converters',
    displayedName: 'avro.use.logical.type.converters',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            If true, use logical type converter in generic record
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
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
