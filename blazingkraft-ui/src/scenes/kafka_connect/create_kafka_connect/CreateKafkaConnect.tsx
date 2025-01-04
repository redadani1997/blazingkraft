import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clusterActions from 'scenes/cluster/redux/actions';
import CreateKafkaConnectComponent from './CreateKafkaConnectComponent';

const CreateKafkaConnect = () => {
    useDocumentTitle('Blazing KRaft - Create Kafka Connect');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getAllClusters = () => dispatch(clusterActions.getAllClusters());

    const refreshPageContent = () => {
        getAllClusters();
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <CreateKafkaConnectComponent />;
};

export default CreateKafkaConnect;
