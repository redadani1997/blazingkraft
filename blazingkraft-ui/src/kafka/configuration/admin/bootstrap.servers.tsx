import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'bootstrap.servers',
    displayedName: 'bootstrap.servers',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            A list of host/port pairs to use for establishing the initial
            connection to the Kafka cluster. The client will make use of all
            servers irrespective of which servers are specified here for
            bootstrapping&mdash;this list only impacts the initial hosts used to
            discover the full set of servers. This list should be in the form{' '}
            <Code>host1:port1,host2:port2,...</Code>. Since these servers are
            just used for the initial connection to discover the full cluster
            membership (which may change dynamically), this list need not
            contain the full set of servers (you may want more than one, though,
            in case a server is down).
        </Text>
    ),
    importance: 'HIGH',
    isSelectable: false,
    required: false,
    type: 'LIST',
    documentationProps: (
        <Text className="pt-4" size="xs" color="dimmed">
            Props to Apache Kafka® for this amazing documentation,{' '}
            <Anchor
                size="xs"
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_bootstrap.servers`}
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
