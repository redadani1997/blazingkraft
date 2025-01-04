import { ActionIcon, Anchor, Text, Tooltip } from '@mantine/core';
import {
    ConsumerGroupDescription,
    MemberDescription,
} from 'common/types/consumer_group';
import { Offset, OffsetInfo } from 'common/types/offset';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo } from 'react';
import { BiError } from 'react-icons/bi';
import { TbPencil } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { TopicPartitionOffsetToAlter } from '../../ConsumerGroupDetailsComponent';

interface ConsumerGroupTableComponentProps {
    consumerGroupDescription?: ConsumerGroupDescription;
    consumerGroupEarliestTopicPartitionsOffsets: OffsetInfo[];
    consumerGroupLatestTopicPartitionsOffsets: OffsetInfo[];
    consumerGroupOffsets: Offset[];
    isListConsumerGroupEarliestTopicPartitionsOffsetsPending: boolean;
    isListConsumerGroupLatestTopicPartitionsOffsetsPending: boolean;
    isListConsumerGroupOffsetsPending: boolean;
    setIsAlterConsumerGroupOffsetsModalOpened: (isOpened: boolean) => void;
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsets: TopicPartitionOffsetToAlter[],
    ) => void;
}

function getColumns(
    isListConsumerGroupEarliestTopicPartitionsOffsetsPending: boolean,
    isListConsumerGroupLatestTopicPartitionsOffsetsPending: boolean,
): CommonTableColumn[] {
    return [
        {
            id: 'topic',
            label: 'Topic',
            filterable: true,
            sortable: true,
            width: '23%',
            minWidth: '20rem',
        },
        {
            id: 'partition',
            label: 'Partition',
            filterable: true,
            sortable: true,
            width: '11%',
            minWidth: '8rem',
        },
        {
            id: 'currentOffset',
            label: 'Current',
            filterable: false,
            sortable: true,
            width: '11%',
            minWidth: '10rem',
        },
        {
            id: 'earliestOffset',
            label: 'Earliest',
            filterable: false,
            sortable: !isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
            width: '11%',
            minWidth: '10rem',
        },
        {
            id: 'latestOffset',
            label: 'Latest',
            filterable: false,
            sortable: !isListConsumerGroupLatestTopicPartitionsOffsetsPending,
            width: '11%',
            minWidth: '10rem',
        },
        {
            id: 'lag',
            label: 'Lag',
            filterable: false,
            sortable:
                !isListConsumerGroupEarliestTopicPartitionsOffsetsPending &&
                !isListConsumerGroupLatestTopicPartitionsOffsetsPending,
            width: '11%',
            minWidth: '10rem',
        },
        {
            id: 'member',
            label: 'Member',
            filterable: true,
            sortable: true,
            width: '22%',
            minWidth: '13rem',
        },
    ];
}

function renderLagCell(lag: number) {
    if (lag === 0) {
        return lag;
    }

    return <Text color="red">{CommonUtils.beautifyNumber(lag)}</Text>;
}

function renderMemberCell(memberDescription: MemberDescription) {
    if (!memberDescription) {
        return (
            <Tooltip label="No Active Member">
                <div>
                    <BiError color="red" size="1.4rem" />
                </div>
            </Tooltip>
        );
    }
    return (
        <Text color="dimmed" className="italic">
            {memberDescription.memberId}
        </Text>
    );
}

