import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'batch.size',
    displayedName: 'batch.size',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The producer will attempt to batch records together into fewer
            requests whenever multiple records are being sent to the same
            partition. This helps performance on both the client and the server.
            This configuration controls the default batch size in bytes. No
            attempt will be made to batch records larger than this size.
            Requests sent to brokers will contain multiple batches, one for each
            partition with data available to be sent. A small batch size will
            make batching less common and may reduce throughput (a batch size of
            zero will disable batching entirely). A very large batch size may
            use memory a bit more wastefully as we will always allocate a buffer
            of the specified batch size in anticipation of additional
            records.Note: This setting gives the upper bound of the batch size
            to be sent. If we have fewer than this many bytes accumulated for
            this partition, we will 'linger' for the <Code>linger.ms</Code> time
            waiting for more records to show up. This <Code>linger.ms</Code>{' '}
            setting defaults to 0, which means we'll immediately send out a
            record even the accumulated batch size is under this{' '}
            <Code>batch.size</Code> setting.
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
                href={`https://kafka.apache.org/documentation/#producerconfigs_batch.size`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '16384',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '16384',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
