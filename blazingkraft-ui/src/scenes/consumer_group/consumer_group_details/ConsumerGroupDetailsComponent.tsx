import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import AlterConsumerGroupOffsets from '../alter_consumer_group_offsets/AlterConsumerGroupOffsets';
import ConsumerGroupDetailsBody from './body/ConsumerGroupDetailsBody';
import ConsumerGroupDetailsHeader from './header/ConsumerGroupDetailsHeader';

interface ConsumerGroupDetailsComponentProps {
    refreshPageContent: () => void;
}

export interface TopicPartitionOffsetToAlter {
    topic: string;
    partition: number;
    offset: number;
    lineIndex: number;
}

function ConsumerGroupDetailsComponent({
    refreshPageContent,
}: ConsumerGroupDetailsComponentProps) {
    const [topicPartitionOffsetsToAlter, setTopicPartitionOffsetsToAlter] =
        useState<TopicPartitionOffsetToAlter[]>([]);
    const [
        isAlterConsumerGroupOffsetsModalOpened,
        setIsAlterConsumerGroupOffsetsModalOpened,
    ] = useState(false);
    return (
        <>
            <ConsumerGroupDetailsHeader
                refreshPageContent={refreshPageContent}
                setIsAlterConsumerGroupOffsetsModalOpened={
                    setIsAlterConsumerGroupOffsetsModalOpened
                }
                setTopicPartitionOffsetsToAlter={
                    setTopicPartitionOffsetsToAlter
                }
            />
            <CommonBody>
                <ConsumerGroupDetailsBody
                    setTopicPartitionOffsetsToAlter={
                        setTopicPartitionOffsetsToAlter
                    }
                    setIsAlterConsumerGroupOffsetsModalOpened={
                        setIsAlterConsumerGroupOffsetsModalOpened
                    }
                />
            </CommonBody>
            <AlterConsumerGroupOffsets
                isModalOpen={isAlterConsumerGroupOffsetsModalOpened}
                setIsModalOpen={setIsAlterConsumerGroupOffsetsModalOpened}
                topicPartitionOffsetsToAlter={topicPartitionOffsetsToAlter}
                setTopicPartitionOffsetsToAlter={
                    setTopicPartitionOffsetsToAlter
                }
            />
        </>
    );
}

export default ConsumerGroupDetailsComponent;
