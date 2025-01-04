import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'derive.type',
    displayedName: 'derive.type',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Whether to derive the class based on `java_outer_classname` and
            `java_multiple_files`.
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
