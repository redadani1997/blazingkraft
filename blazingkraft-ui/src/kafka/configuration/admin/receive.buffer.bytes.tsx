import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'receive.buffer.bytes',
    displayedName: 'receive.buffer.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The size of the TCP receive buffer (SO_RCVBUF) to use when reading
            data. If the value is -1, the OS default will be used.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_receive.buffer.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '65536',
    options: undefined,
    validValues: '[-1,...]',
    displayedDefault: '65536',
    validate: target => {
        return target >= -1.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
