import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'partitioner.class',
    displayedName: 'partitioner.class',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A class to use to determine which partition to be send to when
            produce the records. Available options are:If not set, the default
            partitioning logic is used. This strategy will try sticking to a
            partition until batch.size bytes is produced to the partition. It
            works with the strategy:If no partition is specified but a key is
            present, choose a partition based on a hash of the keyIf no
            partition or key is present, choose the sticky partition that
            changes when batch.size bytes are produced to the partition.
            <Code>org.apache.kafka.clients.producer.RoundRobinPartitioner</Code>
            : This partitioning strategy is that each record in a series of
            consecutive records will be sent to a different partition(no matter
            if the 'key' is provided or not), until we run out of partitions and
            start over again. Note: There's a known issue that will cause uneven
            distribution when new batch is created. Please check KAFKA-9965 for
            more detail.Implementing the{' '}
            <Code>org.apache.kafka.clients.producer.Partitioner</Code> interface
            allows you to plug in a custom partitioner.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'CLASS',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_partitioner.class`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: '',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
