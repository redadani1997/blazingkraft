import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'buffer.memory',
    displayedName: 'buffer.memory',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The total bytes of memory the producer can use to buffer records
            waiting to be sent to the server. If records are sent faster than
            they can be delivered to the server the producer will block for{' '}
            <Code>max.block.ms</Code> after which it will throw an
            exception.This setting should correspond roughly to the total memory
            the producer will use, but is not a hard bound since not all memory
            the producer uses is used for buffering. Some additional memory will
            be used for compression (if compression is enabled) as well as for
            maintaining in-flight requests.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'LONG',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_buffer.memory`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '33554432',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '33554432',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
