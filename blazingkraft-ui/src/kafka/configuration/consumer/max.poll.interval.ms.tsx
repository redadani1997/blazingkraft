import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.poll.interval.ms',
    displayedName: 'max.poll.interval.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum delay between invocations of poll() when using consumer
            group management. This places an upper bound on the amount of time
            that the consumer can be idle before fetching more records. If
            poll() is not called before expiration of this timeout, then the
            consumer is considered failed and the group will rebalance in order
            to reassign the partitions to another member. For consumers using a
            non-null <Code>group.instance.id</Code> which reach this timeout,
            partitions will not be immediately reassigned. Instead, the consumer
            will stop sending heartbeats and partitions will be reassigned after
            expiration of <Code>session.timeout.ms</Code>. This mirrors the
            behavior of a static consumer which has shutdown.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_max.poll.interval.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '300000',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '300000',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
