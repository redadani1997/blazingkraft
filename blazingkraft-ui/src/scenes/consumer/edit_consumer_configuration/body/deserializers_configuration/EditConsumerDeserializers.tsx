import {
    ConsumerCompleteConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import EditConsumerDeserializersComponent from './EditConsumerDeserializersComponent';

interface EditConsumerDeserializersProps {
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    keyDeserializerConfiguration: Map<string, any>;
    valueDeserializerConfiguration: Map<string, any>;
    setKeyDeserializerConfiguration: (
        keyDeserializerConfiguration: Map<string, any>,
    ) => void;
    setValueDeserializerConfiguration: (
        valueDeserializerConfiguration: Map<string, any>,
    ) => void;
    consumerCompleteConfiguration?: ConsumerCompleteConfiguration;
}

const EditConsumerDeserializers = (props: EditConsumerDeserializersProps) => {
    // Map State To Props

    // Map Dispatch To Props

    return <EditConsumerDeserializersComponent {...props} />;
};

export default EditConsumerDeserializers;
