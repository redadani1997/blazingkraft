import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import filesActions from 'scenes/files/redux/actions';
import CreateSchemaRegistryComponent from './CreateSchemaRegistryComponent';

const CreateSchemaRegistry = () => {
    useDocumentTitle('Blazing KRaft - Create Schema Registry');

    const dispatch = useDispatch<any>();

    const getFiles = () => dispatch(filesActions.getFiles());

    useEffect(() => {
        getFiles();
    }, []);

    return <CreateSchemaRegistryComponent />;
};

export default CreateSchemaRegistry;
