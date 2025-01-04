import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'check.crcs',
    displayedName: 'check.crcs',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Automatically check the CRC32 of the records consumed. This ensures
            no on-the-wire or on-disk corruption to the messages occurred. This
            check adds some overhead, so it may be disabled in cases seeking
            extreme performance.
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_check.crcs`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'true',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'true',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
