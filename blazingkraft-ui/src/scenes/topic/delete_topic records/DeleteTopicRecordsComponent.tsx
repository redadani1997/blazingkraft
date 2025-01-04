import {
    ActionIcon,
    Alert,
    Button,
    Divider,
    Grid,
    Text,
    Tooltip,
} from '@mantine/core';
import { ITopicDetails } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useEffect, useMemo, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { TbAlertTriangle, TbCirclePlus, TbTrash, TbX } from 'react-icons/tb';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface DeleteTopicRecordsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteTopicRecords: (
        partitionsOffset: { partition: number; offset: number }[],
    ) => Promise<any>;
    isDeleteTopicRecordsPending: boolean;
    topicToDeleteRecords: string;
    topicDetails: ITopicDetails;
}

function renderModalBody(
    partitionsOffsets: IPartitionOffsets[],
    partitionsOffsetsToDelete: IPartitionOffsetToDelete[],
    setPartitionsOffsetsToDelete: (
        partitionsOffsetsToDelete: IPartitionOffsetToDelete[],
    ) => void,
    partitionOptions: any[],
    numberOfRecordsToBeDeleted,
) {
    return (
        <div className="flex flex-col">
            <div className="flex pb-2 items-center">
                <Text size="sm">Partitions Offsets</Text>
                {partitionOptions.length > 0 && (
                    <ActionIcon
                        color="blue"
                        className="ml-2"
                        onClick={() => {
                            const nextPartition =
                                partitionOptions.length > 0
                                    ? partitionOptions[0].value
                                    : null;
                            if (nextPartition === null) {
                                return;
                            }

                            const nextPartitionsOffset =
                                partitionsOffsets.find(
                                    partitionOffset =>
                                        partitionOffset.partition ===
                                        nextPartition,
                                ) || null;
                            if (nextPartitionsOffset === null) {
                                return;
                            }

                            setPartitionsOffsetsToDelete([
                                ...partitionsOffsetsToDelete,
                                {
                                    partition: nextPartitionsOffset.partition,
                                    offset: nextPartitionsOffset.latestOffset,
                                    earliestOffset:
                                        nextPartitionsOffset.earliestOffset,
                                    latestOffset:
                                        nextPartitionsOffset.latestOffset,
                                },
                            ]);
                        }}
                    >
                        <TbCirclePlus size="1.4rem" />
                    </ActionIcon>
                )}
                <Text
                    className="pl-2"
                    color="dimmed"
                >{`${CommonUtils.beautifyNumber(
                    numberOfRecordsToBeDeleted,
                )} records are going to be deleted!`}</Text>
            </div>
            {partitionsOffsetsToDelete.map(partitionOffsetsToDelete => {
                return (
                    <>
                        <Grid className="items-end">
                            <Grid.Col span={12} md={6} xl={3}>
                                <div className="flex items-end">
                                    <Tooltip label="Remove Line">
                                        <ActionIcon
                                            className="mr-4"
                                            onClick={() => {
                                                const newPartitionsOffsetToDelete =
                                                    partitionsOffsetsToDelete.filter(
                                                        line =>
                                                            line.partition !==
                                                            partitionOffsetsToDelete.partition,
                                                    );

                                                setPartitionsOffsetsToDelete(
                                                    newPartitionsOffsetToDelete,
                                                );
                                            }}
                                        >
                                            <CgCloseR
                                                color="red"
                                                size="1.3rem"
                                            />
                                        </ActionIcon>
                                    </Tooltip>
                                    <CommonSelect
                                        className="w-full"
                                        clearable={false}
                                        value={
                                            partitionOffsetsToDelete.partition
                                        }
                                        data={[
                                            ...partitionOptions,
                                            {
                                                value: partitionOffsetsToDelete.partition,
                                                label: String(
                                                    partitionOffsetsToDelete.partition,
                                                ),
                                            },
                                        ]}
                                        label="Partition"
                                        onChange={partition => {
                                            const partitionOffsets =
                                                partitionsOffsets.find(
                                                    partitionOffset =>
                                                        partitionOffset.partition ===
                                                        partition,
                                                );
                                            if (!partitionOffsets) {
                                                return;
                                            }
                                            const newPartitionsOffsetToDelete =
                                                partitionsOffsetsToDelete.map(
                                                    line => {
                                                        if (
                                                            line.partition ===
                                                            partitionOffsetsToDelete.partition
                                                        ) {
                                                            return {
                                                                partition,
                                                                offset: partitionOffsets.latestOffset,
                                                                earliestOffset:
                                                                    partitionOffsets.earliestOffset,
                                                                latestOffset:
                                                                    partitionOffsets.latestOffset,
                                                            };
                                                        }
                                                        return line;
                                                    },
                                                );

                                            setPartitionsOffsetsToDelete(
                                                newPartitionsOffsetToDelete,
                                            );
                                        }}
                                        placeholder="Select Partitions"
                                    />
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12} md={6} xl={3}>
                                <CommonNumberInput
                                    label="Offset"
                                    value={partitionOffsetsToDelete.offset}
                                    onChange={value => {
                                        const newPartitionsOffsetToDelete =
                                            partitionsOffsetsToDelete.map(
                                                line => {
                                                    if (
                                                        line.partition ===
                                                        partitionOffsetsToDelete.partition
                                                    ) {
                                                        return {
                                                            ...line,
                                                            offset: value,
                                                        };
                                                    }
                                                    return line;
                                                },
                                            );

                                        setPartitionsOffsetsToDelete(
                                            newPartitionsOffsetToDelete,
                                        );
                                    }}
                                    min={
                                        partitionOffsetsToDelete.earliestOffset
                                    }
                                    max={partitionOffsetsToDelete.latestOffset}
                                />
                            </Grid.Col>
                            <Grid.Col span={12} md={6} xl={3}>
                                <CommonNumberInput
                                    label="Earliest Offset"
                                    value={
                                        partitionOffsetsToDelete.earliestOffset
                                    }
                                    disabled
                                />
                            </Grid.Col>
                            <Grid.Col span={12} md={6} xl={3}>
                                <CommonNumberInput
                                    label="Latest Offset"
                                    value={
                                        partitionOffsetsToDelete.latestOffset
                                    }
                                    disabled
                                />
                            </Grid.Col>
                        </Grid>
                        <Divider className="my-4" />
                    </>
                );
            })}
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>
                    * The records to delete are the ones for which the offset is
                    lower or equal to the chosen offset.
                </Text>
                <Text>* Please confirm Topic Records Deletion.</Text>
            </Alert>
        </div>
    );
}

