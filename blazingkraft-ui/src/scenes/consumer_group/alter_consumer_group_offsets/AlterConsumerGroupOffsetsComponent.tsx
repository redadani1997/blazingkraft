import { ActionIcon, Alert, Button, Divider, Text } from '@mantine/core';
import { Offset, OffsetInfo } from 'common/types/offset';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import {
    TbAlertCircle,
    TbAlertTriangle,
    TbCirclePlus,
    TbPencil,
    TbX,
} from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import { TopicPartitionOffsetToAlter } from '../consumer_group_details/ConsumerGroupDetailsComponent';
import AlterConsumerGroupOffsetsLineComponent from './line/AlterConsumerGroupOffsetsLineComponent';

interface AlterConsumerGroupOffsetsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[];
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[],
    ) => void;
    consumerGroupOffsets: Offset[];
    consumerGroupEarliestTopicPartitionsOffsets: OffsetInfo[];
    consumerGroupLatestTopicPartitionsOffsets: OffsetInfo[];
    alterConsumerGroupOffsets: () => void;
    isAlterConsumerGroupOffsetsPending: boolean;
    consumerGroup: string;
}

function renderModalBody(
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[],
    ) => void,
    topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[],
    consumerGroupOffsets: Offset[],
    consumerGroupEarliestTopicPartitionsOffsets: OffsetInfo[],
    consumerGroupLatestTopicPartitionsOffsets: OffsetInfo[],
) {
    return (
        <>
            <div className="flex pb-2 items-center">
                <Text size="sm">Topic Partitions Offsets</Text>
                <ActionIcon
                    color="blue"
                    className="ml-2"
                    onClick={() => {
                        setTopicPartitionOffsetsToAlter([
                            ...topicPartitionOffsetsToAlter,
                            {
                                topic: undefined,
                                partition: undefined,
                                offset: undefined,
                                lineIndex:
                                    topicPartitionOffsetsToAlter.length > 0
                                        ? Math.max(
                                              ...topicPartitionOffsetsToAlter.map(
                                                  topicPartitionOffsetToAlter =>
                                                      topicPartitionOffsetToAlter.lineIndex,
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
            {topicPartitionOffsetsToAlter.map(topicPartitionOffsetToAlter => {
                return (
                    <>
                        <AlterConsumerGroupOffsetsLineComponent
                            key={topicPartitionOffsetToAlter.lineIndex}
                            topicPartitionOffsetToAlter={
                                topicPartitionOffsetToAlter
                            }
                            setTopicPartitionOffsetsToAlter={
                                setTopicPartitionOffsetsToAlter
                            }
                            topicPartitionOffsetsToAlter={
                                topicPartitionOffsetsToAlter
                            }
                            consumerGroupOffsets={consumerGroupOffsets}
                            consumerGroupEarliestTopicPartitionsOffsets={
                                consumerGroupEarliestTopicPartitionsOffsets
                            }
                            consumerGroupLatestTopicPartitionsOffsets={
                                consumerGroupLatestTopicPartitionsOffsets
                            }
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
                    If there's a consumer that's hanging while consuming a
                    record with a specific topic partition offset, you can use
                    this feature to alter the consumer group's current offset to
                    be able to bypass that message consumption.
                </Text>
            </Alert>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Beware"
                color="lime"
                className="mb-4"
            >
                <Text>
                    If the topic partition is actively being consumed by a
                    consumer member, the alteration will result in an error.
                </Text>
            </Alert>
        </>
    );
}

function renderModalFooter(
    setIsModalOpen,
    topicPartitionOffsetsToAlter: TopicPartitionOffsetToAlter[],
    action,
) {
    const hasError =
        topicPartitionOffsetsToAlter.length === 0 ||
        topicPartitionOffsetsToAlter.some(topicPartitionOffsetToAlter =>
            CommonValidationUtils.areSomeFalsy(
                topicPartitionOffsetToAlter.topic,
                topicPartitionOffsetToAlter.partition,
                topicPartitionOffsetToAlter.offset,
            ),
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
                color="violet"
                leftIcon={<TbPencil size="1rem" />}
                onClick={() => action()}
                disabled={hasError}
            >
                Alter
            </Button>
        </div>
    );
}

function AlterConsumerGroupOffsetsComponent({
    isModalOpen,
    setIsModalOpen,
    topicPartitionOffsetsToAlter,
    setTopicPartitionOffsetsToAlter,
    consumerGroupOffsets,
    consumerGroupEarliestTopicPartitionsOffsets,
    consumerGroupLatestTopicPartitionsOffsets,
    alterConsumerGroupOffsets,
    isAlterConsumerGroupOffsetsPending,
    consumerGroup,
}: AlterConsumerGroupOffsetsComponentProps) {
    const action = () => alterConsumerGroupOffsets();
    const modalBody = renderModalBody(
        setTopicPartitionOffsetsToAlter,
        topicPartitionOffsetsToAlter,
        consumerGroupOffsets,
        consumerGroupEarliestTopicPartitionsOffsets,
        consumerGroupLatestTopicPartitionsOffsets,
    );
    const modalFooter = renderModalFooter(
        setIsModalOpen,
        topicPartitionOffsetsToAlter,
        action,
    );
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">
                        Consumer Group Offset Alteration
                    </Text>
                    <Text color="dimmed" size="xs">
                        {consumerGroup}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isAlterConsumerGroupOffsetsPending}
        />
    );
}

export default AlterConsumerGroupOffsetsComponent;
