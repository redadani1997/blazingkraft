import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { KafkaConnectMeta } from '../redux';
import kafkaConnectActions from '../redux/actions';
import AllKafkaConnectsComponent from './AllKafkaConnectsComponent';

const AllKafkaConnects = () => {
    useDocumentTitle('Blazing KRaft - Kafka Connects');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getAllKafkaConnects = () =>
        dispatch(kafkaConnectActions.getAllKafkaConnects());

    const describeKafkaConnect = kafkaConnectCode =>
        dispatch(kafkaConnectActions.describeKafkaConnect(kafkaConnectCode));

    const refreshPageContent = () =>
        getAllKafkaConnects().then(({ value }: { value: KafkaConnectMeta[] }) =>
            value.map(kafkaConnect => describeKafkaConnect(kafkaConnect.code)),
        );

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllKafkaConnectsComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllKafkaConnects;
