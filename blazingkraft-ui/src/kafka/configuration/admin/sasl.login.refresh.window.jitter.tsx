import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.login.refresh.window.jitter',
    displayedName: 'sasl.login.refresh.window.jitter',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum amount of random jitter relative to the credential's
            lifetime that is added to the login refresh thread's sleep time.
            Legal values are between 0 and 0.25 (25%) inclusive; a default value
            of 0.05 (5%) is used if no value is specified. Currently applies
            only to OAUTHBEARER.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.login.refresh.window.jitter`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0.05',
    options: undefined,
    validValues: '[0.0,...,0.25]',
    displayedDefault: '0.05',
    validate: target => {
        return target >= 0.0 && target <= 0.25;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
