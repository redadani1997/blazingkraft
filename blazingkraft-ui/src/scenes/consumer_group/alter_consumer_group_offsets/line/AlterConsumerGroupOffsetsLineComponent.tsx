import { ActionIcon, Grid, Input, Tooltip } from '@mantine/core';
import { Offset, OffsetInfo } from 'common/types/offset';
import { useEffect, useMemo } from 'react';
import { CgCloseR } from 'react-icons/cg';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { TopicPartitionOffsetToAlter } from 'scenes/consumer_group/consumer_group_details/ConsumerGroupDetailsComponent';

interface AlterConsumerGroupOffsetsLineComponentProps {
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[],
    ) => void;
    topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[];
    topicPartitionOffsetToAlter: TopicPartitionOffsetToAlter;
    consumerGroupOffsets: Offset[];
    consumerGroupEarliestTopicPartitionsOffsets: OffsetInfo[];
    consumerGroupLatestTopicPartitionsOffsets: OffsetInfo[];
}

function AlterConsumerGroupOffsetsLineComponent({
    setTopicPartitionOffsetsToAlter,
    topicPartitionOffsetsToAlter,
    topicPartitionOffsetToAlter,
    consumerGroupOffsets,
    consumerGroupEarliestTopicPartitionsOffsets,
    consumerGroupLatestTopicPartitionsOffsets,
}: AlterConsumerGroupOffsetsLineComponentProps) {
    const earliestOffset = useMemo(
        () =>
            consumerGroupEarliestTopicPartitionsOffsets.find(
                offset =>
                    offset.topic === topicPartitionOffsetToAlter.topic &&
                    offset.partition === topicPartitionOffsetToAlter.partition,
            )?.offset,
        [
            consumerGroupEarliestTopicPartitionsOffsets,
            topicPartitionOffsetToAlter.partition,
            topicPartitionOffsetToAlter.topic,
        ],
    );
    const latestOffset = useMemo(
        () =>
            consumerGroupLatestTopicPartitionsOffsets.find(
                offset =>
                    offset.topic === topicPartitionOffsetToAlter.topic &&
                    offset.partition === topicPartitionOffsetToAlter.partition,
            )?.offset,
        [
            consumerGroupLatestTopicPartitionsOffsets,
            topicPartitionOffsetToAlter.partition,
            topicPartitionOffsetToAlter.topic,
        ],
    );
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
                        consumerGroupOffset.topic ===
                        topicPartitionOffsetToAlter.topic,
                )
                .map(consumerGroupOffset => consumerGroupOffset.partition)
                .sort((a, b) => a - b)
                .map(partition => ({
                    label: String(partition),
                    value: partition,
                })),
        [consumerGroupOffsets, topicPartitionOffsetToAlter.topic],
    );

    useEffect(() => {
        if (
            topicPartitionOffsetToAlter.topic !== undefined &&
            topicPartitionOffsetToAlter.partition !== undefined
        ) {
            const currentOffset = consumerGroupOffsets.find(
                offset =>
                    offset.topic === topicPartitionOffsetToAlter.topic &&
                    offset.partition === topicPartitionOffsetToAlter.partition,
            )?.offset;
            const newTopicPartitionOffsetsToAlter =
                topicPartitionOffsetsToAlter.map(line => {
                    if (
                        line.lineIndex === topicPartitionOffsetToAlter.lineIndex
                    ) {
                        return {
                            ...line,
                            offset: currentOffset,
                        };
                    }
                    return line;
                });

            setTopicPartitionOffsetsToAlter(newTopicPartitionOffsetsToAlter);
        }
    }, [
        topicPartitionOffsetToAlter.topic,
        topicPartitionOffsetToAlter.partition,
    ]);

    return (
        <Grid className="items-end">
            <Grid.Col span={8} md={4}>
                <div className="flex items-end">
                    <Tooltip label="Remove Line">
                        <ActionIcon
                            className="mr-4"
                            onClick={() => {
                                const newTopicPartitionOffsetsToAlter =
                                    topicPartitionOffsetsToAlter.filter(
                                        line =>
                                            line.lineIndex !==
                                            topicPartitionOffsetToAlter.lineIndex,
                                    );

                                setTopicPartitionOffsetsToAlter(
                                    newTopicPartitionOffsetsToAlter,
                                );
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
                        value={topicPartitionOffsetToAlter.topic}
                        searchable
                        creatable
                        onChange={value => {
                            const newTopicPartitionOffsetsToAlter =
                                topicPartitionOffsetsToAlter.map(line => {
                                    if (
                                        line.lineIndex ===
                                        topicPartitionOffsetToAlter.lineIndex
                                    ) {
                                        return {
                                            ...line,
                                            topic: value,
                                            partition: undefined,
                                            offset: undefined,
                                        };
                                    }
                                    return line;
                                });

                            setTopicPartitionOffsetsToAlter(
                                newTopicPartitionOffsetsToAlter,
                            );
                        }}
                    />
                </div>
            </Grid.Col>
            <Grid.Col span={4} md={2}>
                <CommonSelect
                    label="Partition"
                    placeholder="Partition"
                    data={partitionOptions}
                    searchable
                    creatable
                    value={topicPartitionOffsetToAlter.partition}
                    onChange={value => {
                        const newTopicPartitionOffsetsToAlter =
                            topicPartitionOffsetsToAlter.map(line => {
                                if (
                                    line.lineIndex ===
                                    topicPartitionOffsetToAlter.lineIndex
                                ) {
                                    return {
                                        ...line,
                                        partition: value,
                                    };
                                }
                                return line;
                            });

                        setTopicPartitionOffsetsToAlter(
                            newTopicPartitionOffsetsToAlter,
                        );
                    }}
                />
            </Grid.Col>
            <Grid.Col span={4} md={2}>
                <Input.Wrapper label="Current Offset">
                    <CommonNumberInput
                        value={topicPartitionOffsetToAlter.offset}
                        placeholder="Offset"
                        onChange={value => {
                            const newTopicPartitionOffsetsToAlter =
                                topicPartitionOffsetsToAlter.map(line => {
                                    if (
                                        line.lineIndex ===
                                        topicPartitionOffsetToAlter.lineIndex
                                    ) {
                                        return {
                                            ...line,
                                            offset: value,
                                        };
                                    }
                                    return line;
                                });

                            setTopicPartitionOffsetsToAlter(
                                newTopicPartitionOffsetsToAlter,
                            );
                        }}
                    />
                </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={4} md={2}>
                <Input.Wrapper label="Earliest">
                    <CommonNumberInput
                        value={earliestOffset}
                        placeholder="Earliest"
                        disabled
                    />
                </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={4} md={2}>
                <Input.Wrapper label="Latest">
                    <CommonNumberInput
                        value={latestOffset}
                        placeholder="Latest"
                        disabled
                    />
                </Input.Wrapper>
            </Grid.Col>
        </Grid>
    );
}

export default AlterConsumerGroupOffsetsLineComponent;
