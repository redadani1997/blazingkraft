import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'group.instance.id',
    displayedName: 'group.instance.id',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A unique identifier of the consumer instance provided by the end
            user. Only non-empty strings are permitted. If set, the consumer is
            treated as a static member, which means that only one instance with
            this ID is allowed in the consumer group at any time. This can be
            used in combination with a larger session timeout to avoid group
            rebalances caused by transient unavailability (e.g. process
            restarts). If not set, the consumer will join the group as a dynamic
            member, which is the traditional behavior.
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
                href={`https://kafka.apache.org/documentation/#consumerconfigs_group.instance.id`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: 'non-empty string',
    displayedDefault: 'null',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
