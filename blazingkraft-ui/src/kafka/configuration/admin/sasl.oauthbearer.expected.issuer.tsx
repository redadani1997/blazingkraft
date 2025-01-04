import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.expected.issuer',
    displayedName: 'sasl.oauthbearer.expected.issuer',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The (optional) setting for the broker to use to verify that the JWT
            was created by the expected issuer. The JWT will be inspected for
            the standard OAuth "iss" claim and if this value is set, the broker
            will match it exactly against what is in the JWT's "iss" claim. If
            there is no match, the broker will reject the JWT and authentication
            will fail.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.expected.issuer`}
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
