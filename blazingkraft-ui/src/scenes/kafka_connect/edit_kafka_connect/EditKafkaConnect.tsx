import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import clusterActions from 'scenes/cluster/redux/actions';
import kafkaConnectActions from '../redux/actions';
import EditKafkaConnectComponent from './EditKafkaConnectComponent';

const EditKafkaConnect = () => {
    useDocumentTitle('Blazing KRaft - Edit Kafka Connect');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode } = useParams();

    const getAllClusters = () => dispatch(clusterActions.getAllClusters());

    const getKafkaConnectDetails = () =>
        dispatch(kafkaConnectActions.getKafkaConnectDetails(kafkaConnectCode));

    const refreshPageContent = () => {
        getKafkaConnectDetails();
        getAllClusters();
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <EditKafkaConnectComponent refreshPageContent={refreshPageContent} />
    );
};

export default EditKafkaConnect;
