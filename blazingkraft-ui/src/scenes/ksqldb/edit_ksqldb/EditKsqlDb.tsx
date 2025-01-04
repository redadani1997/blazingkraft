import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import filesActions from 'scenes/files/redux/actions';
import ksqlDbActions from '../redux/actions';
import EditKsqlDbComponent from './EditKsqlDbComponent';

const EditKsqlDb = () => {
    useDocumentTitle('Blazing KRaft - Edit KsqlDb');

    // Map State To Props
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const getFiles = () => dispatch(filesActions.getFiles());

    const getKsqlDbDetails = () =>
        dispatch(ksqlDbActions.getKsqlDbDetails(ksqlDbCode));

    const refreshPageContent = () => {
        getKsqlDbDetails();
        getFiles();
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <EditKsqlDbComponent refreshPageContent={refreshPageContent} />;
};

export default EditKsqlDb;
