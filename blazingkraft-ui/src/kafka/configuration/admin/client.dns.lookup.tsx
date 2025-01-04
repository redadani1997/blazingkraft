import { Text, Code, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'client.dns.lookup',
    displayedName: 'client.dns.lookup',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            Controls how the client uses DNS lookups. If set to{' '}
            <Code>use_all_dns_ips</Code>, connect to each returned IP address in
            sequence until a successful connection is established. After a
            disconnection, the next IP is used. Once all IPs have been used
            once, the client resolves the IP(s) from the hostname again (both
            the JVM and the OS cache DNS name lookups, however). If set to{' '}
            <Code>resolve_canonical_bootstrap_servers_only</Code>, resolve each
            bootstrap address into a list of canonical names. After the
            bootstrap phase, this behaves the same as{' '}
            <Code>use_all_dns_ips</Code>.
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
                href={`https://kafka.apache.org/documentation/#adminclientconfigs_client.dns.lookup`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'use_all_dns_ips',
    options: [
        {
            label: 'use_all_dns_ips',
            value: 'use_all_dns_ips',
        },
        {
            label: 'resolve_canonical_bootstrap_servers_only',
            value: 'resolve_canonical_bootstrap_servers_only',
        },
    ],
    validValues: '[use_all_dns_ips, resolve_canonical_bootstrap_servers_only]',
    displayedDefault: 'use_all_dns_ips',
    validate: target => {
        if (
            target === 'use_all_dns_ips' ||
            target === 'resolve_canonical_bootstrap_servers_only'
        ) {
            return true;
        }
        return false;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
