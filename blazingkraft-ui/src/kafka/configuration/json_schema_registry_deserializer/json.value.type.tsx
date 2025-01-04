import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'json.value.type',
    displayedName: 'json.value.type',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Classname of the type that the message value should be deserialized
            to
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'CLASS',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default: 'java.lang.Object',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'java.lang.Object',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
