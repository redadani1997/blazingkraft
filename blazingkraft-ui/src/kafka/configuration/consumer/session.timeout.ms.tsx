import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'session.timeout.ms',
    displayedName: 'session.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The timeout used to detect client failures when using Kafka's group
            management facility. The client sends periodic heartbeats to
            indicate its liveness to the broker. If no heartbeats are received
            by the broker before the expiration of this session timeout, then
            the broker will remove this client from the group and initiate a
            rebalance. Note that the value must be in the allowable range as
            configured in the broker configuration by{' '}
            <Code>group.min.session.timeout.ms</Code> and{' '}
            <Code>group.max.session.timeout.ms</Code>.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_session.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '45000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '45000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
