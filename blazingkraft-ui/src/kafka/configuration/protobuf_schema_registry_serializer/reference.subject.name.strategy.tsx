import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'reference.subject.name.strategy',
    displayedName: 'reference.subject.name.strategy',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Determines how to construct the subject name for referenced schemas.
            By default, the reference name is used as subject.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'CLASS',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default:
        'io.confluent.kafka.serializers.subject.DefaultReferenceSubjectNameStrategy',
    options: undefined,
    validValues: undefined,
    displayedDefault:
        'io.confluent.kafka.serializers.subject.DefaultReferenceSubjectNameStrategy',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
