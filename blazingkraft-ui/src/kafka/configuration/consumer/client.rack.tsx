import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'client.rack',
    displayedName: 'client.rack',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A rack identifier for this client. This can be any string value
            which indicates where this client is physically located. It
            corresponds with the broker config 'broker.rack'
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_client.rack`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: '',
    options: undefined,
    validValues: undefined,
    displayedDefault: '',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
