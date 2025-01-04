import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ksqlDbEcosystemActions from '../redux/actions';
import AllKsqlDbStreamsComponent from './AllKsqlDbStreamsComponent';

const AllKsqlDbStreams = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Streams');

    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const refreshPageContent = () =>
        dispatch(ksqlDbEcosystemActions.getAllKsqlDbStreams(ksqlDbCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllKsqlDbStreamsComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllKsqlDbStreams;
