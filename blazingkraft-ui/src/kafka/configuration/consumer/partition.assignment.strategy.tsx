import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'partition.assignment.strategy',
    displayedName: 'partition.assignment.strategy',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A list of class names or class types, ordered by preference, of
            supported partition assignment strategies that the client will use
            to distribute partition ownership amongst consumer instances when
            group management is used. Available options are:
            <Code>org.apache.kafka.clients.consumer.RangeAssignor</Code>:
            Assigns partitions on a per-topic basis.
            <Code>org.apache.kafka.clients.consumer.RoundRobinAssignor</Code>:
            Assigns partitions to consumers in a round-robin fashion.
            <Code>org.apache.kafka.clients.consumer.StickyAssignor</Code>:
            Guarantees an assignment that is maximally balanced while preserving
            as many existing partition assignments as possible.
            <Code>
                org.apache.kafka.clients.consumer.CooperativeStickyAssignor
            </Code>
            : Follows the same StickyAssignor logic, but allows for cooperative
            rebalancing.The default assignor is [RangeAssignor,
            CooperativeStickyAssignor], which will use the RangeAssignor by
            default, but allows upgrading to the CooperativeStickyAssignor with
            just a single rolling bounce that removes the RangeAssignor from the
            list.Implementing the{' '}
            <Code>
                org.apache.kafka.clients.consumer.ConsumerPartitionAssignor
            </Code>{' '}
            interface allows you to plug in a custom assignment strategy.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LIST',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_partition.assignment.strategy`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default:
        'class org.apache.kafka.clients.consumer.RangeAssignor,class org.apache.kafka.clients.consumer.CooperativeStickyAssignor',
    options: undefined,
    validValues: 'non-null string',
    displayedDefault:
        '[class org.apache.kafka.clients.consumer.RangeAssignor, class org.apache.kafka.clients.consumer.CooperativeStickyAssignor]',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
