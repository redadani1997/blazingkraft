import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.token.endpoint.url',
    displayedName: 'sasl.oauthbearer.token.endpoint.url',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The URL for the OAuth/OIDC identity provider. If the URL is
            HTTP(S)-based, it is the issuer's token endpoint URL to which
            requests will be made to login based on the configuration in
            sasl.jaas.config. If the URL is file-based, it specifies a file
            containing an access token (in JWT serialized form) issued by the
            OAuth/OIDC identity provider to use for authorization.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.token.endpoint.url`}
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
