import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'message.timestamp.difference.max.ms',
    displayedName: 'message.timestamp.difference.max.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum difference allowed between the timestamp when a broker
            receives a message and the timestamp specified in the message. If
            message.timestamp.type=CreateTime, a message will be rejected if the
            difference in timestamp exceeds this threshold. This configuration
            is ignored if message.timestamp.type=LogAppendTime.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_message.timestamp.difference.max.ms`}
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
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
