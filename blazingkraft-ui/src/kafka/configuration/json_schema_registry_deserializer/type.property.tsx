import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'type.property',
    displayedName: 'type.property',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Property on the JSON Schema that contains the fully-qualified
            classname
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default: 'javaType',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'javaType',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
