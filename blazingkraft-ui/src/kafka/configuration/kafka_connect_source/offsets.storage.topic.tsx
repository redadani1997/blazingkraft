import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'offsets.storage.topic',
    displayedName: 'offsets.storage.topic',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The name of a separate offsets topic to use for this connector. If
            empty or not specified, the worker?s global offsets topic name will
            be used. If specified, the offsets topic will be created if it does
            not already exist on the Kafka cluster targeted by this connector
            (which may be different from the one used for the worker’s global
            offsets topic if the bootstrap.servers property of the connector’s
            producer has been overridden from the worker’s). Only applicable in
            distributed mode; in standalone mode, setting this property will
            have no effect.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#offsets-storage-topic`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: 'non-empty string',
    displayedDefault: 'null',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
