import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'message.timestamp.type',
    displayedName: 'message.timestamp.type',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Define whether the timestamp in the message is message create time
            or log append time. The value should be either `CreateTime` or
            `LogAppendTime`
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_message.timestamp.type`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'CreateTime',
    options: [
        {
            label: 'LogAppendTime',
            value: 'LogAppendTime',
        },
        {
            label: 'CreateTime',
            value: 'CreateTime',
        },
    ],
    validValues: '[LogAppendTime, CreateTime]',
    displayedDefault: 'CreateTime',
    validate: target => {
        if (target === 'LogAppendTime' || target === 'CreateTime') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
