import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.protocol',
    displayedName: 'ssl.protocol',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The SSL protocol used to generate the SSLContext. The default is
            'TLSv1.3' when running with Java 11 or newer, 'TLSv1.2' otherwise.
            This value should be fine for most use cases. Allowed values in
            recent JVMs are 'TLSv1.2' and 'TLSv1.3'. 'TLS', 'TLSv1.1', 'SSL',
            'SSLv2' and 'SSLv3' may be supported in older JVMs, but their usage
            is discouraged due to known security vulnerabilities. With the
            default value for this config and 'ssl.enabled.protocols', clients
            will downgrade to 'TLSv1.2' if the server does not support
            'TLSv1.3'. If this config is set to 'TLSv1.2', clients will not use
            'TLSv1.3' even if it is one of the values in ssl.enabled.protocols
            and the server only supports 'TLSv1.3'.
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'STRING',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.protocol`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'TLSv1.3',
    options: undefined,
    validValues: undefined,
    displayedDefault: 'TLSv1.3',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
