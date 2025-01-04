import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'min.insync.replicas',
    displayedName: 'min.insync.replicas',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            When a producer sets acks to "all" (or "-1"), this configuration
            specifies the minimum number of replicas that must acknowledge a
            write for the write to be considered successful. If this minimum
            cannot be met, then the producer will raise an exception (either
            NotEnoughReplicas or NotEnoughReplicasAfterAppend).
            <br />
            When used together, <Code>min.insync.replicas</Code> and{' '}
            <Code>acks</Code> allow you to enforce greater durability
            guarantees. A typical scenario would be to create a topic with a
            replication factor of 3, set <Code>min.insync.replicas</Code> to 2,
            and produce with <Code>acks</Code> of "all". This will ensure that
            the producer raises an exception if a majority of replicas do not
            receive a write.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_min.insync.replicas`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '1',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '1',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
