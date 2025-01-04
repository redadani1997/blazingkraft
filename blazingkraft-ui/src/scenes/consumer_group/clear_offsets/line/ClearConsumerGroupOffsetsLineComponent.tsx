import { ActionIcon, Grid, Tooltip } from '@mantine/core';
import { Offset } from 'common/types/offset';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useEffect, useMemo } from 'react';
import { CgCloseR } from 'react-icons/cg';
import CommonMultiSelect from 'scenes/common/select/CommonMultiSelect';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { TopicPartitionToClear } from '../ClearConsumerGroupOffsets';

interface ClearConsumerGroupOffsetsLineComponentProps {
    topicPartitions: TopicPartitionToClear[];
    topicPartition: TopicPartitionToClear;
    setTopicPartitions: (topicPartitions: TopicPartitionToClear[]) => void;
    consumerGroupOffsets: Offset[];
}

function ClearConsumerGroupOffsetsLineComponent({
    topicPartition,
    topicPartitions,
    setTopicPartitions,
    consumerGroupOffsets,
}: ClearConsumerGroupOffsetsLineComponentProps) {
    const topicOptions = useMemo(
        () =>
            consumerGroupOffsets
                .map(consumerGroupOffset => consumerGroupOffset.topic)
                .filter((topic, index, self) => self.indexOf(topic) === index)

                .map(topic => ({
                    label: topic,
                    value: topic,
                })),
        [consumerGroupOffsets],
    );

    const partitionOptions = useMemo(
        () =>
            consumerGroupOffsets
                .filter(
                    consumerGroupOffset =>
                        consumerGroupOffset.topic === topicPartition.topic,
                )
                .map(consumerGroupOffset => consumerGroupOffset.partition)
                .map(partition => ({
                    label: String(partition),
                    value: partition,
                })),
        [consumerGroupOffsets, topicPartition.topic],
    );

    useEffect(() => {
        const newTopicPartitions = topicPartitions.map(line => {
            if (line.lineIndex === topicPartition.lineIndex) {
                return {
                    ...line,
                    partitions: partitionOptions.map(
                        partitionOption => partitionOption.value,
                    ),
                };
            }
            return line;
        });

        setTopicPartitions(newTopicPartitions);
    }, [partitionOptions]);

    return (
        <Grid className="items-end">
            <Grid.Col span={12} md={6}>
                <div className="flex items-end">
                    <Tooltip label="Remove Line">
                        <ActionIcon
                            className="mr-4"
                            onClick={() => {
                                const newTopicPartitions =
                                    topicPartitions.filter(
                                        line =>
                                            line.lineIndex !==
                                            topicPartition.lineIndex,
                                    );

                                setTopicPartitions(newTopicPartitions);
                            }}
                        >
                            <CgCloseR color="red" size="1.3rem" />
                        </ActionIcon>
                    </Tooltip>
                    <CommonSelect
                        className="w-full"
                        label="Topic"
                        placeholder="Topic"
                        data={topicOptions}
                        error={topicPartition.topic === null}
                        value={topicPartition.topic}
                        searchable
                        creatable
                        onChange={value => {
                            const newTopicPartitions = topicPartitions.map(
                                line => {
                                    if (
                                        line.lineIndex ===
                                        topicPartition.lineIndex
                                    ) {
                                        return {
                                            ...line,
                                            topic: value,
                                        };
                                    }
                                    return line;
                                },
                            );

                            setTopicPartitions(newTopicPartitions);
                        }}
                    />
                </div>
            </Grid.Col>
            <Grid.Col span={12} md={6}>
                <CommonMultiSelect
                    label="Partitions"
                    placeholder="Partitions"
                    data={partitionOptions}
                    searchable
                    creatable
                    value={topicPartition.partitions}
                    error={CommonValidationUtils.isFalsyArray(
                        topicPartition.partitions,
                    )}
                    onChange={value => {
                        const newTopicPartitions = topicPartitions.map(line => {
                            if (line.lineIndex === topicPartition.lineIndex) {
                                return {
                                    ...line,
                                    partitions: value,
                                };
                            }
                            return line;
                        });

                        setTopicPartitions(newTopicPartitions);
                    }}
                />
            </Grid.Col>
        </Grid>
    );
}

export default ClearConsumerGroupOffsetsLineComponent;
