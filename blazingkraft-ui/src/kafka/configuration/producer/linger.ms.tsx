import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'linger.ms',
    displayedName: 'linger.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The producer groups together any records that arrive in between
            request transmissions into a single batched request. Normally this
            occurs only under load when records arrive faster than they can be
            sent out. However in some circumstances the client may want to
            reduce the number of requests even under moderate load. This setting
            accomplishes this by adding a small amount of artificial
            delay&mdash;that is, rather than immediately sending out a record,
            the producer will wait for up to the given delay to allow other
            records to be sent so that the sends can be batched together. This
            can be thought of as analogous to Nagle's algorithm in TCP. This
            setting gives the upper bound on the delay for batching: once we get{' '}
            <Code>batch.size</Code> worth of records for a partition it will be
            sent immediately regardless of this setting, however if we have
            fewer than this many bytes accumulated for this partition we will
            'linger' for the specified time waiting for more records to show up.
            This setting defaults to 0 (i.e. no delay). Setting{' '}
            <Code>linger.ms=5</Code>, for example, would have the effect of
            reducing the number of requests sent but would add up to 5ms of
            latency to records sent in the absence of load.
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
                href={`https://kafka.apache.org/documentation/#producerconfigs_linger.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '0',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '0',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
