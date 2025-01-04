import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.login.refresh.window.factor',
    displayedName: 'sasl.login.refresh.window.factor',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Login refresh thread will sleep until the specified window factor
            relative to the credential's lifetime has been reached, at which
            time it will try to refresh the credential. Legal values are between
            0.5 (50%) and 1.0 (100%) inclusive; a default value of 0.8 (80%) is
            used if no value is specified. Currently applies only to
            OAUTHBEARER.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'DOUBLE',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.login.refresh.window.factor`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0.8',
    options: undefined,
    validValues: '[0.5,...,1.0]',
    displayedDefault: '0.8',
    validate: target => {
        return target >= 0.5 && target <= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
