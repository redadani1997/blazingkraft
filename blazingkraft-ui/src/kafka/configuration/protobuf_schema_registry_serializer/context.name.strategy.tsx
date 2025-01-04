import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'context.name.strategy',
    displayedName: 'context.name.strategy',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A class used to determine the schema registry context.
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
    default: 'io.confluent.kafka.serializers.context.NullContextNameStrategy',
    options: undefined,
    validValues: undefined,
    displayedDefault:
        'io.confluent.kafka.serializers.context.NullContextNameStrategy',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
