import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'errors.log.enable',
    displayedName: 'errors.log.enable',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            If true, write each error and the details of the failed operation
            and problematic record to the Connect application log. This is
            ‘false’ by default, so that only errors that are not tolerated are
            reported.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'BOOLEAN',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/sink-connect-configs.html#errors-log-enable`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'false',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'false',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
