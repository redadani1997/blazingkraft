import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.login.refresh.min.period.seconds',
    displayedName: 'sasl.login.refresh.min.period.seconds',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The desired minimum time for the login refresh thread to wait before
            refreshing a credential, in seconds. Legal values are between 0 and
            900 (15 minutes); a default value of 60 (1 minute) is used if no
            value is specified. This value and sasl.login.refresh.buffer.seconds
            are both ignored if their sum exceeds the remaining lifetime of a
            credential. Currently applies only to OAUTHBEARER.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'SHORT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.login.refresh.min.period.seconds`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '60',
    options: undefined,
    validValues: '[0,...,900]',
    displayedDefault: '60',
    validate: target => {
        return target >= 0.0 && target <= 900.0;
    },
    disabledForever: false,
    numericUnit: 'SECONDS',
    proTip: undefined,
};

export default configuration;
