import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.expected.audience',
    displayedName: 'sasl.oauthbearer.expected.audience',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The (optional) comma-delimited setting for the broker to use to
            verify that the JWT was issued for one of the expected audiences.
            The JWT will be inspected for the standard OAuth "aud" claim and if
            this value is set, the broker will match the value from JWT's "aud"
            claim to see if there is an exact match. If there is no match, the
            broker will reject the JWT and authentication will fail.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LIST',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.expected.audience`}
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
