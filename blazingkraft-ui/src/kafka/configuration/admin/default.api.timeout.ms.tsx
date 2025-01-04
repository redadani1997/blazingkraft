import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'default.api.timeout.ms',
    displayedName: 'default.api.timeout.ms',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Specifies the timeout (in milliseconds) for client APIs. This
            configuration is used as the default timeout for all client
            operations that do not specify a <Code>timeout</Code> parameter.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_default.api.timeout.ms`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    overriddenDefault: true,
    default: '20000',
    options: undefined,
    validValues: '[0,...]',
    displayedDefault: '60000',
    validate: target => {
        return target >= 0.0;
    },
    disabledForever: false,
    numericUnit: 'MILLISECONDS',
    proTip: undefined,
};

export default configuration;
