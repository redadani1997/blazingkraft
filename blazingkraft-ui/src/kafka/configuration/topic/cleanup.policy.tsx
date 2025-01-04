import { Text, Anchor } from '@mantine/core';
import { KafkaConfiguration } from '../..';

const configuration: KafkaConfiguration = {
    name: 'cleanup.policy',
    displayedName: 'cleanup.policy',
    errorMessage: 'Please enter a valid value',
    documentation: (
        <Text size="md">
            This config designates the retention policy to use on log segments.
            The "delete" policy (which is the default) will discard old segments
            when their retention time or size limit has been reached. The
            "compact" policy will enable{' '}
            <a href="#compaction">log compaction</a>, which retains the latest
            value for each key. It is also possible to specify both policies in
            a comma-separated list (e.g. "delete,compact"). In this case, old
            segments will be discarded per the retention time and size
            configuration, while retained segments will be compacted.
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
                href={`https://kafka.apache.org/documentation/#topicconfigs_cleanup.policy`}
                target="_blank"
            >
                learn more here
            </Anchor>
        </Text>
    ),
    default: 'delete',
    options: undefined,
    validValues: '[delete, compact]',
    displayedDefault: '[delete]',
    validate: () => {
        return true;
    },
    disabledForever: false,
    numericUnit: undefined,
    proTip: undefined,
};

export default configuration;
