import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.oauthbearer.clock.skew.seconds',
    displayedName: 'sasl.oauthbearer.clock.skew.seconds',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The (optional) value in seconds to allow for differences between the
            time of the OAuth/OIDC identity provider and the broker.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.oauthbearer.clock.skew.seconds`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '30',
    options: undefined,
    validValues: undefined,
    displayedDefault: '30',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'SECONDS',
    proTip: undefined,
};

export default configuration;
