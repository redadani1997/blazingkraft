import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.keystore.location',
    displayedName: 'ssl.keystore.location',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The location of the key store file. This is optional for client and
            can be used for two-way authentication for client.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.keystore.location`}
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
    isFileConfig: true,
    proTip: undefined,
};

export default configuration;
