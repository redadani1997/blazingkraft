import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'max.in.flight.requests.per.connection',
    displayedName: 'max.in.flight.requests.per.connection',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The maximum number of unacknowledged requests the client will send
            on a single connection before blocking. Note that if this
            configuration is set to be greater than 1 and{' '}
            <Code>enable.idempotence</Code> is set to false, there is a risk of
            message reordering after a failed send due to retries (i.e., if
            retries are enabled); if retries are disabled or if{' '}
            <Code>enable.idempotence</Code> is set to true, ordering will be
            preserved. Additionally, enabling idempotence requires the value of
            this configuration to be less than or equal to 5. If conflicting
            configurations are set and idempotence is not explicitly enabled,
            idempotence is disabled.{' '}
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#producerconfigs_max.in.flight.requests.per.connection`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '5',
    options: undefined,
    validValues: '[1,...]',
    displayedDefault: '5',
    validate: target => {
        return target >= 1.0;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
