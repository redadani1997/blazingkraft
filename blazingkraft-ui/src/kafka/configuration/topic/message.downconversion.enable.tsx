import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'message.downconversion.enable',
    displayedName: 'message.downconversion.enable',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This configuration controls whether down-conversion of message
            formats is enabled to satisfy consume requests. When set to{' '}
            <Code>false</Code>, broker will not perform down-conversion for
            consumers expecting an older message format. The broker responds
            with <Code>UNSUPPORTED_VERSION</Code> error for consume requests
            from such older clients. This configurationdoes not apply to any
            message format conversion that might be required for replication to
            followers.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_message.downconversion.enable`}
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
