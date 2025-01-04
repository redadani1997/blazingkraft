import { Text } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'json.schema.spec.version',
    displayedName: 'json.schema.spec.version',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The specification version to use for JSON schemas derived from
            objects, one of 'draft_4', 'draft_6', 'draft_7', or 'draft_2019_09'
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation, learn more
            by using their SerDes libraries.{' '}
        </Text>
    ),
    default: 'draft_7',
    options: [
        {
            label: 'draft_4',
            value: 'draft_4',
        },
        {
            label: 'draft_6',
            value: 'draft_6',
        },
        {
            label: 'draft_7',
            value: 'draft_7',
        },
        {
            label: 'draft_2019_09',
            value: 'draft_2019_09',
        },
    ],
    validValues: '[draft_4, draft_6, draft_7, draft_2019_09]',
    displayedDefault: 'draft_7',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
