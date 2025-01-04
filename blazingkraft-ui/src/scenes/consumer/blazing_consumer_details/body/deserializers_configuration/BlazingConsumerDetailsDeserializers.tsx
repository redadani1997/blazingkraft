import {
    ConsumerCompleteConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import BlazingConsumerDetailsDeserializersComponent from './BlazingConsumerDetailsDeserializersComponent';

interface BlazingConsumerDetailsDeserializersProps {
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

const BlazingConsumerDetailsDeserializers = (
    props: BlazingConsumerDetailsDeserializersProps,
) => {
    // Map State To Props

    // Map Dispatch To Props

    return <BlazingConsumerDetailsDeserializersComponent {...props} />;
};

export default BlazingConsumerDetailsDeserializers;
