import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import filesActions from 'scenes/files/redux/actions';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import clusterActions from '../redux/actions';
import EditClusterComponent from './EditClusterComponent';

const EditCluster = () => {
    useDocumentTitle('Blazing KRaft - Edit Cluster');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const getFiles = () => dispatch(filesActions.getFiles());

    const getSchemaRegistries = () =>
        dispatch(schemaRegistryActions.getSchemaRegistries());

    const getClusterDetails = () =>
        dispatch(clusterActions.getClusterDetails(clusterCode));

    const refreshPageContent = () => {
        getClusterDetails();
        getSchemaRegistries();
        getFiles();
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <EditClusterComponent refreshPageContent={refreshPageContent} />;
};

export default EditCluster;
