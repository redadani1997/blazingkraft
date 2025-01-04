import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.endpoint.identification.algorithm',
    displayedName: 'ssl.endpoint.identification.algorithm',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The endpoint identification algorithm to validate server hostname
            using server certificate.{' '}
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.endpoint.identification.algorithm`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'https',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'https',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
