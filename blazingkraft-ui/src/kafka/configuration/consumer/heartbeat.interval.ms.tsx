import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'heartbeat.interval.ms',
    displayedName: 'heartbeat.interval.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The expected time between heartbeats to the consumer coordinator
            when using Kafka's group management facilities. Heartbeats are used
            to ensure that the consumer's session stays active and to facilitate
            rebalancing when new consumers join or leave the group. The value
            must be set lower than <Code>session.timeout.ms</Code>, but
            typically should be set no higher than 1/3 of that value. It can be
            adjusted even lower to control the expected time for normal
            rebalances.
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
                href={`https://kafka.apache.org/documentation/#consumerconfigs_heartbeat.interval.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '3000',
    options: undefined,
    validValues: undefined,
    displayedDefault: '3000',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
