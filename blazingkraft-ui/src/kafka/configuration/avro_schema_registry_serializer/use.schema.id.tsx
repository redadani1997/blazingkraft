import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'use.schema.id',
    displayedName: 'use.schema.id',
    errorMessage: 'Please enter a valid value',
    documentation: <Text size="md">Schema ID to use for serialization</Text>,
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'INT',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default: '-1',
    options: undefined,
    validValues: undefined,
    displayedDefault: '-1',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
