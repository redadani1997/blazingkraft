import { Grid } from '@mantine/core';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonMultiSelect from 'scenes/common/select/CommonMultiSelect';
import { PartitionFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';

interface BlazingConsumerPartitionComboboxProps {
    setPartitionFilter: (partitionFilter: PartitionFilter) => void;
    partitions: Map<string, string[]>;
    options: { label: string; value: string }[];
    topic: string;
    topicExists: boolean;
}

const ALL_PARTITIONS_OPTION = {
    label: 'All',
    value: '-1',
};

function BlazingConsumerPartitionCombobox({
    setPartitionFilter,
    partitions,
    options,
    topic,
    topicExists,
}: BlazingConsumerPartitionComboboxProps) {
    const partitionsPerTopic = partitions.get(topic);
    return (
        <Grid.Col key={topic} span={12} md={12} xl={6}>
            <CommonMultiSelect
                label={<CommonCode className="text-xs">{topic}</CommonCode>}
                data={options}
                placeholder={'Please select partitions'}
                value={partitionsPerTopic || []}
                onChange={(value: string[]) => {
                    const newPartitions = new Map(partitions);
                    if (!value || value.length === 0) {
                        newPartitions.set(topic, [
                            topicExists ? ALL_PARTITIONS_OPTION.value : '0',
                        ]);
                    } else {
                        if (
                            !partitionsPerTopic.includes(
                                ALL_PARTITIONS_OPTION.value,
                            ) &&
                            value.includes(ALL_PARTITIONS_OPTION.value)
                        ) {
                            newPartitions.set(topic, [
                                ALL_PARTITIONS_OPTION.value,
                            ]);
                        } else if (
                            partitionsPerTopic.includes(
                                ALL_PARTITIONS_OPTION.value,
                            ) &&
                            value.length > 0
                        ) {
                            newPartitions.set(
                                topic,
                                value.filter(
                                    partition =>
                                        partition !==
                                        ALL_PARTITIONS_OPTION.value,
                                ),
                            );
                        } else {
                            newPartitions.set(topic, value);
                        }
                    }
                    setPartitionFilter({
                        partitions: newPartitions,
                    });
                }}
                searchable
                clearable
                creatable
            />
        </Grid.Col>
    );
}

export default BlazingConsumerPartitionCombobox;
