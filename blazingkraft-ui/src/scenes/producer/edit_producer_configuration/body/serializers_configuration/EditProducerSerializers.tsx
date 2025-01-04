import {
    ProducerCompleteConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import EditProducerSerializersComponent from './EditProducerSerializersComponent';

interface EditProducerSerializersProps {
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

const EditProducerSerializers = (props: EditProducerSerializersProps) => {
    // Map State To Props

    // Map Dispatch To Props

    return <EditProducerSerializersComponent {...props} />;
};

export default EditProducerSerializers;