function getData(
    consumerGroupDescription: ConsumerGroupDescription | undefined,
    consumerGroupEarliestTopicPartitionsOffsets: OffsetInfo[],
    consumerGroupLatestTopicPartitionsOffsets: OffsetInfo[],
    consumerGroupOffsets: Offset[],
    isListConsumerGroupEarliestTopicPartitionsOffsetsPending: boolean,
    isListConsumerGroupLatestTopicPartitionsOffsetsPending: boolean,
    setIsAlterConsumerGroupOffsetsModalOpened: (isOpened: boolean) => void,
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsets: TopicPartitionOffsetToAlter[],
    ) => void,
    clusterCode: string,
): CommonTableData[] {
    return consumerGroupOffsets.map(consumerGroupOffset => {
        const earliestOffsetTopicPartition =
            consumerGroupEarliestTopicPartitionsOffsets.find(early => {
                return (
                    early.topic === consumerGroupOffset.topic &&
                    early.partition === consumerGroupOffset.partition
                );
            });
        const latestOffsetTopicPartition =
            consumerGroupLatestTopicPartitionsOffsets.find(latest => {
                return (
                    latest.topic === consumerGroupOffset.topic &&
                    latest.partition === consumerGroupOffset.partition
                );
            });
        const memberDescription: MemberDescription =
            consumerGroupDescription?.members.find(member => {
                return member.assignment?.topicPartitions.find(
                    topicPartition => {
                        return (
                            topicPartition.topic ===
                                consumerGroupOffset.topic &&
                            topicPartition.partition ===
                                consumerGroupOffset.partition
                        );
                    },
                );
            });

        return {
            topic: {
                value: consumerGroupOffset?.topic,
                displayedValue: (
                    <Anchor
                        component={Link}
                        to={`/clusters/${clusterCode}/topics/${consumerGroupOffset.topic}`}
                    >
                        {consumerGroupOffset.topic}
                    </Anchor>
                ),
            },
            partition: {
                value: consumerGroupOffset.partition,
                displayedValue: consumerGroupOffset.partition,
            },
            currentOffset: {
                value: consumerGroupOffset.offset,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        {CommonUtils.beautifyNumber(consumerGroupOffset.offset)}
                        <div className="pl-2 flex">
                            <Tooltip label="Alter Current Offset">
                                <ActionIcon
                                    color="blue"
                                    onClick={() => {
                                        setIsAlterConsumerGroupOffsetsModalOpened(
                                            true,
                                        );
                                        setTopicPartitionOffsetsToAlter([
                                            {
                                                topic: consumerGroupOffset.topic,
                                                partition:
                                                    consumerGroupOffset.partition,
                                                offset: consumerGroupOffset.offset,
                                                lineIndex: 1,
                                            },
                                        ]);
                                    }}
                                >
                                    <TbPencil size="1.4rem" />
                                </ActionIcon>
                            </Tooltip>
                        </div>
                    </div>
                ),
            },
            earliestOffset: {
                value: earliestOffsetTopicPartition
                    ? earliestOffsetTopicPartition.offset
                    : 0,
                displayedValue: earliestOffsetTopicPartition ? (
                    CommonUtils.beautifyNumber(
                        earliestOffsetTopicPartition.offset,
                    )
                ) : (
                    <Text>Not Found</Text>
                ),
                isLoading:
                    isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
                isError: false,
                errorMessage: undefined,
            },
            latestOffset: {
                value: latestOffsetTopicPartition
                    ? latestOffsetTopicPartition.offset
                    : 0,
                displayedValue: latestOffsetTopicPartition ? (
                    CommonUtils.beautifyNumber(
                        latestOffsetTopicPartition.offset,
                    )
                ) : (
                    <Text>Not Found</Text>
                ),
                isLoading:
                    isListConsumerGroupLatestTopicPartitionsOffsetsPending,
                isError: false,
                errorMessage: undefined,
            },
            lag: {
                value: latestOffsetTopicPartition
                    ? latestOffsetTopicPartition.offset -
                      consumerGroupOffset.offset
                    : 0,
                displayedValue: latestOffsetTopicPartition ? (
                    renderLagCell(
                        latestOffsetTopicPartition.offset -
                            consumerGroupOffset.offset,
                    )
                ) : (
                    <Text>Not Found</Text>
                ),
                isLoading:
                    isListConsumerGroupEarliestTopicPartitionsOffsetsPending ||
                    isListConsumerGroupLatestTopicPartitionsOffsetsPending,
                isError: false,
                errorMessage: undefined,
            },
            member: {
                value: memberDescription ? memberDescription.memberId : '',
                displayedValue: renderMemberCell(memberDescription),
            },
        };
    });
}

const ConsumerGroupTableComponent = ({
    consumerGroupDescription,
    consumerGroupEarliestTopicPartitionsOffsets,
    consumerGroupLatestTopicPartitionsOffsets,
    consumerGroupOffsets,
    isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
    isListConsumerGroupLatestTopicPartitionsOffsetsPending,
    isListConsumerGroupOffsetsPending,
    setIsAlterConsumerGroupOffsetsModalOpened,
    setTopicPartitionOffsetsToAlter,
}: ConsumerGroupTableComponentProps) => {
    const { clusterCode } = useParams();

    const memoizedData = useMemo(() => {
        return getData(
            consumerGroupDescription,
            consumerGroupEarliestTopicPartitionsOffsets,
            consumerGroupLatestTopicPartitionsOffsets,
            consumerGroupOffsets,
            isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
            isListConsumerGroupLatestTopicPartitionsOffsetsPending,
            setIsAlterConsumerGroupOffsetsModalOpened,
            setTopicPartitionOffsetsToAlter,
            clusterCode,
        );
    }, [
        consumerGroupDescription,
        consumerGroupEarliestTopicPartitionsOffsets,
        consumerGroupLatestTopicPartitionsOffsets,
        consumerGroupOffsets,
        isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
        isListConsumerGroupLatestTopicPartitionsOffsetsPending,
        setIsAlterConsumerGroupOffsetsModalOpened,
        setTopicPartitionOffsetsToAlter,
        clusterCode,
    ]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns(
                isListConsumerGroupEarliestTopicPartitionsOffsetsPending,
                isListConsumerGroupLatestTopicPartitionsOffsetsPending,
            )}
            data={memoizedData}
            withPaging
            withTopFilter={false}
            totalElements={consumerGroupOffsets.length}
            perPage={25}
            isLoading={isListConsumerGroupOffsetsPending}
            paperClassName="h-full w-full mt-4"
        />
    );
};

export default ConsumerGroupTableComponent;
