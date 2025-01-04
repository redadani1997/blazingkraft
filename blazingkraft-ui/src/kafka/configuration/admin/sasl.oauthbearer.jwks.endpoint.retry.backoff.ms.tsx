import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.jwks.endpoint.retry.backoff.ms',
    displayedName: 'sasl.oauthbearer.jwks.endpoint.retry.backoff.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The (optional) value in milliseconds for the initial wait between
            JWKS (JSON Web Key Set) retrieval attempts from the external
            authentication provider. JWKS retrieval uses an exponential backoff
            algorithm with an initial wait based on the
            sasl.oauthbearer.jwks.endpoint.retry.backoff.ms setting and will
            double in wait length between attempts up to a maximum wait length
            specified by the sasl.oauthbearer.jwks.endpoint.retry.backoff.max.ms
            setting.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.jwks.endpoint.retry.backoff.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '100',
    options: undefined,
    validValues: undefined,
    displayedDefault: '100',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
