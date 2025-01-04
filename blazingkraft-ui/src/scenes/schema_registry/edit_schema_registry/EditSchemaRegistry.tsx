import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import filesActions from 'scenes/files/redux/actions';
import schemaRegistryActions from '../redux/actions';
import EditSchemaRegistryComponent from './EditSchemaRegistryComponent';

const EditSchemaRegistry = () => {
    useDocumentTitle('Blazing KRaft - Edit Schema Registry');

    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();

    const getFiles = () => dispatch(filesActions.getFiles());
    const getSchemaRegistryDetails = () =>
        dispatch(
            schemaRegistryActions.getSchemaRegistryDetails(schemaRegistryCode),
        );

    function refreshPageContent() {
        getFiles();
        getSchemaRegistryDetails();
    }

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <EditSchemaRegistryComponent refreshPageContent={refreshPageContent} />
    );
};

export default EditSchemaRegistry;
