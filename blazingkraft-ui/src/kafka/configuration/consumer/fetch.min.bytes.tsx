import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'fetch.min.bytes',
    displayedName: 'fetch.min.bytes',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The minimum amount of data the server should return for a fetch
            request. If insufficient data is available the request will wait for
            that much data to accumulate before answering the request. The
            default setting of 1 byte means that fetch requests are answered as
            soon as a single byte of data is available or the fetch request
            times out waiting for data to arrive. Setting this to something
            greater than 1 will cause the server to wait for larger amounts of
            data to accumulate which can improve server throughput a bit at the
            cost of some additional latency.
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_fetch.min.bytes`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '1',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '1',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
