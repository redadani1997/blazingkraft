import {
    ProducerCompleteConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import BlazingProducerDetailsSerializersComponent from './BlazingProducerDetailsSerializersComponent';

interface BlazingProducerDetailsSerializersProps {
    keySerializer: ProducerSerializer;
    valueSerializer: ProducerSerializer;
    keySerializerConfiguration: Map<string, any>;
    valueSerializerConfiguration: Map<string, any>;
    setKeySerializerConfiguration: (
        keySerializerConfiguration: Map<string, any>,
    ) => void;
    setValueSerializerConfiguration: (
        valueSerializerConfiguration: Map<string, any>,
    ) => void;
    producerCompleteConfiguration: ProducerCompleteConfiguration;
}

const BlazingProducerDetailsSerializers = (
    props: BlazingProducerDetailsSerializersProps,
) => {
    // Map State To Props

    // Map Dispatch To Props

    return <BlazingProducerDetailsSerializersComponent {...props} />;
};

export default BlazingProducerDetailsSerializers;
