import {
    ProducerConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import BlazingProducerSerializerComponent from './BlazingProducerSerializerComponent';

interface BlazingProducerSerializerProps {
    producerConfiguration: ProducerConfiguration;

    setKeySerializerConfiguration: any;
    setValueSerializerConfiguration: any;

    valueSerializer: ProducerSerializer;
    setValueSerializer: (valueSerializer: ProducerSerializer) => void;

    keySerializer: ProducerSerializer;
    setKeySerializer: (keySerializer: ProducerSerializer) => void;

    keySerializerConfiguration: Map<string, any>;
    valueSerializerConfiguration: Map<string, any>;

    setKafkaValueSchema: (schema: string) => void;
    setKafkaKeySchema: (schema: string) => void;
}

const BlazingProducerSerializer = (props: BlazingProducerSerializerProps) => {
    // Map State To Props

    return (
        <>
            <BlazingProducerSerializerComponent {...props} />
        </>
    );
};

export default BlazingProducerSerializer;
