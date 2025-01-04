import ConsumerGroupMetadata from './metadata/ConsumerGroupMetadata';
import ConsumerGroupTable from './table/ConsumerGroupTable';

interface ConsumerGroupDetailsBodyComponentProps {
    setIsAlterConsumerGroupOffsetsModalOpened: (isOpened: boolean) => void;
    setTopicPartitionOffsetsToAlter: (topicPartitionOffsets: any) => void;
}

const ConsumerGroupDetailsBodyComponent = ({
    setIsAlterConsumerGroupOffsetsModalOpened,
    setTopicPartitionOffsetsToAlter,
}: ConsumerGroupDetailsBodyComponentProps) => {
    return (
        <div className="flex flex-col w-full h-full">
            <ConsumerGroupMetadata />
            <ConsumerGroupTable
                setIsAlterConsumerGroupOffsetsModalOpened={
                    setIsAlterConsumerGroupOffsetsModalOpened
                }
                setTopicPartitionOffsetsToAlter={
                    setTopicPartitionOffsetsToAlter
                }
            />
        </div>
    );
};

export default ConsumerGroupDetailsBodyComponent;
