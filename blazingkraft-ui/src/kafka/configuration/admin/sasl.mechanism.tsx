import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.mechanism',
    displayedName: 'sasl.mechanism',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            SASL mechanism used for client connections. This may be any
            mechanism for which a security provider is available. GSSAPI is the
            default mechanism.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.mechanism`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'GSSAPI',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'GSSAPI',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
