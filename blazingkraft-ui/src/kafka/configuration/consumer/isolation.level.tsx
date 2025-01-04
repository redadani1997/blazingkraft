import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'isolation.level',
    displayedName: 'isolation.level',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Controls how to read messages written transactionally. If set to{' '}
            <Code>read_committed</Code>, consumer.poll() will only return
            transactional messages which have been committed. If set to{' '}
            <Code>read_uncommitted</Code> (the default), consumer.poll() will
            return all messages, even transactional messages which have been
            aborted. Non-transactional messages will be returned unconditionally
            in either mode. Messages will always be returned in offset order.
            Hence, in <Code>read_committed</Code> mode, consumer.poll() will
            only return messages up to the last stable offset (LSO), which is
            the one less than the offset of the first open transaction. In
            particular any messages appearing after messages belonging to
            ongoing transactions will be withheld until the relevant transaction
            has been completed. As a result, <Code>read_committed</Code>{' '}
            consumers will not be able to read up to the high watermark when
            there are in flight transactions. Further, when in{' '}
            <Code>read_committed</Code> the seekToEnd method will return the LSO
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_isolation.level`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'read_uncommitted',
    options: [
        {
            label: 'read_committed',
            value: 'read_committed',
        },
        {
            label: 'read_uncommitted',
            value: 'read_uncommitted',
        },
    ],
    validValues: '[read_committed, read_uncommitted]',
    displayedDefault: 'read_uncommitted',
    validate: target => {
        if (target === 'read_committed' || target === 'read_uncommitted') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
