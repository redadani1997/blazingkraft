import ConsumerGroupDetailsBodyComponent from './ConsumerGroupDetailsBodyComponent';

interface ConsumerGroupDetailsBodyProps {
    setIsAlterConsumerGroupOffsetsModalOpened: (isModalOpen: boolean) => void;
    setTopicPartitionOffsetsToAlter: (
        topicPartitionOffsetsToAlter: any,
    ) => void;
}

const ConsumerGroupDetailsBody = (props: ConsumerGroupDetailsBodyProps) => {
    // Map State To Props

    // Map Dispatch To Props

    return <ConsumerGroupDetailsBodyComponent {...props} />;
};

export default ConsumerGroupDetailsBody;