function renderModalFooter(
    setIsModalOpen,
    deleteTopicRecords: (
        partitionsOffset: { partition: number; offset: number }[],
    ) => Promise<any>,
    partitionsOffsetsToDelete: IPartitionOffsetToDelete[],
) {
    const isDisabled =
        partitionsOffsetsToDelete.length === 0 ||
        partitionsOffsetsToDelete.some(
            partitionOffsetToDelete =>
                CommonValidationUtils.isFalsy(
                    partitionOffsetToDelete.partition,
                ) ||
                CommonValidationUtils.isFalsy(partitionOffsetToDelete.offset),
        );

    const partitionsOffset: { partition: number; offset: number }[] =
        partitionsOffsetsToDelete.map(partitionOffsetToDelete => {
            return {
                partition: partitionOffsetToDelete.partition,
                offset: partitionOffsetToDelete.offset,
            };
        });

    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                disabled={isDisabled}
                color="red"
                leftIcon={<TbTrash size="1rem" />}
                onClick={() => deleteTopicRecords(partitionsOffset)}
            >
                Delete
            </Button>
        </div>
    );
}

interface IPartitionOffsetToDelete {
    partition: number;
    offset: number;
    earliestOffset: number;
    latestOffset: number;
}

interface IPartitionOffsets {
    partition: number;
    earliestOffset: number;
    latestOffset: number;
}

function DeleteTopicRecordsComponent({
    setIsModalOpen,
    isModalOpen,
    isDeleteTopicRecordsPending,
    topicToDeleteRecords,
    deleteTopicRecords,
    topicDetails,
}: DeleteTopicRecordsComponentProps) {
    const partitions = useMemo(() => {
        return (
            topicDetails.topicDescription?.partitions.map(
                partition => partition.partition,
            ) || []
        );
    }, [topicDetails]);

    const partitionsOffsets: IPartitionOffsets[] = useMemo(() => {
        return partitions.map(partition => {
            const earliestOffsetInfo = topicDetails.earliestOffsetInfos.find(
                earliestOffsetInfo =>
                    earliestOffsetInfo.partition === partition,
            );
            const latestOffsetInfo = topicDetails.latestOffsetInfos.find(
                latestOffsetInfo => latestOffsetInfo.partition === partition,
            );
            return {
                partition,
                earliestOffset: earliestOffsetInfo?.offset || 0,
                latestOffset: latestOffsetInfo?.offset || 0,
            };
        });
    }, [partitions, topicDetails]);

    const [partitionsOffsetsToDelete, setPartitionsOffsetsToDelete] = useState<
        IPartitionOffsetToDelete[]
    >([]);

    const partitionOptions = partitions
        .filter(
            partition =>
                !partitionsOffsetsToDelete.some(
                    partitionOffsetToDelete =>
                        partitionOffsetToDelete.partition === partition,
                ),
        )
        .map(partition => {
            return {
                value: partition,
                label: String(partition),
            };
        });

    useEffect(() => {
        const newPartitionsOffsetsToDelete = partitionsOffsets.map(
            partitionOffset => {
                return {
                    partition: partitionOffset.partition,
                    offset: partitionOffset.latestOffset,
                    earliestOffset: partitionOffset.earliestOffset,
                    latestOffset: partitionOffset.latestOffset,
                };
            },
        );
        setPartitionsOffsetsToDelete(newPartitionsOffsetsToDelete);
    }, [partitionsOffsets]);

    const numberOfRecordsToBeDeleted = partitionsOffsetsToDelete.reduce(
        (accumulator, partitionOffsetToDelete) => {
            return (
                accumulator +
                (partitionOffsetToDelete.offset -
                    partitionOffsetToDelete.earliestOffset)
            );
        },
        0,
    );

    const modalBody = renderModalBody(
        partitionsOffsets,
        partitionsOffsetsToDelete,
        setPartitionsOffsetsToDelete,
        partitionOptions,
        numberOfRecordsToBeDeleted,
    );

    const modalFooter = renderModalFooter(
        setIsModalOpen,
        deleteTopicRecords,
        partitionsOffsetsToDelete,
    );

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Delete Topic Records</Text>
                    <Text color="dimmed" size="xs">
                        {topicToDeleteRecords}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteTopicRecordsPending}
        />
    );
}

export default DeleteTopicRecordsComponent;
