import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'auto.offset.reset',
    displayedName: 'auto.offset.reset',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            What to do when there is no initial offset in Kafka or if the
            current offset does not exist any more on the server (e.g. because
            that data has been deleted): earliest: automatically reset the
            offset to the earliest offsetlatest: automatically reset the offset
            to the latest offsetnone: throw exception to the consumer if no
            previous offset is found for the consumer's groupanything else:
            throw exception to the consumer.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#consumerconfigs_auto.offset.reset`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'latest',
    options: [
        {
            label: 'latest',
            value: 'latest',
        },
        {
            label: 'earliest',
            value: 'earliest',
        },
        {
            label: 'none',
            value: 'none',
        },
    ],
    validValues: '[latest, earliest, none]',
    displayedDefault: 'latest',
    validate: target => {
        if (target === 'latest' || target === 'earliest' || target === 'none') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
