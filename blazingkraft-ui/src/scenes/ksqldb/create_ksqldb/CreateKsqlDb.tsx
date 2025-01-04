import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import filesActions from 'scenes/files/redux/actions';
import CreateKsqlDbComponent from './CreateKsqlDbComponent';

const CreateKsqlDb = () => {
    useDocumentTitle('Blazing KRaft - Create KsqlDb');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getFiles = () => dispatch(filesActions.getFiles());

    const refreshPageContent = () => {
        getFiles();
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <CreateKsqlDbComponent />;
};

export default CreateKsqlDb;
