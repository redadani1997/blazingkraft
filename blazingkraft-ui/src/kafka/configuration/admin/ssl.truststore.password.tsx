import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.truststore.password',
    displayedName: 'ssl.truststore.password',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The password for the trust store file. If a password is not set,
            trust store file configured will still be used, but integrity
            checking is disabled. Trust store password is not supported for PEM
            format.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'PASSWORD',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.truststore.password`}
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
