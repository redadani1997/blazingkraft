import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'key.subject.name.strategy',
    displayedName: 'key.subject.name.strategy',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Determines how to construct the subject name under which the key
            schema is registered with the schema registry. By default, topic-key
            is used as subject.
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
    default: 'io.confluent.kafka.serializers.subject.TopicNameStrategy',
    options: undefined,
    validValues: undefined,
    displayedDefault:
        'io.confluent.kafka.serializers.subject.TopicNameStrategy',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
