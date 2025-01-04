import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'transactional.id',
    displayedName: 'transactional.id',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The TransactionalId to use for transactional delivery. This enables
            reliability semantics which span multiple producer sessions since it
            allows the client to guarantee that transactions using the same
            TransactionalId have been completed prior to starting any new
            transactions. If no TransactionalId is provided, then the producer
            is limited to idempotent delivery. If a TransactionalId is
            configured, <Code>enable.idempotence</Code> is implied. By default
            the TransactionId is not configured, which means transactions cannot
            be used. Note that, by default, transactions require a cluster of at
            least three brokers which is the recommended setting for production;
            for development you can change this, by adjusting broker setting{' '}
            <Code>transaction.state.log.replication.factor</Code>.
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
                href={`https://kafka.apache.org/documentation/#producerconfigs_transactional.id`}
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
