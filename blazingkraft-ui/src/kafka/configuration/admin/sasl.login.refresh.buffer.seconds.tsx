import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.login.refresh.buffer.seconds',
    displayedName: 'sasl.login.refresh.buffer.seconds',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The amount of buffer time before credential expiration to maintain
            when refreshing a credential, in seconds. If a refresh would
            otherwise occur closer to expiration than the number of buffer
            seconds then the refresh will be moved up to maintain as much of the
            buffer time as possible. Legal values are between 0 and 3600 (1
            hour); a default value of 300 (5 minutes) is used if no value is
            specified. This value and sasl.login.refresh.min.period.seconds are
            both ignored if their sum exceeds the remaining lifetime of a
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.login.refresh.buffer.seconds`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '300',
    options: undefined,
    validValues: '[0,...,3600]',
    displayedDefault: '300',
    validate: target => {
        return target >= 0.0 && target <= 3600.0;
    },
    disabledForever: false,
    numericUnit: 'SECONDS',
    proTip: undefined,
};

export default configuration;
