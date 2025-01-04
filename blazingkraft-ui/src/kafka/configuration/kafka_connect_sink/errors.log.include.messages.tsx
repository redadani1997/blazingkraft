import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.log.include.messages',
    displayedName: 'errors.log.include.messages',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Whether to include in the log the Connect record that resulted in a
            failure.For sink records, the topic, partition, offset, and
            timestamp will be logged. For source records, the key and value (and
            their schemas), all headers, and the timestamp, Kafka topic, Kafka
            partition, source partition, and source offset will be logged. This
            is ‘false’ by default, which will prevent record keys, values, and
            headers from being written to log files.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-log-include-messages`}
                target="_blank"
            >
                learn more here
            </Anchor>
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
