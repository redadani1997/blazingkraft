import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'ssl.engine.factory.class',
    displayedName: 'ssl.engine.factory.class',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            The class of type
            org.apache.kafka.common.security.auth.SslEngineFactory to provide
            SSLEngine objects. Default value is
            org.apache.kafka.common.security.ssl.DefaultSslEngineFactory
        </Text>
    ),
    importance: 'LOW',
    isSelectable: false,
    required: false,
    type: 'CLASS',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_ssl.engine.factory.class`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
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
