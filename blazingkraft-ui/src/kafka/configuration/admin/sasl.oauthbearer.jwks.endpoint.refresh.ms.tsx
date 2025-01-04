import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.jwks.endpoint.refresh.ms',
    displayedName: 'sasl.oauthbearer.jwks.endpoint.refresh.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The (optional) value in milliseconds for the broker to wait between
            refreshing its JWKS (JSON Web Key Set) cache that contains the keys
            to verify the signature of the JWT.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.jwks.endpoint.refresh.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '3600000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '3600000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
