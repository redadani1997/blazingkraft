import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.block.ms',
    displayedName: 'max.block.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The configuration controls how long the <Code>KafkaProducer</Code>'s{' '}
            <Code>send()</Code>, <Code>partitionsFor()</Code>,{' '}
            <Code>initTransactions()</Code>,{' '}
            <Code>sendOffsetsToTransaction()</Code>,{' '}
            <Code>commitTransaction()</Code> and <Code>abortTransaction()</Code>{' '}
            methods will block. For <Code>send()</Code> this timeout bounds the
            total time waiting for both metadata fetch and buffer allocation
            (blocking in the user-supplied serializers or partitioner is not
            counted against this timeout). For <Code>partitionsFor()</Code> this
            timeout bounds the time spent waiting for metadata if it is
            unavailable. The transaction-related methods always block, but may
            timeout if the transaction coordinator could not be discovered or
            did not respond within the timeout.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_max.block.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    overriddenDefault: true,
    default: '20000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '60000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
