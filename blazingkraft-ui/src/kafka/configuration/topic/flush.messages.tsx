import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'flush.messages',
    displayedName: 'flush.messages',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This setting allows specifying an interval at which we will force an
            fsync of data written to the log. For example if this was set to 1
            we would fsync after every message; if it were 5 we would fsync
            after every five messages. In general we recommend you not set this
            and use replication for durability and allow the operating system's
            background flush capabilities as it is more efficient. This setting
            can be overridden on a per-topic basis (see{' '}
            <a href="#topicconfigs">the per-topic configuration section</a>).
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_flush.messages`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '9223372036854775807',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '9223372036854775807',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
