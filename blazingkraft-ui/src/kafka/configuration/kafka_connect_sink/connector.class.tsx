import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'connector.class',
    displayedName: 'connector.class',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Name or alias of the class for this connector. Must be a subclass of
            org.apache.kafka.connect.connector.Connector. If the connector is
            org.apache.kafka.connect.file.FileStreamSinkConnector, you can
            either specify this full name, or use “FileStreamSink” or
            “FileStreamSinkConnector” to make the configuration a bit shorter
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#connector-class`}
                target="_blank"
            >
                learn more here
            </Anchor>
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
