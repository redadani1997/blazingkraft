import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'header.converter',
    displayedName: 'header.converter',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            HeaderConverter class used to convert between Kafka Connect format
            and the serialized form that is written to Kafka. This controls the
            format of the header values in messages written to or read from
            Kafka, and since this is independent of connectors it allows any
            connector to work with any serialization format. Examples of common
            formats include JSON and Avro. By default, the SimpleHeaderConverter
            is used to serialize header values to strings and deserialize them
            by inferring the schemas.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'CLASS',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#header-converter`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: '',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
