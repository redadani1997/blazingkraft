import { useDocumentTitle } from '@mantine/hooks';
import AllKafkaStreamsComponent from './AllKafkaStreamsComponent';

const AllKafkaStreams = () => {
    useDocumentTitle('Blazing KRaft - Kafka Streams');

    return <AllKafkaStreamsComponent />;
};

export default AllKafkaStreams;
