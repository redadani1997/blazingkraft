import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.enabled.protocols',
    displayedName: 'ssl.enabled.protocols',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The list of protocols enabled for SSL connections. The default is
            'TLSv1.2,TLSv1.3' when running with Java 11 or newer, 'TLSv1.2'
            otherwise. With the default value for Java 11, clients and servers
            will prefer TLSv1.3 if both support it and fallback to TLSv1.2
            otherwise (assuming both support at least TLSv1.2). This default
            should be fine for most cases. Also see the config documentation for
            `ssl.protocol`.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'LIST',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.enabled.protocols`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'TLSv1.2,TLSv1.3',
    options: undefined,
    validValues: undefined,
    displayedDefault: '[TLSv1.2, TLSv1.3]',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
