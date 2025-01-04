import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.scope.claim.name',
    displayedName: 'sasl.oauthbearer.scope.claim.name',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The OAuth claim for the scope is often named "scope", but this
            (optional) setting can provide a different name to use for the scope
            included in the JWT payload's claims if the OAuth/OIDC provider uses
            a different name for that claim.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.scope.claim.name`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'scope',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'scope',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
