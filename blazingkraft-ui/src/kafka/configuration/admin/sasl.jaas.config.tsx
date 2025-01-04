import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'sasl.jaas.config',
    displayedName: 'sasl.jaas.config',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            JAAS login context parameters for SASL connections in the format
            used by JAAS configuration files. JAAS configuration file format is
            described{' '}
            <a href="http://docs.oracle.com/javase/8/docs/technotes/guides/security/jgss/tutorials/LoginConfigFile.html">
                here
            </a>
            . The format for the value is:{' '}
            <Code>loginModuleClass controlFlag (optionName=optionValue)*;</Code>
            . For brokers, the config must be prefixed with listener prefix and
            SASL mechanism name in lower-case. For example,
            listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config=com.example.ScramLoginModule
            required;
        </Text>
    ),
    importance: 'MEDIUM',
    isSelectable: false,
    required: false,
    type: 'PASSWORD',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_sasl.jaas.config`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: null,
    options: undefined,
    validValues: undefined,
    displayedDefault: 'null',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
