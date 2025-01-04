import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'exactly.once.support',
    displayedName: 'exactly.once.support',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Permitted values are requested, required. If set to “required”,
            forces a preflight check for the connector to ensure that it can
            provide exactly-once delivery with the given configuration. Some
            connectors may be capable of providing exactly-once delivery but not
            signal to Connect that they support this; in that case,
            documentation for the connector should be consulted carefully before
            creating it, and the value for this property should be set to
            “requested”. Additionally, if the value is set to “required” but the
            worker that performs preflight validation does not have exactly-once
            support enabled for source connectors, requests to create or
            validate the connector will fail.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: true,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Confluent, Inc for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://docs.confluent.io/platform/current/installation/configuration/connect/source-connect-configs.html#exactly-once-support`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'REQUESTED',
    options: [
        {
            label: 'REQUIRED',
            value: 'REQUIRED',
        },
        {
            label: 'REQUESTED',
            value: 'REQUESTED',
        },
    ],
    validValues: '[REQUIRED, REQUESTED]',
    displayedDefault: 'REQUESTED',
    validate: target => {
        if (target === 'REQUIRED' || target === 'REQUESTED') {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
