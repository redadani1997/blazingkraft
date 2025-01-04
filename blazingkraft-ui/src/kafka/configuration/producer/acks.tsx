import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'acks',
    displayedName: 'acks',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The number of acknowledgments the producer requires the leader to
            have received before considering a request complete. This controls
            the durability of records that are sent. The following settings are
            allowed: <Code>acks=0</Code> If set to zero then the producer will
            not wait for any acknowledgment from the server at all. The record
            will be immediately added to the socket buffer and considered sent.
            No guarantee can be made that the server has received the record in
            this case, and the <Code>retries</Code> configuration will not take
            effect (as the client won't generally know of any failures). The
            offset given back for each record will always be set to{' '}
            <Code>-1</Code>. <Code>acks=1</Code> This will mean the leader will
            write the record to its local log but will respond without awaiting
            full acknowledgement from all followers. In this case should the
            leader fail immediately after acknowledging the record but before
            the followers have replicated it then the record will be lost.{' '}
            <Code>acks=all</Code> This means the leader will wait for the full
            set of in-sync replicas to acknowledge the record. This guarantees
            that the record will not be lost as long as at least one in-sync
            replica remains alive. This is the strongest available guarantee.
            This is equivalent to the acks=-1 setting.Note that enabling
            idempotence requires this config value to be 'all'. If conflicting
            configurations are set and idempotence is not explicitly enabled,
            idempotence is disabled.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_acks`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'all',
    options: [
        {
            label: 'all',
            value: 'all',
        },
        {
            label: '-1',
            value: '-1',
        },
        {
            label: '0',
            value: '0',
        },
        {
            label: '1',
            value: '1',
        },
    ],
    validValues: '[all, -1, 0, 1]',
    displayedDefault: 'all',
    validate: target => {
        if (
            target === 'all' ||
            target === '-1' ||
            target === '0' ||
            target === '1'
        ) {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
