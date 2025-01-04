import { ActionIcon, Alert, Button, Divider, Text } from '@mantine/core';
import { Offset } from 'common/types/offset';
import { CommonArrayUtils } from 'common/utils/CommonArrayUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useEffect, useState } from 'react';
import {
    TbAlertCircle,
    TbAlertTriangle,
    TbCirclePlus,
    TbEraser,
    TbX,
} from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import { TopicPartitionToClear } from './ClearConsumerGroupOffsets';
import ClearConsumerGroupOffsetsLineComponent from './line/ClearConsumerGroupOffsetsLineComponent';

interface ClearConsumerGroupOffsetsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    consumerGroup: string;
    deleteConsumerGroupOffsets: (
        topicPartitions: TopicPartitionToClear[],
    ) => void;
    isDeleteConsumerGroupOffsetsPending: boolean;
    consumerGroupOffsets: Offset[];
}

function renderModalBody(
    topicPartitions: TopicPartitionToClear[],
    setTopicPartitions: (topicpartitions: TopicPartitionToClear[]) => void,
    consumerGroupOffsets: Offset[],
) {
    return (
        <>
            <div className="flex pb-2 items-center">
                <Text size="sm">Topic Partitions</Text>
                <ActionIcon
                    color="blue"
                    className="ml-2"
                    onClick={() => {
                        setTopicPartitions([
                            ...topicPartitions,
                            {
                                topic: null,
                                partitions: null,
                                lineIndex:
                                    topicPartitions.length > 0
                                        ? Math.max(
                                              ...topicPartitions.map(
                                                  topicPartition =>
                                                      topicPartition.lineIndex,
                                              ),
                                          ) + 1
                                        : 0,
                            },
                        ]);
                    }}
                >
                    <TbCirclePlus size="1.4rem" />
                </ActionIcon>
            </div>
            {topicPartitions.map(topicPartition => {
                return (
                    <>
                        <ClearConsumerGroupOffsetsLineComponent
                            key={topicPartition.lineIndex}
                            topicPartition={topicPartition}
                            topicPartitions={topicPartitions}
                            consumerGroupOffsets={consumerGroupOffsets}
                            setTopicPartitions={setTopicPartitions}
                        />
                        <Divider className="my-4" />
                    </>
                );
            })}
            <Alert
                icon={<TbAlertCircle size="1.6rem" />}
                title="Info"
                color="blue"
                className="mb-4"
            >
                <Text>
                    Clearing the offsets of a topic partition will result in the
                    consumer group consuming from the earliest offset of the
                    topic partition.
                </Text>
            </Alert>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Beware"
                color="lime"
                className="mb-4"
            >
                <Text>
                    * If the topic partition is actively being consumed by a
                    consumer member, the offsets clearance will result in an
                    error.
                </Text>
                <Text>
                    * Note that this action is not atomic, so if one topic
                    patition is actively being consumed by a consumer member,
                    the offsets clearance will result in an error but the other
                    topic partitions will be cleared.
                </Text>
            </Alert>
        </>
    );
}

function renderModalFooter(
    setIsModalOpen,
    topicPartitions: TopicPartitionToClear[],
    action,
) {
    const hasError =
        topicPartitions.length === 0 ||
        topicPartitions.some(
            topicPartition =>
                CommonValidationUtils.isFalsy(topicPartition.topic) ||
                CommonValidationUtils.isFalsyArray(topicPartition.partitions),
        );
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => {
                    setIsModalOpen(false);
                }}
            >
                Cancel
            </Button>
            <Button
                color="red"
                leftIcon={<TbEraser size="1rem" />}
                onClick={() => action()}
                disabled={hasError}
            >
                Clear
            </Button>
        </div>
    );
}

function ClearConsumerGroupOffsetsComponent({
    isModalOpen,
    setIsModalOpen,
    isDeleteConsumerGroupOffsetsPending,
    deleteConsumerGroupOffsets,
    consumerGroup,
    consumerGroupOffsets,
}: ClearConsumerGroupOffsetsComponentProps) {
    const [topicPartitions, setTopicPartitions] = useState<
        TopicPartitionToClear[]
    >([]);

    useEffect(() => {
        if (isModalOpen) {
            const newTopicPartitions: TopicPartitionToClear[] =
                CommonArrayUtils.arrayToUniqueArray(
                    consumerGroupOffsets.map(consumerGroupOffset => {
                        return consumerGroupOffset.topic;
                    }),
                ).map((topic, index) => {
                    return {
                        topic,
                        partitions: consumerGroupOffsets
                            .filter(
                                consumerGroupOffset =>
                                    consumerGroupOffset.topic === topic,
                            )
                            .map(consumerGroupOffset => {
                                return consumerGroupOffset.partition;
                            }),
                        lineIndex: index,
                    };
                });

            setTopicPartitions(newTopicPartitions);
        }
    }, [isModalOpen]);

    const action = () => deleteConsumerGroupOffsets(topicPartitions);
    const modalBody = renderModalBody(
        topicPartitions,
        setTopicPartitions,
        consumerGroupOffsets,
    );
    const modalFooter = renderModalFooter(
        setIsModalOpen,
        topicPartitions,
        action,
    );
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">
                        Consumer Group's Offsets Clearance
                    </Text>
                    <Text color="dimmed" size="xs">
                        {consumerGroup}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteConsumerGroupOffsetsPending}
        />
    );
}

export default ClearConsumerGroupOffsetsComponent;
