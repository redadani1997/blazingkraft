import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import filesActions from 'scenes/files/redux/actions';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CreateClusterComponent from './CreateClusterComponent';

const CreateCluster = () => {
    useDocumentTitle('Blazing KRaft - Create Cluster');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const getFiles = () => dispatch(filesActions.getFiles());

    const getSchemaRegistries = () =>
        dispatch(schemaRegistryActions.getSchemaRegistries());

    useEffect(() => {
        getSchemaRegistries();
        getFiles();
    }, []);

    return <CreateClusterComponent />;
};

export default CreateCluster;
