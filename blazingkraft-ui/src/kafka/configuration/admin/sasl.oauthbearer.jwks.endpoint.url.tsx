import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.jwks.endpoint.url',
    displayedName: 'sasl.oauthbearer.jwks.endpoint.url',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The OAuth/OIDC provider URL from which the provider's{' '}
            <a href="https://datatracker.ietf.org/doc/html/rfc7517#section-5">
                JWKS (JSON Web Key Set)
            </a>{' '}
            can be retrieved. The URL can be HTTP(S)-based or file-based. If the
            URL is HTTP(S)-based, the JWKS data will be retrieved from the
            OAuth/OIDC provider via the configured URL on broker startup. All
            then-current keys will be cached on the broker for incoming
            requests. If an authentication request is received for a JWT that
            includes a "kid" header claim value that isn't yet in the cache, the
            JWKS endpoint will be queried again on demand. However, the broker
            polls the URL every sasl.oauthbearer.jwks.endpoint.refresh.ms
            milliseconds to refresh the cache with any forthcoming keys before
            any JWT requests that include them are received. If the URL is
            file-based, the broker will load the JWKS file from a configured
            location on startup. In the event that the JWT includes a "kid"
            header value that isn't in the JWKS file, the broker will reject the
            JWT and authentication will fail.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.jwks.endpoint.url`}
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
