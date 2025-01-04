import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.request.size',
    displayedName: 'max.request.size',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum size of a request in bytes. This setting will limit the
            number of record batches the producer will send in a single request
            to avoid sending huge requests. This is also effectively a cap on
            the maximum uncompressed record batch size. Note that the server has
            its own cap on the record batch size (after compression if
            compression is enabled) which may be different from this.
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
                href={`https://kafka.apache.org/documentation/#producerconfigs_max.request.size`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '1048576',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '1048576',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'BYTES',
    proTip: undefined,
};

export default configuration;
